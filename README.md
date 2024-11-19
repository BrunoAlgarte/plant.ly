# Plant.ly 🌱

Plant.ly é uma aplicação completa para gerenciamento de plantas, permitindo que usuários monitorem e cuidem de suas plantas de forma eficiente. O projeto é dividido em três partes principais: frontend web, aplicativo mobile e backend.

## 👥 Autores

- Rafael - [GitHub](https://github.com/RafaelVSs)
- Bruno - [GitHub](https://github.com/Brunoalgarte)
- Eduardo - [GitHub](https://github.com/eduardovbf)- Modo offline


## 🏗️ Estrutura do Projeto
```
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

```

### Requisitos
- Node.js 18+
- MongoDB
- Expo CLI (mobile)
- Yarn ou NPM


## Frontend Web (Next.js)

### 🚀 Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS

### 🖥️ Funcionalidades Principais

- Autenticação de usuários (Login/Registro)
- Reset de senha
- Dashboard com estatísticas
- Gerenciamento de plantas
- Perfil do usuário

### 🚀 Como Executar

abra um terminal na pasta plant.ly e execute o comando:

```
bash

cd client
npm install
npm run dev
```

## Mobile (React Native)

### 🚀 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript

### 📱 Funcionalidades Principais

- Autenticação de usuários (Login/Registro)
- Reset de senha
- Dashboard com estatísticas
- Gerenciamento de plantas
- Perfil do usuário
- Sistema de notificações
- Câmera para fotos das plantas

### 🚀 Como Executar

abra um terminal na pasta plant.ly e execute o comando:

```
bash

cd mobile
npm install
# Baixe no seu celular o app Expo Go
npx expo start
# Escaneie o QR Code com o app Expo Go
```



## Backend (Express)

### 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB


### 🚀 Como Executar

```
bash

cd server
npm install
# Configure o .env com as variáveis do MongoDB
npm run dev
```

### 🔐 Variáveis de Ambiente

env
MONGODB_URI="mongodb://seu_link_do_mongo"
PORT=


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

