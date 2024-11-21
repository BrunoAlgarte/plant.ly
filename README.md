# Plant.ly 🌱

Projeto interdisciplinar 4° Semestre Fatec Franca - Dr Thomaz Novelino.

A solução integra tecnologias modernas de IoT, análise de dados estatísticos e interfaces web/mobile para oferecer uma experiência única aos usuários.
Este documento apresenta as tecnologias utilizadas e instruções detalhadas para executar o projeto localmente.
## 👥 Autores

- Bruno Algarte Inacio - [GitHub](https://github.com/Brunoalgarte)
- Eduardo Vilas Boas Freitas - [GitHub](https://github.com/eduardovbf)
- Rafael Verrisimo Da Silva - [GitHub](https://github.com/RafaelVSs)



## 🏗️ Estrutura do Projeto
```
plant.ly/
├── IoT/                  # Projeto IoT
│   ├── dashboard_grafana/  # Import do dashboard
│   └── script_sensordatas/ # Código Python
├── client/               # Projeto Next.js
│   ├── public/
│   └── src/
│       ├── app/          # Páginas e rotas
│       ├── components/   # Componentes React
│       ├── lib/          # Utilitários
│       └── utils/        # Hooks e funções auxiliares
├── mobile/               # Projeto React Native
│   ├── expo/             # Configurações do Expo
│   └── src/
│       ├── @types/       # Definições de tipos TypeScript
│       ├── assets/       # Recursos estáticos
│       ├── components/   # Componentes React Native
│       ├── global/       # Configurações globais
│       ├── pages/        # Telas do aplicativo
│       ├── types/        # Interfaces e tipos
│       └── utils/        # Utilitários e helpers
└── server/               # API Express
    └── api/
        └── v1/           # Versão 1 da API
            ├── controllers/ # Controladores da aplicação
            ├── middlewares/ # Middlewares personalizados
            ├── models/      # Schemas Mongoose
            ├── routes/      # Rotas da API
            └── schemas/     # Schemas de validação

```

### Requisitos
- Node.js 18+
- MongoDB
- Expo CLI (mobile)
- Yarn ou NPM


# 🖥️ Frontend Web (Next.js)



### 🚀 Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS

### 🕹️ Funcionalidades Principais

- Autenticação de usuários (Login/Registro)
- Reset de senha
- Dashboard com estatísticas
- Gerenciamento de plantas
- Perfil do usuário

### 🛠️  Como Executar

abra um terminal na pasta plant.ly e execute o comando:

```
bash

cd client
npm install
npm run dev
```

### 📸 Telas frontend

- Tela de login / Cadastro de usuário

  <img src="client/public/img/front_login.jpeg" width="500"/>  <img src="client/public/img/front_tela_de_cadasto.png" width="500"/>


- Tela de entrada / Tela de Dados


  <img src="client/public/img/front_home_page.png" width="500"/>  <img src="client/public/img/front_dados_da_planta.png" width="500"/>


- Tela minhas plantas  / Cadastro de planta

  <img src="client/public/img/front_minhas_plantas.png" width="500"/>  <img src="client/public/img/front_adição_de_plantas.png" width="500"/>



# 🔙 Backend (Express)

### 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- OnpenApi


### 🛠️ Como Executar

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

# 📱 Mobile (React Native)

### 🚀 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript

### 🕹️ Funcionalidades Principais

- Autenticação de usuários (Login/Registro)
- Reset de senha
- Dashboard com estatísticas
- Gerenciamento de plantas
- Perfil do usuário
- Câmera para fotos das plantas

### 🛠️  Como Executar

abra um terminal na pasta plant.ly e execute o comando:

```
bash

cd mobile
npm install
# Baixe no seu celular o app Expo Go
npx expo start
# Escaneie o QR Code com o app Expo Go
```
### 📸 Telas mobile

- Tela de login / Cadastro de usuário

  <img src="mobile/assets/mobile_login.jpeg" width="200"/>  <img src="mobile/assets/mobile_cadastro_de_usuario.jpeg" width="200"/>

- Tela alteração de senha / Cadastro de plantas

  <img src="mobile/assets/mobile_alteracao_senha.jpeg" width="200"/>  <img src="mobile/assets/mobile_tela_cadastro_planta.jpeg" width="200"/>

- Tela minhas plantas / Dados da planta

  <img src="mobile/assets/mobile_minhas_plantas.jpeg" width="200"/>  <img src="mobile/assets/mobile_dados da planta.jpeg" width="200"/>

- Gráficos

  <img src="mobile/assets/mobile_gráficos.jpeg" width="200"/>  <img src="mobile/assets/mobile_gráficos_2.jpeg" width="200"/>

 

# 🌐 Iot e estatistícas

### 🚀 Tecnologias Utilizadas

- Python 
- Grafana Cloud


### 🌡️ Sensores

- **Sensor de temperatura e umidade do ar DHT22**

  <img src="IoT/sensor_ar_front.png" alt="Sensor de temperatura e umidade do ar" width="200"/>
  <img src="IoT/sensor_ar_back.png" width="200">
  
- **Sensor de umidade do solo digital**


  <img src="IoT/sensor_solo_front.png" alt="Sensor de umidade do solo" width="200"/>
  <img src="IoT/sensor_solo_back.png" alt="Sensor de umidade do solo" width="200"/>

- **Raspberry PI 3.0**


  <img src="IoT/raspberrypi.png" alt="Sensor de umidade do solo" width="200"/>

### 🪛 Configuração

```
🖇️ Pinos do Sensor DHT22
VCC: Alimentação (+3.3V ou +5V do Raspberry Pi)
DATA: Pino de dados para comunicação com o Raspberry Pi
GND: Terra (Ground)

🔌 Conexão com o Raspberry Pi
Conecte o pino VCC do DHT22 a um dos pinos de 3.3V ou 5V do Raspberry Pi.
Conecte o pino DATA a um dos pinos GPIO do Raspberry Pi (ex.: GPI21).
Conecte o pino GND ao GND do Raspberry Pi.

🖇️ Pinos do Sensor de Umidade do Solo
VCC: Alimentação (+3.3V ou +5V do Raspberry Pi)
DO: Saída digital (para GPIO)
GND: Terra (Ground)

🔌 Conexão com o Raspberry Pi
Conecte o pino VCC do sensor ao 3.3V do Raspberry Pi.
Conecte o pino DO (Saída Digital) a um pino GPIO (ex.: GPIO17).
Conecte o pino GND ao GND do Raspberry Pi.

```

### 📚 Leitura dos dados

```
Acesse o raspberrypi 3.0.
Instale o Python3.
Instale as bibliotecas necessárias:

-pip3 install Adafruit_DHT
-pip3 install RPi.GPIO
-pip3 install pymongo
-pip3 install bson


Crie uma pasta e copie o arquivo /IoT/script_plant.ly.py

Defina suas váriaveis de ambiente:

Informe o ID da sua planta e o serviço de escrita se inicia.
```


### 📊 Dashboard estatístico

```
1. Crie uma conta no Grafana Cloud.
2. Instale o plugin "Infinity" e configure o Data Source com a URL local da API.
3. Importe o arquivo `/IoT/dashboard_grafana.json`.
4. Realize o filtro conforme a data dos dados coletados.
5. Compartilhe o gráfico publicamente.
```
  
### 📈 Métricas: 
Média,moda,mediana,desvio padrão, assimetria,projeção futura,máxima,mínima e último registro.  
(cálculos realizados no backend da aplicação)

### 📸 Gráficos:

 <img src="IoT/tela_1_grafana.png"  width="400"/>
 <img src="IoT/tela_2_grafana.png" width="400">
 <img src="IoT/tela_3_grafana.png" width="400">


- [Dashborad Plant.ly](https://brunoalgter.grafana.net/public-dashboards/c35726a3560941c5af48617424b9ddb1?orgId=1)



## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

