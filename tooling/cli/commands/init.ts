import { confirm, input, select } from '@inquirer/prompts'
import { Command } from 'commander'
import * as fs from 'fs'
import path from 'path'
import { PROJECT_NAME, STACKS } from '../consts'
import { showError } from '../utils/error-handling'

interface InitCliResult {
    docs: boolean
    stack: (typeof STACKS)[number]
}

export const init = new Command()
    .name('init')
    .description('Create a new Base Stack project')
    .argument('[dir]', 'The name of the project, as well as the name of the directory to create')
    .option('-d, --docs', 'include docs')
    .option('-s, --stack <stack>', 'specify the stack to use ("next" or "vite")')
    .action(async (projectDirectory, options: InitCliResult) => {
        if (!projectDirectory) {
            projectDirectory = await input({
                message: 'What is the name of the project?',
                default: PROJECT_NAME,
                validate: value => {
                    // Check if directory already exists
                    const targetPath = path.join(process.cwd(), value)
                    if (fs.existsSync(targetPath)) {
                        return 'Directory already exists. Please choose a different name or remove the existing directory.'
                    }

                    return true
                },
            })
        }

        if (!options.stack) {
            options.stack = await select({
                message: 'What is the stack to use?',
                choices: STACKS,
            })
        }

        if (!options.docs) {
            options.docs = await confirm({
                message: 'Do you want to include docs? (you can change this later)',
                default: true,
            })
        }

        if (!STACKS.includes(options.stack)) {
            showError(`Invalid stack "${options.stack}". Allowed values are: ${STACKS.join(', ')}`)
        }

        // copy template
        fs.cpSync(path.join(__dirname, '..', 'templates', 'base'), path.join(process.cwd(), projectDirectory), {
            recursive: true,
        })
    })
