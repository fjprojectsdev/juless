// Sistema Anti-Links e Anti-Palavras Proibidas
import { getUserName } from './userInfo.js';
import { checkCustomViolation } from './customBlacklist.js';

const LINK_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-z0-9-]+\.(com|net|org|gg|me|xyz|io|br|top|bet|vip|app|site|online|click|link|cc|tv|live)\b)/i;

const BANNED_WORDS = [
    // Cassinos e apostas principais
    'blaze', 'blazee', 'betano', 'bétano', 'bet365', 'stake', 'pixbet', 'sportingbet',
    'betfair', 'betway', 'betnacional', '1xbet', '22bet', 'rivalo', 'bodog',
    'betsson', 'betmotion', 'betwinner', 'melbet', 'parimatch', 'pinnacle',
    
    // Jogos específicos
    'fortune tiger', 'tigrinho', 'tigre da fortuna', 'fortune ox', 'fortune mouse',
    'fortune rabbit', 'aviator', 'spaceman', 'mines', 'crash', 'double',
    'roleta', 'roulette', 'blackjack', 'baccará', 'poker', 'slots',
    
    // Cassinos online
    'cassino', 'casino', 'cassino online', 'casino online', 'jogo do bicho',
    'caça níquel', 'caça niquel', 'slot machine', 'jackpot',
    
    // Plataformas de apostas esportivas
    'esporte bet', 'esportebet', 'apostas esportivas', 'bet esportivo',
    'futebol bet', 'odds', 'handicap', 'over under',
    
    // Termos de burla
    'renda extra', 'dinheiro rápido', 'ganhe dinheiro', 'lucro garantido',
    'grupo vip', 'vip apostas', 'sinais vip', 'grupo de sinais',
    'consultor esportivo', 'trader esportivo', 'lucro diário',
    'investimento rápido', 'ganhos diários', 'renda passiva',
    'trabalhe em casa', 'seja seu próprio chefe', 'oportunidade única',
    'plataforma',
    
    // Criptomoedas suspeitas
    'trade bot', 'robô de apostas', 'bot de sinais', 'hack', 'trapacear',
    'martingale', 'estratégia infalivel', 'estratégia infalivel',
    
    // Outras plataformas
    'galera bet', 'galerabet', 'novibet', 'leovegas', 'betclic', 'betboo',
    'betpix', 'bet pix', 'pixbet365', 'estrela bet', 'estrela.bet',
    'mr jack', 'mrjack', 'superbet', 'vaidebet', 'vaide bet',
    'arbety', 'brabet', 'brazino', 'brazino777', 'f12bet', 'f12.bet',
    'pagbet', 'pag.bet', 'reals bet', 'realsbet', 'sambabet', 'samba.bet'
];

const BANNED_PATTERNS = [
    // Variações de blaze
    /b[l1i!|]a?[z2s5]e/i,
    /bl[a@4]z[e3]/i,
    
    // Variações de stake
    /st[a@4]k[e3]/i,
    /s[t7][a@]ke/i,
    
    // Variações de betano
    /b[e3][t7][a@4]n[o0]/i,
    /bet[a@]n[o0]/i,
    
    // Variações de tigrinho
    /t[i1!]gr[i1!]nh[o0]/i,
    /t[i1]gr[e3]/i,
    
    // Variações de pixbet
    /pi[x×][\s]?b[e3]t/i,
    /p[i1!]xb[e3]t/i,
    
    // Variações de cassino
    /c[a@4]ss[i1!]n[o0]/i,
    /c[a@]s[i1]n[o0]/i,
    
    // Variações de fortune
    /f[o0]rtun[e3]/i,
    /f[o0]rtu[n\u00f1]e/i,
    
    // Variações de bet
    /b[e3][t7]/i,
    /\bb[e3]t\d+/i,
    
    // Aviator
    /[a@4]v[i1!][a@4]t[o0]r/i,
    
    // Mines
    /m[i1!]n[e3]s/i,
    
    // Roleta
    /r[o0]l[e3]t[a@4]/i,
    
    // VIP e sinais
    /v[i1!]p/i,
    /s[i1!]na[i1!]s/i,
    
    // Ganhar dinheiro
    /ganh[e3][\s]?d[i1!]nh[e3][i1!]r[o0]/i,
    /lucr[o0][\s]?garant[i1!]d[o0]/i
];

