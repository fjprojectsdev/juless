#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🤖 iMavyBot - Configuração Automática');
console.log('=====================================\n');

// Verificar se .env existe
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('❌ Arquivo .env não encontrado!');
    console.log('💡 Execute: cp .env.example .env');
    process.exit(1);
}

// Ler .env atual
let envContent = fs.readFileSync(envPath, 'utf8');

console.log('📋 CONFIGURAÇÃO NECESSÁRIA:');
console.log('==========================\n');

console.log('1. 🧠 API DE IA (Obrigatório):');
console.log('   • Groq: https://console.groq.com/');
console.log('   • OpenRouter: https://openrouter.ai/');
console.log('   Configure pelo menos UMA das duas!\n');

console.log('2. 👤 SEU NÚMERO (Obrigatório):');
console.log('   • Formato: 5511999999999@s.whatsapp.net');
console.log('   • Substitua pelo seu número real\n');

console.log('3. 📱 GRUPOS PERMITIDOS:');
console.log('   • Nome exato dos grupos onde o bot vai funcionar');
console.log('   • Exemplo: Meu Grupo,Família\n');

console.log('🔧 PRÓXIMOS PASSOS:');
console.log('==================');
console.log('1. Edite o arquivo .env');
console.log('2. Configure as variáveis necessárias');
console.log('3. Execute: npm start');
console.log('4. Escaneie o QR Code no WhatsApp\n');

console.log('✅ Configuração inicial completa!');
console.log('📖 Leia o README.md para mais detalhes.');