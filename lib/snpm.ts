import pkg from '../package.json';
import run from '@/commands/run';
import fs from 'fs';

export default class snpm {
    public static get version() {
        return pkg.version;
    }

    public static validateDirectory() {
        const path = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local');
        const dir = `${path}/snpm`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    public static handleCommand() {
        const args = process.argv.slice(2);
        const command = args[0];

        try {
            const Command = require(`./commands/${command}`).default;
            Command.execute(args.splice(1));
        } catch (e) {
            if(command) {
                run.execute(args);
                return;
            }

            console.error(`Command ${command} not found`);
        }
    }

    public static mapArgs(): Map<string, string> {
        const args = process.argv.slice(2)
        const optionsMap: Map<string, string> = new Map()

        args.forEach((arg, index) => {
            if (arg.startsWith('-')) {
                const option = arg.replace(/-/g, '')
                optionsMap.set(option, args[index + 1])
            }
        })

        return optionsMap   
    }
}