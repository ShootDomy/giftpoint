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

## 🛡️ Tecnologías usadas

## 🛠️ Stack Tecnológico

### Core Backend
| Tecnología       | Versión | Uso en el Proyecto                          | Documentación                     |
|------------------|---------|---------------------------------------------|-----------------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js) | 18.x    | Entorno de ejecución JavaScript del lado del servidor | [Node.js Docs](https://nodejs.org/) |
| ![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express) | 4.x     | Framework para construcción de API REST      | [Express Docs](https://expressjs.com/) |

### Base de Datos
| ![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?logo=sqlite) | 3.x     | Base de datos relacional embebida ligera     | [SQLite Docs](https://www.sqlite.org/) |
| ![Knex.js](https://img.shields.io/badge/Knex.js-2.x-796CFF?logo=knex) | 2.x     | Query Builder para SQL                       | [Knex.js Docs](http://knexjs.org/) |

### Seguridad
| ![JWT](https://img.shields.io/badge/JWT-8.5.1-000000?logo=jsonwebtokens) | 8.5.1   | Autenticación stateless con tokens           | [JWT Docs](https://jwt.io/) |
| ![bcrypt](https://img.shields.io/badge/bcrypt-5.x-00A4B4) | 5.x     | Hashing seguro de contraseñas                | [bcrypt npm](https://www.npmjs.com/package/bcrypt) |

### Calidad de Código
| ![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3?logo=eslint) | 8.x     | Linter para mantener estilo de código        | [ESLint Docs](https://eslint.org/) |
| ![Babel](https://img.shields.io/badge/Babel-7.x-F9DC3E?logo=babel) | 7.x     | Transpilador para compatibilidad ES6+        | [Babel Docs](https://babeljs.io/) |

### Testing
| ![Jest](https://img.shields.io/badge/Jest-29.x-C21325?logo=jest) | 29.x    | Framework para pruebas unitarias             | [Jest Docs](https://jestjs.io/) |
| ![Supertest](https://img.shields.io/badge/Supertest-6.x-005571) | 6.x     | Testing de endpoints HTTP                    | [Supertest npm](https://www.npmjs.com/package/supertest) |

### DevOps
| ![Git](https://img.shields.io/badge/Git-2.x-F05032?logo=git) | 2.x     | Control de versiones                         | [Git Docs](https://git-scm.com/) |
| ![npm](https://img.shields.io/badge/npm-9.x-CB3837?logo=npm) | 9.x     | Gestión de paquetes y dependencias           | [npm Docs](https://docs.npmjs.com/) |

## 📋 Endpoints Disponibles

| Método  | Endpoint                     | Descripción                              | Autenticación | Body Requerido                     |
|---------|------------------------------|------------------------------------------|---------------|-------------------------------------|
| `POST`  | `/api/auth/register`         | Registra un nuevo usuario                | ❌ No         | `{username, email, password}`      |
| `POST`  | `/api/auth/login`            | Inicia sesión y obtiene JWT              | ❌ No         | `{email, password}`                |
| `GET`   | `/api/giftcards`             | Obtiene todas las gift cards del usuario | ✅ Sí (JWT)   | -                                   |
| `POST`  | `/api/giftcards`             | Crea una nueva gift card                 | ✅ Sí (JWT)   | `{name, points, expirationDate}`   |
| `DELETE`| `/api/giftcards/:id`         | Elimina una gift card específica         | ✅ Sí (JWT)   | -                                   |

**Leyenda:**
- ✅ Sí = Requiere header `Authorization: Bearer <token>`
- ❌ No = No requiere autenticación
- `:id` = UUID de la gift card (ej: `550e8400-e29b-41d4-a716-446655440000`)

### Ejemplo de Uso Completo:
```http
GET /api/giftcards
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json
```

## 👨‍💻 Información del Autor

Este proyecto fue creado por **Domenica Vintimilla**.

- **Correo**: [canizaresdomenica4@gmail.com](mailto:canizaresdomenica4@gmail.com)
- **GitHub**: [https://github.com/ShootDomy](https://github.com/ShootDomy)
- **LinkedIn**: [https://www.linkedin.com/in/domenica-vintimilla-24a735245/](https://www.linkedin.com/in/domenica-vintimilla-24a735245/)
