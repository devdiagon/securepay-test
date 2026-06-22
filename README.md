# Bitacora de implemetación

Aplicación Node.js + Express demuestra una API simple donde se incluyen procesos de autenticación y observbilidad de errores usando Sentry. Para ello es necesario configurar las variables de entorno con `.evn.example` y ejecutar el script `keypair.sh` para obtener las llaves pem. Una vez configurado, se puede ejecutar la API mediante:

```
npm run dev
```

Para poder generar la token JWT ejecutar:

```
node gen-token.js
```
El token generado tiene como usuario de prueba al ID: "usr_001" (aparece en los Tags de Sentry)

---

### Pruebas: [GET] /v1/account-alpha/balance

#### Acceso no autorizado: Sin Headers

![Sin Headers](img/alpha/1_sin_header.png)

#### Acceso no autorizado: Header que no es Bearer

![Header que no es Bearer](img/alpha/2_no_bearer.png)

#### Acceso no autorizado: Token inválido

![Token inválido](img/alpha/3_token_invalido.png)

#### Acceso no autorizado: Token expirado

![Token expirado](img/alpha/6_token_expirado.png)

#### Con token válido: Falta query params en ruta

![Falta query params](img/alpha/4_falta_parametro.png)

#### Con token válido: AccountId no existe en la DB

![AccountId no existe](img/alpha/5_cuenta_no_existe.png)

#### Con token válido: Acceso correcto a recurso

![Acceso correcto a recurso](img/alpha/7_acceso_recurso.png)


### Pruebas: [POST] /v1/transfer-beta/execute

#### Acceso no autorizado: Token inválido

![Token inválido](img/beta/1_token_invalido.png)

#### Acceso no autorizado: Token expirado

![Token expirado](img/beta/2_token_expirado.png)

#### Con token válido: Payload incompleto

![Payload incompleto](img/beta/3_payload_incompleto.png)

#### Con token válido: Error de fallo en la DB (excepción controlada)

![Error de fallo en la DB](img/beta/4_fallo_del_servidor.png)

### Captura de errores en Sentry

#### Dashboard principal de errores

![Sentry 1](img/beta/sentry1.png)

#### Resumen de la petición HTTP

![Sentry 2](img/beta/sentry2.png)

#### Tags resumen y personalizadas

![Sentry 3](img/beta/sentry3.png)
