# Apis de google

Son apis desarrolladas por google, permiten la comunicación e integración de los servicios de google con otros servicios.
Las apis proveen funcionalidades como análisis, aprendizaje automático, acceso a datos, etc.

- El uso de las apis de google requiere de `autenticación` y `autorización` utilizando el 
protocolo `OAuth 2.0`

- `OAuth` : Protocolo de autorización estándar, open source, que proporciona flujos de autorización específicos para aplicaciones web, aplicaciones de escritorio, telefonos móviles y dispositivos de sala de estar (televisión)

Hay dos razones por las que desees crear una integración con `google-auth`
- Si deseas verificar los datos del usuario utilizando su cuenta de google para permitirle iniciar sesión en tu aplicación.

- Si deseas acceder a los datos y funcionalidad de los servicios asociados a su cuenta
como pueden ser, gmail, calendar, drive, etc.

## Conceptos a manejar

- Oauth credentials : Código de autorización. Estas credenciales varían según el tipo de flujo de autenticación y las APIS de google a las que deseas acceder.

- Access token : Cadena única que otorga el acceso a la data y funcionalidad de un usuario para todas las APIS de google. Un solo token de acceso puede proporcionar una variedad de grados de acceso a cualquier número de apis de google.
Los tokens de acceso están restringidos a recursos y operaciones específicos según los `alcances - scope` que se le han otorgado.

- Scopes : Controla los datos y la funcionalidad que está disponible para el token de acceso de un usuario. Cuando el usuario inicia sesión con su cuenta de google, se le solicita que de consentimiento a los `ambitos` que solicita su aplicación.
Google recomienda que solicite los alcances de modo `incremental` en el momento que lo requiera las acciones del usuario. 
No solicite todos los alcances posibles, google no solo desaprueba esta práctica, sino que tampoco es una buena experiencia para el usuario porque es desagradable que una aplicación solicite permisos para funciones básicas. `Te gustaría que tu aplicación de linterna tenga la capacidad de borrar todos tus contactos`
Google recomienda que examines las listas de alcances después que el usuario dé su consentimiento para asegurse de que la aplicación mo presenta funcionalidad cuyos alcances no tiene habilitados. Por ejemplo, si el usuario solo da su consentimiento
para que tu aplicación lea tu bandeja de entrada, no debes habilitar la funcionalidad diseñada para enviar un correo.


- Realizar solicitudes de API y administrar tokens de actualización
Una vez que tengas el access token puedes utilizarlo para realizar peticiones http a las apis de google correspondientes.
Google recomienda enviar el access token en el encabezado de la solicitud http.
Los tokens de acceso a la cuenta de google tienen una vida útil limitada, por lo que si quieres seguir haciendo más peticiones también debes adquirir un token de actualización
Este token de actualización debe almacenarse de forma segura para un uso a largo plazo y se puede utilizar para generar tokens de acceso futuros.

[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/?code=4/5QGMs2l3NLqtp8G_2vHyoU2c7AYunvb6HBzk8-QwdpupHfwlHQ43qTAtq7RXY-34hxwjvbvgTF5--_EnHwt-qvg&scope=https://www.googleapis.com/auth/youtube.readonly)

[Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)


## Flujo de autenticación de google oauth
Las apis de google ofrecen algunas opciones para autenticar cuentas de usuario para tu aplicación.
Las mas comunes, aplicaciones del lado del servidor, aplicaciones del lado del cliente (navegador-javascript) y
a través de cuentas de servicio.