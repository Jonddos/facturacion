FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json tsconfig.json ./
RUN npm install

# Copiar código fuente
COPY src ./src

# Compilar TypeScript
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
