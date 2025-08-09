FROM node:18-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Порт приложения
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]