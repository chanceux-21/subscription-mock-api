FROM node:18 AS build
WORKDIR /app

# Сначала копируем только package.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY public ./public
COPY src ./src

# Собираем приложение
RUN npm run build

# Финальный образ
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80