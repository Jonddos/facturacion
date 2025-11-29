# --------------------------
# 1) Build stage
# --------------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# --------------------------
# 2) Production stage (Nginx)
# --------------------------
FROM nginx:stable-alpine

# Copiamos los archivos compilados de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplazamos la configuración por defecto para permitir SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
