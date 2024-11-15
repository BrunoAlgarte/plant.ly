# Plant.ly 🌱

Plant.ly é uma aplicação completa para gerenciamento de plantas, permitindo que usuários monitorem e cuidem de suas plantas de forma eficiente. O projeto é dividido em três partes principais: frontend web, aplicativo mobile e backend.

## 🚀 Tecnologias Utilizadas

### Frontend Web (Next.js)
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- Context API
- JWT Authentication
- React Icons

### Mobile (React Native)
- React Native
- Expo
- TypeScript
- Styled Components
- React Navigation
- Async Storage
- Axios
- Context API

### Backend (Express)
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Bcrypt
- CORS
- dotenv

## 📱 Funcionalidades Principais

### Web & Mobile
- Autenticação de usuários (Login/Registro)
- Reset de senha
- Dashboard com estatísticas
- Gerenciamento de plantas
- Sistema de notificações
- Perfil do usuário

### Específicas Mobile
- Notificações push
- Câmera para fotos das plantas

## 🏗️ Estrutura do Projeto

plant.ly/
├── client/ # Projeto Next.js
│ ├── public/
│ └── src/
│   ├── app/ # Páginas e rotas
│   ├── components/ # Componentes React
│   ├── lib/ # Utilitários
│   └── utils/ # Hooks e funções auxiliares
│
├── mobile/ # Projeto React Native
│ ├── expo/ # Configurações do Expo
│ └── src/
│   ├── @types/ # Definições de tipos TypeScript
│   ├── assets/ # Recursos estáticos
│   ├── components/ # Componentes React Native
│   ├── global/ # Configurações globais
│   ├── pages/ # Telas do aplicativo
│   ├── types/ # Interfaces e tipos
│   └── utils/ # Utilitários e helpers
│
└── server/ # API Express
    └── api/
        └── v1/ # Versão 1 da API
            ├── controllers/ # Controladores da aplicação
            ├── middlewares/ # Middlewares personalizados
            ├── models/ # Schemas Mongoose
            ├── routes/ # Rotas da API
            └──  schemas/ # Schemas de validação



## 🚀 Como Executar

### Requisitos
- Node.js 18+
- MongoDB
- Expo CLI (mobile)
- Yarn ou NPM


### Backend

```
bash

cd server
npm install
# Configure o .env com as variáveis do MongoDB
npm run dev
```

### Frontend Web
abra um terminal na pasta plant.ly e execute o comando:

```
bash

cd client
npm install
npm run dev
```

### Mobile
abra um terminal na pasta plant.ly e execute o comando:

```
bash

cd mobile
npm install
# Baixe no seu celular o app Expo Go
npx expo start
# Escaneie o QR Code com o app Expo Go
```

## 🔐 Variáveis de Ambiente

### Backend (.env)

env
MONGODB_URI="mongodb://seu_link_do_mongo"
PORT=


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Rafael - [GitHub](https://github.com/RafaelVSs)
- Bruno - [GitHub](https://github.com/Brunoalgarte)
- Eduardo - [GitHub](https://github.com/eduardovbf)- Modo offline
