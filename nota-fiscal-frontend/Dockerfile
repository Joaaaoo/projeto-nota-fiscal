# Etapa de build
FROM node:18 AS build

WORKDIR /usr/src/app

# Copiar arquivos de configuração e dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Gerar o build do projeto
RUN npm run build -- --configuration production

# Etapa de produção
FROM nginx:alpine

# Copiar os arquivos do build para o diretório padrão do Nginx
COPY --from=build /usr/src/app/dist/nota-fiscal-frontend /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]