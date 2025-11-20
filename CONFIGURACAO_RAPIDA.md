# ⚡ CONFIGURAÇÃO RÁPIDA - 5 MINUTOS

## 🎯 **PASSO A PASSO SIMPLES:**

### 1. 🔑 **OBTER CHAVE DA IA (2 minutos)**

#### **Opção A: Groq (Recomendado)**
1. Acesse: https://console.groq.com/
2. Faça login com Google/GitHub
3. Clique em "API Keys" 
4. Clique "Create API Key"
5. Copie a chave (começa com `gsk_...`)

#### **Opção B: OpenRouter (Alternativa)**
1. Acesse: https://openrouter.ai/
2. Faça login
3. Vá em "Keys"
4. Clique "Create Key"
5. Copie a chave

### 2. ✏️ **EDITAR ARQUIVO .env (1 minuto)**

Abra o arquivo `.env` e preencha:

```env
# Cole sua chave aqui (escolha UMA das opções):
GROQ_API_KEY=gsk_sua_chave_aqui
# OU
OPENROUTER_API_KEY=sk-or-sua_chave_aqui

# Seu número do WhatsApp (OBRIGATÓRIO):
AUTHORIZED_IDS=5511999999999@s.whatsapp.net

# Grupos onde o bot vai funcionar:
ALLOWED_GROUP_NAMES=Meu Grupo,Família
```

### 3. 🚀 **INICIAR BOT (30 segundos)**

```bash
npm start
```

### 4. 📱 **CONECTAR WHATSAPP (1 minuto)**

1. Aparecerá um QR Code no terminal
2. Abra WhatsApp no celular
3. Vá em "Dispositivos Conectados"
4. Escaneie o QR Code
5. Pronto! ✅

---

## 🔧 **EXEMPLO DE CONFIGURAÇÃO COMPLETA:**

```env
# API da IA
GROQ_API_KEY=gsk_abc123def456ghi789

# Seu número (administrador)
AUTHORIZED_IDS=5511987654321@s.whatsapp.net

# Grupos permitidos
ALLOWED_GROUP_NAMES=Família Silva,Trabalho TI,Amigos

# Usuários PV permitidos (opcional)
ALLOWED_USER_IDS=5511987654321@s.whatsapp.net,5511123456789@s.whatsapp.net

# Configurações do servidor
QR_SERVER_PORT=3001
NODE_ENV=development
```

---

## ✅ **TESTE SE ESTÁ FUNCIONANDO:**

1. **No grupo:** Digite `bot oi`
2. **Comando admin:** Digite `/status`
3. **IA:** Responda uma mensagem do bot
4. **Anti-spam:** Teste enviando "blaze" (será bloqueado)

---

## 🆘 **PROBLEMAS COMUNS:**

### **Bot não responde:**
- ✅ Verifique se o grupo está em `ALLOWED_GROUP_NAMES`
- ✅ Verifique se você é admin em `AUTHORIZED_IDS`

### **IA não funciona:**
- ✅ Verifique se a chave da API está correta
- ✅ Teste com `bot oi` primeiro

### **QR Code não aparece:**
- ✅ Execute `npm start` novamente
- ✅ Verifique se a porta 3001 está livre

---

## 🎉 **PRONTO!**

Seu bot está configurado e funcionando! 

**Comandos principais:**
- `/comandos` - Ver todos os comandos
- `/regras` - Regras do grupo  
- `/status` - Estatísticas
- `bot ajuda` - Ajuda da IA

**Para produção (Railway/Heroku):**
- Configure as mesmas variáveis no painel da hospedagem
- Mude `NODE_ENV=production`