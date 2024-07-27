# SafeKids

## Descripción

SafeKids es una aplicación diseñada para garantizar la seguridad y el control eficiente de la salida de niños de instituciones educativas o entornos similares. Ofrece opciones para registrar y autorizar la salida de los niños, ya sea mediante códigos QR que contienen datos del padre y la cédula de identidad, o ingresando la cédula en la aplicación para buscar los datos. Los padres pueden mantener una lista de personas autorizadas para retirar al niño y recibir notificaciones en caso de emergencia para aprobar la salida. SafeKids prioriza la seguridad y la privacidad de los datos, asegurando que la salida de los niños se gestione de manera segura y eficiente, brindando tranquilidad a los padres.

## Figma

[SafeKids project](https://www.figma.com/design/N4qpUkuMPXde89BGORdbNq/SafeKids?node-id=0-1&t=ZsVoFxsmBrAGcPqA-1)

## Instalación

Se recomienda utilizar pnpm

```
$ pnpm install o npm install
```

## Enviroments

Crear el archivo .evn y agregar la URL del back-end
```
API_URL='http://localhost:3005'
```

## Ejecución

```
# desarrollo
$ pnpm dev o pnpm dev
```

## Páginas

| URL                      | Acción                                      |
| ------------------------ | ------------------------------------------- |
| `/login`                 | Iniciar sesión                              |
| `/admin/dashboard`       | Pantalla principal del administrados        |
| `/admin/alumno/lista`    | Lista de los alumnos registrados            |
| `/admin/alumno/registro` | Agregar un nuevo alumno                     |
| `/admin/alumno/[id]`     | Editar un alumno existente                  |
| `/admin/guard/lista`     | Lista del personal de seguridad registrados |
| `/admin/guard/registro`  | Agregar un nuevo guardia                    |
| `/admin/tutor/lista`     | Lista de tutores registrados                |
| `/admin/tutor/registro`  | Agregar un nuevo tutor                      |
| `/user`                  | Pantalla princpal del tutor                 |
| `/user/alumno`           | Lista de alumnos                            |
| `/user/registro`         | Agregar persona autorizada al tutor         |
| `/user/retirar`          | Lista de retiros                            |
| `/guard`                 | Pantalla principal del guardia              |
| `/guard/registrar`       | Agregar una nueva salida                    |

## Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```
pnpm serve
```
