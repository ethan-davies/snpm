import { readFileSync } from 'fs'
import { join } from 'path'
import { runNpm } from '@pnpm/run-npm'

export default class Command {
    public static execute(args) {
        try {
            const workDir = process.cwd()
            const path = join(workDir, 'package.json')
            const packageJson = JSON.parse(readFileSync(path, 'utf-8'))

            const script = args[0]
            const scriptCommand = packageJson.scripts[script]

            return runNpm(scriptCommand, args.slice(2))
        } catch (err) {
            console.error(err)
        }
    }
}
