# Notas – Estadísticas de Calificaciones (Next.js)

Aplicación sencilla para ingresar calificaciones de varios estudiantes y generar un reporte con estadísticas.

## Características

- Ingresar la cantidad de estudiantes y sus calificaciones (`0–100`).
- Calcular promedio, calificación más alta y más baja.
- Contar estudiantes aprobados y reprobados.
- Nota mínima para aprobar: `61` (editable).

## Requisitos

- Node.js `>= 18`.
- npm (los ejemplos usan npm).

## Instalación y ejecución

Instala dependencias y levanta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Uso

1. Ingresa la cantidad de estudiantes.
2. Completa todas las notas con valores entre `0` y `100`.
3. El reporte aparece cuando todos los campos son válidos.

## Estructura del proyecto

- `src/app/page.tsx` – página principal con los inputs y la lógica del reporte.
- `src/app/page.module.css` – estilos para el formulario y el reporte.
- `src/app/globals.css` – estilos globales.

## Configuración

- La nota mínima de aprobación es `61`. Para cambiarla, edita la comparación en `src/app/page.tsx` (busca `>= 61`).

## Notas

- Validación básica: todas las notas deben estar completas y en el rango `0–100`.
- Construido con Next.js App Router (sin Tailwind).
