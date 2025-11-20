# 🤖 iMavyBot - Bot WhatsApp Inteligente

Bot avançado para WhatsApp com IA integrada, sistema anti-spam, gerenciamento de grupos e muito mais.

## ✨ Funcionalidades

- 🧠 **IA Integrada** - Groq e OpenRouter com fallback automático
- 🛡️ **Anti-Spam** - Sistema de detecção e punição automática
- 👥 **Gerenciamento de Grupos** - Controle de acesso e moderação
- 📊 **Sistema de Strikes** - Punições progressivas
- 🎉 **Boas-vindas** - Mensagens automáticas para novos membros
- ⏰ **Agendador** - Mensagens programadas
- 📈 **Estatísticas** - Monitoramento de atividades
- 🔐 **Autorização** - Sistema de admins e usuários permitidos

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- NPM ou Yarn
- Conta WhatsApp

### Configuração Local

1. **Clone o projeto:**
```bash
git clone <seu-repositorio>
cd jules
```

2. **Instale dependências:**
```bash
npm install
```

3. **Configure variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. **Configure arquivos JSON:**
```bash
# Os arquivos serão criados automaticamente na primeira execução
# Ou copie dos exemplos:
cp admins.example.json admins.json
cp allowed_groups.example.json allowed_groups.json
cp allowed_users.example.json allowed_users.json
cp blacklist.example.json blacklist.json
```

5. **Execute o bot:**
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# APIs de IA (configure pelo menos uma)
GROQ_API_KEY=sua_chave_groq
OPENROUTER_API_KEY=sua_chave_openrouter

# Administradores (IDs separados por vírgula)
AUTHORIZED_IDS=5511999999999@s.whatsapp.net,5511888888888@s.whatsapp.net

# Grupos permitidos (nomes separados por vírgula)
ALLOWED_GROUP_NAMES=Grupo Teste,Meu Grupo

# Usuários permitidos para PV (IDs separados por vírgula)
ALLOWED_USER_IDS=5511999999999@s.whatsapp.net

# Servidor QR Code (opcional)
QR_SERVER_PORT=3001

# Ambiente
NODE_ENV=production
RAILWAY_ENVIRONMENT=true
```

### Arquivos de Configuração

- `admins.json` - Lista de administradores
- `allowed_groups.json` - Grupos autorizados
- `allowed_users.json` - Usuários permitidos para PV
- `blacklist.json` - Termos e links bloqueados

## 🌐 Deploy na Nuvem

### Railway (Recomendado)

1. **Conecte seu repositório no Railway**
2. **Configure as variáveis de ambiente**
3. **Deploy automático**

### Outras Plataformas

- ✅ Heroku
- ✅ Render
- ✅ AWS EC2
- ✅ Google Cloud
- ✅ Azure
- ✅ VPS

## 📚 Comandos Disponíveis

### Comandos de Admin

- `/adicionargrupo <nome>` - Adicionar grupo autorizado
- `/removergrupo <nome>` - Remover grupo autorizado
- `/listargrupos` - Listar grupos autorizados
- `/adicionaradmin <id>` - Adicionar administrador
- `/removeradmin <id>` - Remover administrador
- `/listaradmins` - Listar administradores
- `/bloqueartermo <termo>` - Bloquear termo
- `/removertermo <termo>` - Remover termo bloqueado
- `/bloquearlink <link>` - Bloquear link
- `/removerlink <link>` - Remover link bloqueado
- `/listatermos` - Listar termos bloqueados

### Comandos de Teste

- `/testar_boasvindas` - Testar mensagem de boas-vindas

## 🛡️ Sistema Anti-Spam

O bot detecta automaticamente:
- Links maliciosos
- Spam de texto
- Conteúdo inadequado
- Mensagens repetitivas

### Punições Progressivas:
1. **1º Strike:** Advertência
2. **2º Strike:** Mute temporário
3. **3º Strike:** Remoção do grupo

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
npm start          # Executar em produção
npm run dev        # Executar com watcher (desenvolvimento)
```

### Estrutura do Projeto

```
jules/
├── functions/           # Módulos funcionais
│   ├── adminCommands.js    # Comandos administrativos
│   ├── antiSpam.js         # Sistema anti-spam
│   ├── authManager.js      # Gerenciamento de autorização
│   ├── chatgpt.js          # Integração com IA
│   ├── configBootstrap.js  # Inicialização de configs
│   ├── customBlacklist.js  # Lista negra personalizada
│   ├── groupResponder.js   # Respostas de grupo
│   ├── groupStats.js       # Estatísticas de grupo
│   ├── memory.js           # Sistema de memória
│   ├── rateLimiter.js      # Limitador de taxa
│   ├── realtime.js         # Contexto em tempo real
│   ├── scheduler.js        # Agendador de tarefas
│   ├── strikeSystem.js     # Sistema de strikes
│   ├── userInfo.js         # Informações de usuário
│   ├── utils.js            # Utilitários
│   └── welcomeMessage.js   # Mensagens de boas-vindas
├── index.js             # Arquivo principal
├── watcher.js           # Watcher para desenvolvimento
├── package.json         # Dependências
├── railway.json         # Configuração Railway
└── *.example.json       # Arquivos de exemplo
```

## 🐛 Troubleshooting

### Problemas Comuns

**Bot não conecta:**
- Verifique se o QR code foi escaneado
- Confirme se a sessão não expirou

**IA não responde:**
- Verifique se as chaves de API estão configuradas
- Confirme se há saldo/créditos nas APIs

**Comandos não funcionam:**
- Verifique se o usuário é administrador
- Confirme se o grupo está autorizado

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

- 📧 Email: seu-email@exemplo.com
- 💬 WhatsApp: +55 11 99999-9999
- 🐛 Issues: [GitHub Issues](link-do-repositorio/issues)

---

**Desenvolvido com ❤️ para a comunidade WhatsApp**