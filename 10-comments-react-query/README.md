# Proyecto React-Query Comentatios

sistema de comentarios con react query, utilizando una base de datos jsonbin

## Inicialización de protecto
Para inicializar el proyecto debes tener una cuenta en https://jsonbin.io/ y vincularla en comments.ts que esta dentro de services.

una vez listo ejecutar:

 `npm install`

 `npm run dev`

## Estructura de JSONBIN

```json
[
  {
    "title": "Mi primer titulo",
    "message": "Mi primer comentario",
    "id": "1"
  },
  {
    "title": "Gracias Midu",
    "message": "Gracias por todo el curso de React",
    "id": "4fd1e7f1-3112-4740-b38c-eecdb547b0bf"
  }
]
```

## Problemas

Se creo una carpeta que no se sube llamada "data.ts" la cual contiene los datos ya que al crear un ".env" o ".env.local" no trae bien los datos y desconosco el motivo la master key tiene una estructura \$[numero y letra]\$[numeros/letras]/[numeros/letras].[numeros/letras] y al momento de pedir los datos me arrojaba desde el punto o desde el slash.

> Nota: jsonbin no deja tener un "bin" vacio, por lo tanto se recomienda antes de ejecutar el poryecto tener al menos 1 dato en el json bin
