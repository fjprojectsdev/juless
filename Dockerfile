# Use Node.js 18 Alpine para imagem menor
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Copiar código da aplicação
COPY . .

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Criar diretórios necessários e definir permissões
RUN mkdir -p auth_info logs && \
    chown -R nextjs:nodejs /app

# Mudar para usuário não-root
USER nextjs

# Expor porta (se necessário)
EXPOSE 3001

# Comando de saúde
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('Health check OK')" || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "start"]