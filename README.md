# Checkeando firma de los webhooks con Node.js

Verifica la autenticidad de los eventos que se envían a tus direcciónes de webhook.


### Prerequisitos

Vas a necesitar lo siguiente

- [Node.js](http://nodejs.org) >=10.0.0
- Una cuenta de TuCuota, podés abrir una [cuenta de sandbox](https://sandbox.tucuota.com/register).
- [Ngrok](https://ngrok.com/) para hacer tu servidor local accesible desde internet.

### Instalando y corriendo la app

Instalar dependencias:

    npm install

En otra ventana corré:

    ngrok http 3000

Copiar el archivo con las variables de entorno:

    cp .env.example .env

[Crear un webhook ](https://sandbox.tucuota.com/dashboard/developers) poniendo como endpoint la dirección pública que te muestra ngrok en la consola, por ejemplo (reemplazar XXXXXXXX por lo que corresponda):

    https://XXXXXXXX.ngrok.io/webhook

Completar en el archivo `.env` los (por seguridad este código, al igual que un api key no debe ser incluido en tu repositorio)

    TC_API_WEBHOOK_SECRET=

Correr el server local

    npm run

Ahora ante cualquier evento debieras poder ver la información en la consola de Node.js y si el webhook secret [no coincide con tus datos](https://sandbox.tucuota.com/dashboard/developers) el sistema lo detectará y no lo recibirá.