import { confirm, input, select } from '@inquirer/prompts'
import { Command } from 'commander'
import * as fs from 'fs'
import path from 'path'
import { PROJECT_NAME, STACK_CHOICES, Stack } from '../consts'
import { showError } from '../utils/error-handling'

interface InitCliResult {
    docs: boolean
    stack: Stack
}

export const init = new Command()
    .name('init')
    .description('Create a new Base Stack project')
    .argument('[dir]', 'The name of the project, as well as the name of the directory to create')
    .option('-d, --docs', 'include docs')
    .option('-s, --stack <stack>', `specify the stack to use (${STACK_CHOICES.map(stack => stack.name).join(', ')}) `)
    .action(async (projectDirectory, options: InitCliResult) => {
        // Stage 1: Get CLI options
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
                choices: STACK_CHOICES.map(stack => ({
                    name: stack.name,
                    value: stack.id,
                })),
            })
        }

        if (!options.docs) {
            options.docs = await confirm({
                message: 'Do you want to include UI docs? (you can add this later)',
                default: true,
            })
        }

        if (!STACK_CHOICES.some(stack => stack.id === options.stack)) {
            showError(
                `Invalid stack "${options.stack}". Allowed values are: ${STACK_CHOICES.map(stack => stack.name).join(', ')}`,
            )
        }

        // Stage 2: Copy template
        const currentStack = STACK_CHOICES.find(stack => stack.id === options.stack) ?? STACK_CHOICES[0]

        // Copy base template
        fs.cpSync(path.join(__dirname, '..', 'templates', 'base'), path.join(process.cwd(), projectDirectory), {
            recursive: true,
        })

        // Copy app template
        fs.cpSync(
            path.join(__dirname, '..', 'templates', 'extras', 'apps', currentStack.id),
            path.join(process.cwd(), projectDirectory, 'apps', currentStack.id),
            {
                recursive: true,
            },
        )

        // Copy docs template
        if (options.docs) {
            fs.cpSync(
                path.join(__dirname, '..', 'templates', 'extras', 'apps', 'docs'),
                path.join(process.cwd(), projectDirectory, 'apps', 'docs'),
                {
                    recursive: true,
                },
            )
        }
    })
