# Subida de imagenes al cloud storage de google

## Proyecto que funciona <3

//Crear buckets por console de gc terminal

[Usando el cloud storage de google](https://cloud.google.com/nodejs/getting-started/using-cloud-storage?hl=es)

[Guardando información en gc - multer](https://cloud.google.com/nodejs/getting-started/using-cloud-storage?hl=es)

```
gsutil mb gs://buckect-name-awesome-lulu

gsutil defacl set public-read gs://buckect-name-awesome-lulu

output : Setting default object ACL on gs://buckect-name-awesome-lulu

```

1.- Utiliza los elementos de la pagina de google para actualizar la información
![Gestor de buckets browser](images/gestion_de_buckets_navegador.png)

## Siguientes investigaciones
Dudas a resolver sobre Node
- ¿Qué es un stream?
- ¿Qué correlación existe entre usar un stream con node y trabajar en la nube?
- Tengo la idea de un middleware, pero realmente que es lo que hace? puedo implementarlos yo de manera libre y soberana
- Que es un evento en node
- Hacer un proyecto con node y express sin ninguna libreria para conocer las 
bondades de express.

[cloud-storage-google](https://www.woolha.com/tutorials/node-js-upload-file-to-google-cloud-storage)