# rayforce-ev

## Dev server

Antes de correr `pnpm dev` (o cualquier variante de `next dev`), **siempre chequear primero si ya hay un servidor de este proyecto corriendo** y reusar ese puerto en vez de levantar uno nuevo.

Cómo chequear (Windows): buscar procesos `node.exe` escuchando en algún puerto cuyo command line apunte a este repo:

```bash
netstat -ano | findstr LISTENING
# para cada PID candidato:
powershell -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \"ProcessId=<PID>\").CommandLine"
```

Si el command line contiene la ruta de este repo (`rayforce-ev`), ese es el server activo — usar ese puerto para navegar/probar, **no** correr `pnpm dev` de nuevo.

Si no hay ninguno corriendo, recién ahí correr `pnpm dev` y usar el puerto que Next imprima en la consola (puede variar si otro proyecto ya tomó el 3000).

Nunca asumir "el puerto X está ocupado, uso otro" sin antes verificar si el que lo ocupa es este mismo proyecto.
