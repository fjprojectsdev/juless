#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🧪 iMavyBot - Teste de Configuração');
console.log('===================================\n');

let errors = 0;
let warnings = 0;

// Verificar arquivo .env
console.log('📁 Verificando arquivos...');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('✅ .env encontrado');
} else {
    console.log('❌ .env não encontrado');
    errors++;
}

// Verificar APIs
console.log('\n🧠 Verificando APIs de IA...');
const groqKey = process.env.GROQ_API_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

if (groqKey && groqKey.trim() !== '') {
    console.log('✅ GROQ_API_KEY configurada');
} else if (openrouterKey && openrouterKey.trim() !== '') {
    console.log('✅ OPENROUTER_API_KEY configurada');
} else {
    console.log('❌ Nenhuma API de IA configurada');
    console.log('💡 Configure GROQ_API_KEY ou OPENROUTER_API_KEY');
    errors++;
}

// Verificar administradores
console.log('\n👤 Verificando administradores...');
const authorizedIds = process.env.AUTHORIZED_IDS;
if (authorizedIds && authorizedIds.trim() !== '') {
    const ids = authorizedIds.split(',').map(id => id.trim()).filter(Boolean);
    console.log(`✅ ${ids.length} administrador(es) configurado(s)`);
    ids.forEach((id, i) => {
        if (id.includes('@s.whatsapp.net')) {
            console.log(`   ${i+1}. ${id} ✅`);
        } else {
            console.log(`   ${i+1}. ${id} ⚠️ (formato incorreto)`);
            warnings++;
        }
    });
} else {
    console.log('❌ Nenhum administrador configurado');
    console.log('💡 Configure AUTHORIZED_IDS');
    errors++;
}

// Verificar grupos
console.log('\n📱 Verificando grupos permitidos...');
const allowedGroups = process.env.ALLOWED_GROUP_NAMES;
if (allowedGroups && allowedGroups.trim() !== '') {
    const groups = allowedGroups.split(',').map(g => g.trim()).filter(Boolean);
    console.log(`✅ ${groups.length} grupo(s) configurado(s)`);
    groups.forEach((group, i) => {
        console.log(`   ${i+1}. "${group}"`);
    });
} else {
    console.log('⚠️ Nenhum grupo configurado');
    console.log('💡 Configure ALLOWED_GROUP_NAMES ou o bot funcionará em qualquer grupo');
    warnings++;
}

// Verificar arquivos JSON
console.log('\n📄 Verificando arquivos de configuração...');
const configFiles = [
    'admins.json',
    'allowed_groups.json', 
    'allowed_users.json',
    'blacklist.json'
];

configFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`⚠️ ${file} (será criado automaticamente)`);
    }
});

// Resultado final
console.log('\n📊 RESULTADO DO TESTE:');
console.log('=====================');

if (errors === 0 && warnings === 0) {
    console.log('🎉 CONFIGURAÇÃO PERFEITA!');
    console.log('✅ Tudo configurado corretamente');
    console.log('🚀 Execute: npm start');
} else if (errors === 0) {
    console.log('✅ CONFIGURAÇÃO OK!');
    console.log(`⚠️ ${warnings} aviso(s) - bot funcionará normalmente`);
    console.log('🚀 Execute: npm start');
} else {
    console.log('❌ CONFIGURAÇÃO INCOMPLETA!');
    console.log(`❌ ${errors} erro(s) crítico(s)`);
    console.log(`⚠️ ${warnings} aviso(s)`);
    console.log('🔧 Corrija os erros antes de executar o bot');
}

console.log('\n💡 Dica: Leia CONFIGURACAO_RAPIDA.md para ajuda');