export function checkViolation(text) {
    const lowerText = text.toLowerCase();
    
    // Verificar blacklist personalizada primeiro
    const customCheck = checkCustomViolation(text);
    if (customCheck.violated) {
        return { violated: true, type: customCheck.type, content: text };
    }
    
    // Verificar links (mais rigoroso)
    if (LINK_REGEX.test(text)) {
        return { violated: true, type: 'link detectado', content: text };
    }
    
    // Verificar palavras proibidas exatas
    for (const word of BANNED_WORDS) {
        if (lowerText.includes(word)) {
            return { violated: true, type: `palavra proibida: "${word}"`, content: text };
        }
    }
    
    // Verificar padrões camuflados (RegEx)
    for (const pattern of BANNED_PATTERNS) {
        if (pattern.test(text)) {
            return { violated: true, type: 'palavra camuflada detectada', content: text };
        }
    }
    
    // Verificar emojis suspeitos combinados com números (ex: 🐯 + link)
    if (/[🐯🎰🎲🎯💰💸💵]/.test(text) && /\d{4,}/.test(text)) {
        return { violated: true, type: 'conteúdo suspeito (emoji + números)', content: text };
    }
    
    return { violated: false };
}

export async function notifyAdmins(sock, groupId, violationData) {
    try {
        const groupMetadata = await sock.groupMetadata(groupId);
        const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
        
        const { userId, dateTime, message } = violationData;
        
        // Buscar número real do participante
        const participant = groupMetadata.participants.find(p => p.id === userId);
        
        let userNumber = userId.split('@')[0];
        
        // Usar jid (número real) se disponível
        if (participant && participant.jid) {
            userNumber = participant.jid.split('@')[0];
        }
        
        // Formatar número: +55 (XX) XXXX-XXXX
        let formattedNumber = userNumber;
        if (userNumber && userNumber.length >= 12) {
            const country = userNumber.substring(0, 2);
            const ddd = userNumber.substring(2, 4);
            const part1 = userNumber.substring(4, 8);
            const part2 = userNumber.substring(8);
            formattedNumber = `+${country} (${ddd}) ${part1}-${part2}`;
        }
        
        const adminMessage = `🚨 *ALERTA DE VIOLAÇÃO* 🚨
🔒 *SISTEMA DE SEGURANÇA* 🔒
━━━━━━━━━━━━━━━━
_O sistema detectou o envio de link ou palavra-chave proibida no grupo._ 
_A ação foi bloqueada automaticamente para manter a segurança._ 🔒
━━━━━━━━━━━━━━━━
👤 *Dados do usuário:* 👤
> 🆔 *ID:* ${userId}
> 📱 *Número:* ${formattedNumber}
> 🕒 *Data/Hora:* ${dateTime}
━━━━━━━━━━━━━━━━
🚨 *MENSAGEM BLOQUEADA:* 🚨 

${message}

━━━━━━━━━━━━━━━━
_A mensagem foi removida automaticamente pelo sistema._ 🗑️  
> Se desejarem aplicar punições adicionais, verifiquem o histórico do grupo. 🔍⚖️`;

        for (const adminId of admins) {
            await sock.sendMessage(adminId, { text: adminMessage });
        }
        
        console.log('✅ Administradores notificados');
    } catch (error) {
        console.error('❌ Erro ao notificar admins:', error);
    }
}

export async function notifyUser(sock, userId, groupId = null, blockedMessage = '') {
    try {
        const userMessage = `🚨 *ALERTA DE VIOLAÇÃO* 🚨
🔒 *SISTEMA DE SEGURANÇA* 🔒
━━━━━━━━━━━━━━━━
_Sua mensagem foi bloqueada por violar as regras do grupo._
_A ação foi executada automaticamente para manter a segurança._ 🔒
━━━━━━━━━━━━━━━━
*Detalhes:*
> 🆔 *ID Usuário:* ${userId}
> 📱 *Grupo:* ${groupId || 'N/A'}
━━━━━━━━━━━━━━━━

🚨 *MENSAGEM BLOQUEADA:* 🚨 

${blockedMessage}

━━━━━━━━━━━━━━━━

_A mensagem foi removida automaticamente pelo sistema._ 🗑️
> Repetidas violações podem resultar em medidas adicionais (strikes, expulsão). 🔍⚖️`;

        await sock.sendMessage(userId, { text: userMessage });
        console.log('✅ Usuário notificado');
    } catch (error) {
        console.error('❌ Erro ao notificar usuário:', error);
    }
}

export function logViolation(violationData) {
    console.log('🔍 DEBUG violationData completo:', JSON.stringify(violationData, null, 2));
    const log = `[${violationData.dateTime}] ${violationData.userName} (${violationData.userNumber}): ${violationData.message}`;
    console.log('📝 VIOLAÇÃO:', log);
}
