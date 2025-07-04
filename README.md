# 🎁 GiftPoint API

GiftPoint es una API REST desarrollada con **Express.js** y **SQLite** que permite gestionar usuarios y giftcards. El proyecto incluye autenticación JWT, validaciones robustas y pruebas para garantizar la calidad del código.

## 🚀 Funcionalidades

- Registro e inicio de sesión de usuarios con token JWT
- Creación, obtención y eliminación de giftcards
- Validación de datos y UUIDs
- Pruebas automatizadas para endpoints principales
- Configuración de ESLint y Babel para mejorar calidad de código

## 📦 Instalación

1. Clona este repositorio:

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

## ⚙️ Uso

Para ejecutar la API en modo desarrollo:

```bash
npm run dev

```

Para compilar con Babel y ejecutar:

```bash
npm run build
npm start

```

## 🧪 Pruebas

```bash
npm test

```

## 📂 Estructura del proyecto

```bash
giftpoint/
├── controllers/       # Lógica de negocio (auth, giftcards)
├── db/                # Configuración y esquemas de SQLite
├── middleware/        # Middleware (validación, auth)
├── routes/            # Endpoints de la API
├── tests/             # Pruebas automatizadas
├── utils/             # Funciones auxiliares
├── index.js           # Punto de entrada
└── package.json

```

## 🛡️ Tecnologías usadas

- Node.js
- Express.js
- SQLite
- JWT (jsonwebtoken)
- bcrypt
- ESLint + Babel
- Jest (para pruebas)

## 👨‍💻 Información del Autor

Este proyecto fue creado por **Domenica Vintimilla**.

- **Correo**: [canizaresdomenica4@gmail.com](mailto:canizaresdomenica4@gmail.com)
- **GitHub**: [https://github.com/ShootDomy](https://github.com/ShootDomy)
- **LinkedIn**: [https://www.linkedin.com/in/domenica-vintimilla-24a735245/](https://www.linkedin.com/in/domenica-vintimilla-24a735245/)
