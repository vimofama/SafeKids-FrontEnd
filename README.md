# SafeKids

## Descripción

SafeKids es una aplicación diseñada para garantizar la seguridad y el control eficiente de la salida de niños de instituciones educativas o entornos similares. Ofrece opciones para registrar y autorizar la salida de los niños, ya sea mediante códigos QR que contienen datos del padre y la cédula de identidad, o ingresando la cédula en la aplicación para buscar los datos. Los padres pueden mantener una lista de personas autorizadas para retirar al niño y recibir notificaciones en caso de emergencia para aprobar la salida. SafeKids prioriza la seguridad y la privacidad de los datos, asegurando que la salida de los niños se gestione de manera segura y eficiente, brindando tranquilidad a los padres.

## Instalación

Se recomienda utilizar pnpm

```
$ pnpm install o npm install
```

## Ejecución

```
# desarrollo
$ pnpm dev o pnpm dev
```

## Páginas

| URL                      |
| ------------------------ |
| `/login`                 |
| `/admin/dashboard`       |
| `/admin/alumno/lista`    |
| `/admin/alumno/registro` |
| `/admin/guard/lista`     |
| `/admin/guard/registro`  |
| `/admin/tutor/lista`     |
| `/admin/tutor/registro`  |
| `/user`                  |
| `/user/alumno`           |
| `/user/registro`         |
| `/user/retirar`          |

## Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```
pnpm serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
