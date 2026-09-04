-- =============================================================================
-- BUZÓN SEGURO — Solicitudes de Historia Clínica (Supabase / Postgres)
-- =============================================================================
-- Este esquema NO contiene historias clínicas. Solo almacena, de forma temporal
-- y cifrada, las SOLICITUDES que entran desde el formulario público hasta que
-- Cary (intranet) las jala (pull saliente) e ingiere en CARYSI.
--
-- Modelo de seguridad:
--   • RLS activado y SIN políticas para el rol anónimo  → desde internet nadie
--     puede leer ni escribir directamente en la tabla.
--   • La Edge Function "recibir-solicitud" escribe con la service_role key
--     (del lado servidor, nunca expuesta al navegador).
--   • Cary lee/borra con la service_role key por conexión SALIENTE.
-- =============================================================================

create extension if not exists pgcrypto;

-- ── Tabla del buzón ─────────────────────────────────────────────────────────
create table if not exists public.hc_solicitudes (
  id           uuid primary key default gen_random_uuid(),
  radicado     text        not null unique,
  tipo         text        not null check (tipo in ('propia','tercero','menor','fallecido')),
  estado       text        not null default 'pendiente_ingesta'
                 check (estado in ('pendiente_ingesta','ingerida','error')),
  payload      jsonb       not null,                 -- datos del formulario (sin archivos)
  adjuntos     jsonb       not null default '[]',    -- [{campo, path, nombre, tipo}] en Storage
  origen_ip    text,
  created_at   timestamptz not null default now(),
  ingested_at  timestamptz
);

-- Índice para que Cary traiga rápido las solicitudes pendientes.
create index if not exists idx_hc_pendientes
  on public.hc_solicitudes (created_at)
  where estado = 'pendiente_ingesta';

-- ── RLS: bloqueo total para anónimos ────────────────────────────────────────
alter table public.hc_solicitudes enable row level security;
-- (Intencionalmente NO se crean políticas. Sin políticas, el rol anon/authenticated
--  no puede hacer nada. service_role omite RLS, y es el único que usamos
--  desde la Edge Function y desde Cary.)

-- ── Storage: bucket privado para adjuntos + constancia ──────────────────────
insert into storage.buckets (id, name, public)
values ('hc-adjuntos', 'hc-adjuntos', false)
on conflict (id) do nothing;
-- Bucket privado: sin políticas para anon. Solo service_role sube/lee/borra.

-- ── Retención de respaldo (defensa en profundidad) ──────────────────────────
-- Cary borra cada solicitud tras ingerirla. Como red de seguridad, esta función
-- elimina cualquier solicitud que lleve más de 7 días en el buzón (programa con
-- pg_cron si está disponible, o ejecútala manualmente).
create or replace function public.hc_purgar_antiguas()
returns void language sql security definer as $$
  delete from public.hc_solicitudes
  where created_at < now() - interval '7 days';
$$;
