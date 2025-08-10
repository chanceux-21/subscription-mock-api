# client/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# Установка зависимостей
RUN npm install --legacy-peer-deps

# Создание пользователя
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

COPY . .
EXPOSE 3000
CMD ["npm", "start"]