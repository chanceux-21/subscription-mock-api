FROM node:18-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Порт приложения
EXPOSE 5000

# Команда запуска
CMD ["node", "server.js"]