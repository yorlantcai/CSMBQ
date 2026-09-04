# Buzón seguro — Solicitudes de Historia Clínica (Supabase)

Este directorio contiene el **buzón intermedio** entre el formulario público de la web
y Cary (intranet). La web escribe aquí; Cary jala desde aquí por conexión saliente.
**Nunca contiene historias clínicas**, solo solicitudes temporales y cifradas.

```
Formulario web ──POST──▶ Edge Function "recibir-solicitud" ──▶ tabla hc_solicitudes + bucket hc-adjuntos
                                                                          │
                                                          (pull saliente) ▼
                                                                       Cary (CARYSI)
```

## Despliegue (una sola vez)

Requisitos: una cuenta en [supabase.com](https://supabase.com) y la [CLI de Supabase](https://supabase.com/docs/guides/cli).

1. **Crea el proyecto** en supabase.com y copia: `Project URL`, `anon key` y `service_role key`
   (Settings → API). La `service_role key` es secreta: nunca la pongas en la web.

2. **Crea el esquema y el bucket**: abre el *SQL Editor* del proyecto y ejecuta
   [`schema.sql`](schema.sql).

3. **Enlaza la CLI y despliega la función**:
   ```bash
   supabase login
   supabase link --project-ref <TU-PROJECT-REF>
   supabase functions deploy recibir-solicitud --no-verify-jwt
   ```
   > `--no-verify-jwt` porque es un endpoint público (no requiere usuario logueado).
   > `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` se inyectan solas en la función.

4. **Configura el origen permitido** (CORS), con el dominio del sitio:
   ```bash
   supabase secrets set ALLOWED_ORIGIN=https://www.csmbq.com
   ```

5. **Conecta la web**: en el `.env` de CsmbqWeb pon la URL de la función:
   ```
   VITE_URL_SOLICITUD_HC=https://<TU-PROJECT-REF>.supabase.co/functions/v1/recibir-solicitud
   ```
   Reconstruye/redeploya la web. El formulario dejará de estar en "modo demo".

## Seguridad

- **RLS activado sin políticas para anónimos** → desde internet nadie lee ni escribe la tabla.
- La Edge Function escribe con `service_role` (server-side); la web solo ve la URL de la función.
- Bucket **privado**: solo `service_role` sube/lee/borra.
- Cary borra cada solicitud tras ingerirla; `hc_purgar_antiguas()` elimina lo que pase de 7 días.
- Los archivos van por HTTPS y quedan cifrados en reposo (cifrado por defecto de Supabase).

## Lo que necesita Cary (lado intranet)

Variables de entorno en el backend de CaryNutri (ver el job de pull):
```
SUPABASE_URL=https://<TU-PROJECT-REF>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
```
Cary usa esa llave **solo de salida** para traer y borrar solicitudes. No se abre ningún
puerto de entrada a la intranet.
