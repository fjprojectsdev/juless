import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CORE_CONFIGS = [
    {
        target: 'admins.json',
        example: 'admins.example.json',
        initialData: () => ({
            admins: [],
            lastUpdate: new Date().toISOString()
        })
    },
    {
        target: 'allowed_groups.json',
        example: 'allowed_groups.example.json',
        initialData: () => []
    },
    {
        target: 'allowed_users.json',
        example: 'allowed_users.example.json',
        initialData: () => []
    },
    {
        target: 'blacklist.json',
        example: 'blacklist.example.json',
        initialData: () => []
    }
];

function parseEnvAdmins() {
    return (process.env.AUTHORIZED_IDS || '')
        .split(',')
        .map(id => id.trim())
        .filter(Boolean);
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function copyExample(examplePath, targetPath) {
    const raw = await fs.readFile(examplePath, 'utf8');
    await fs.writeFile(targetPath, raw, 'utf8');
}

async function createFromInitial(initialDataFn, targetPath) {
    const payload = initialDataFn();
    await fs.writeFile(targetPath, JSON.stringify(payload, null, 2), 'utf8');
}

async function ensureAdminsSeed(targetPath) {
    const envAdmins = parseEnvAdmins();
    if (!envAdmins.length) return;

    let fileChanged = false;
    let adminData = {
        admins: [],
        lastUpdate: new Date().toISOString()
    };

    try {
        const raw = await fs.readFile(targetPath, 'utf8');
        const parsed = JSON.parse(raw);
        adminData.admins = Array.isArray(parsed.admins) ? parsed.admins : [];
    } catch {
        // manter valores padrão
    }

    const currentSet = new Set(adminData.admins);
    for (const admin of envAdmins) {
        if (!currentSet.has(admin)) {
            currentSet.add(admin);
            fileChanged = true;
        }
    }

    if (fileChanged) {
        adminData.admins = Array.from(currentSet);
        adminData.lastUpdate = new Date().toISOString();
        await fs.writeFile(targetPath, JSON.stringify(adminData, null, 2), 'utf8');
        console.log('🛠️ admins.json sincronizado com AUTHORIZED_IDS.');
    }
}

export async function ensureCoreConfigFiles() {
    for (const config of CORE_CONFIGS) {
        const targetPath = path.join(__dirname, '..', config.target);
        const examplePath = config.example ? path.join(__dirname, '..', config.example) : null;
        const exists = await fileExists(targetPath);

        if (!exists) {
            try {
                if (examplePath && await fileExists(examplePath)) {
                    await copyExample(examplePath, targetPath);
                    console.log(`📄 ${config.target} criado a partir de ${config.example}.`);
                } else {
                    await createFromInitial(config.initialData, targetPath);
                    console.log(`📄 ${config.target} criado com dados padrão.`);
                }
            } catch (error) {
                console.error(`❌ Falha ao criar ${config.target}:`, error);
            }
        }

        if (config.target === 'admins.json') {
            await ensureAdminsSeed(targetPath);
        }
    }
}

