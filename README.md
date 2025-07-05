# 🎁 GiftPoint API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue)
![Jest](https://img.shields.io/badge/Jest-Testing-red)

<img src="https://gqtcjoehbteqyaofqbpt.supabase.co/storage/v1/object/public/portafolio//logo.png" width="100" alt="GiftPoint Logo" align="right" />

GiftPoint es una API REST robusta desarrollada con **Node.js** y **Express** que ofrece un sistema completo para la gestión de usuarios y gift cards. Con arquitectura modular, seguridad JWT y base de datos SQLite.

---

## 🌟 Características Principales

### 🔐 Autenticación Segura

- Registro y login de usuarios con encriptación bcrypt
- Tokens JWT con expiración configurable
- Middleware de verificación de token en rutas protegidas

### 💳 Gestión de Gift Cards

- Creación, lectura y eliminación de tarjetas de regalo
- Validación de datos de entrada
- Sistema modular y escalable

### 🛠️ Calidad del Código

- Pruebas unitarias con Jest
- ESLint para consistencia de código
- Babel para compatibilidad
- Middleware de monitoreo de performance

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ShootDomy/giftpoint.git
cd giftpoint
```

2. Instala las dependencias:

```bash
npm install

```

3. (Opcional) Crea un archivo .env y configura tus variables de entorno:

```bash
JWT_SECRET=yourSecretKey
PORT=3000
```

## ⚙️ Configuración

Archivo .env:

```ini
JWT_SECRET=tu_clave_secreta_compleja
PORT=3000
DB_PATH=./src/db/db.sqlite
```

## � Uso Básico

Modo desarrollo (con nodemon):

```bash
npm run dev

```

Para compilar con Babel y ejecutar:

```bash
npm run build
npm start

```

🧪 Pruebas

```bash
npm test

```

## 📂 Estructura del proyecto

```plaintext
giftpoint/
├── 📁 src/                 # Código fuente principal
│   ├── 📁 controllers/     # Lógica de endpoints
│   │   ├── auth.controller.js
│   │   ├── giftcard.controller.js
│   ├── 📁 db/              # Configuración de DB y modelos
│   │   ├── database.js     # Inicialización de DB
│   │   ├── schema.js       # Esquemas SQL/NoSQL
│   │   ├── db.sqlite       # Archivo donde se almacena la base
│   ├── 📁 middlewares/     # Interceptores
│   │   ├── verifyToken.js         # Middleware para la verificacion del token
│   │   └── responseTimeLogger.js  # Middleware  para registrar los tiempos de respuesta en consola
│   ├── 📁 routes/          # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── giftcard.routes.js
│   ├── 📁 services/        # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── giftcard.service.js
├── 📁 tests/               # Pruebas automatizadas
│   └── 📁 unit/            # Pruebas unitarias
│       └── giftcard.controller.test.js
│
├── 📄 .env                 # Variables de entorno (ignorado en Git)
├── 📄 .gitignore           # Archivos ignorados por Git
├── 📄 package.json         # Dependencias y scripts
├── 📄 server.js            # Punto de entrada principal
└── 📄 README.md            # Documentación del proyecto

```

## 🛡️ Tecnologías

- **Node.js 18.x** - Entorno de ejecución
- **Express 4.x** - Framework backend
- **SQLite 3.x** - Base de datos ligera
- **JWT** - Autenticación stateless
- **bcrypt** - Hashing de contraseñas
- **Jest** - Pruebas unitarias
- **ESLint** - Linter de código
- **Babel** - Transpilador ES6+

## 📋 Endpoints Disponibles

| Método   | Endpoint                     | Descripción                                | Autenticación | Body Requerido                              |
| -------- | ---------------------------- | ------------------------------------------ | ------------- | ------------------------------------------- |
| `POST`   | `/api/auth/register`         | Registra un nuevo usuario                  | ❌ No         | `{email, password}`                         |
| `POST`   | `/api/auth/login`            | Inicia sesión y obtiene JWT                | ❌ No         | `{email, password}`                         |
| `GET`    | `/api/giftcards/:id`         | Obtiene todas las gift cards del usuario   | ✅ Sí (JWT)   | -                                           |
| `GET`    | `/api/giftcards/:id/:userId` | Obtiene tuna gift card del usuario         | ✅ Sí (JWT)   | -                                           |
| `POST`   | `/api/giftcards`             | Crea una nueva gift card                   | ✅ Sí (JWT)   | `{name, amount, currency, expiration_date}` |
| `PUT`    | `/api/giftcards`             | Editar una gift card específica            | ✅ Sí (JWT)   | `{amount, expiration_date}`                 |
| `DELETE` | `/api/giftcards/:id`         | Elimina una gift card específica           | ✅ Sí (JWT)   | -                                           |
| `POST`   | `/api/transfer/:userId`      | Realizar una transferencia entre giftcards | ✅ Sí (JWT)   | `{sourceCardId, destinationCardId, amount}` |

---

**Leyenda:**

- ✅ Sí = Requiere header `Authorization: Bearer <token>`
- ❌ No = No requiere autenticación
- `:id` = UUID de la gift card (ej: `550e8400-e29b-41d4-a716-446655440000`)
- `:userId` = UUID del usuario (ej: `550e8400-e29b-41d4-a716-446655440000`)

## 🚀 Ejemplo de uso con Postman

Puedes probar la API fácilmente usando [Postman](https://www.postman.com/).

### Ejemplo: Obtener todas las gift cards de un usuario

**Request:**
```http
GET /api/giftcards/b4a9e632-869f-4702-bf4c-cdf7562eeb58?idSource=1b7b93a9-b07c-4d94-bbf1-7c4768d51d30
Headers:
  Authorization: Bearer <tu_token_jwt>
  Content-Type: application/json
```

**Response:**
```json
[
  {
    "id": "1b7b93a9-b07c-4d94-bbf1-7c4768d51d30",
    "name": "Card 1",
    "amount": 10.5,
    "currency": "USD",
    "expiration_date": "2025-12-02",
    "user_id": "b4a9e632-869f-4702-bf4c-cdf7562eeb58",
    "expired": false
  }
]
```

### 📥 Importar colección de Postman

Puedes importar la colección de endpoints usando el archivo `postman_collection.json` incluido en este repositorio  
o [Descargar colección de Postman](./postman/postman_collection.json).

## 👨‍💻 Información del Autor

Este proyecto fue creado por **Domenica Vintimilla**.

- **Correo**: [canizaresdomenica4@gmail.com](mailto:canizaresdomenica4@gmail.com)
- **GitHub**: [https://github.com/ShootDomy](https://github.com/ShootDomy)
- **LinkedIn**: [https://www.linkedin.com/in/domenica-vintimilla-24a735245/](https://www.linkedin.com/in/domenica-vintimilla-24a735245/)
