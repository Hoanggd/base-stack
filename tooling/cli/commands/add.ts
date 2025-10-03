import { Command } from 'commander'
import { Stack, STACK_CHOICES } from '../consts'
import { input, select } from '@inquirer/prompts'

interface AddCliResult {
    name: string
    stack: Stack
}

export const add = new Command()
    .name('add')
    .description('Add a new application to the project')
    .argument('[dir]', 'The name of the application')
    .option('-s, --stack <stack>', 'specify the stack to use ("next" or "vite")')
    .action(async (name, options: AddCliResult) => {
        if (!options.name) {
            options.name = await input({
                message: 'What is the name of the application?',
                default: 'my-app',
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

        console.log(options)
    })
