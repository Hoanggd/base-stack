import { input, select } from '@inquirer/prompts'
import { Command } from 'commander'
import { Stack, STACK_CHOICES } from '../consts'
import * as fs from 'fs'
import path from 'path'
import { showError } from '../utils/error-handling'
import chalk from 'chalk'

interface AddCliResult {
    stack: Stack
    directory: string
}

export const add = new Command()
    .name('add')
    .description('Add a new application to the project')
    .argument('[dir]', 'The name of the application')
    .option('-s, --stack <stack>', `specify the stack to use (${STACK_CHOICES.map(stack => stack.id).join(', ')}) `)
    .action(async (directory, options) => {
        const cliResult: AddCliResult = {
            ...options,
            directory,
        }

        const notInProjectRootError = fs.existsSync(path.join(process.cwd(), 'pnpm-workspace.yaml'))
        const directoryEmptyError = !cliResult.directory
        const directoryAlreadyExistsError = cliResult.directory
            ? fs.existsSync(path.join(process.cwd(), 'apps', cliResult.directory))
            : false
        const stackEmptyError = !cliResult.stack
        const stackInvalidError = cliResult.stack ? !STACK_CHOICES.some(stack => stack.id === cliResult.stack) : false

        // ============================================================================
        // STAGE 1: VALIDATE INPUTS
        // ============================================================================
        // Verify that the provided stack is valid and check if the target directory
        // already exists. This prevents errors during the template copying phase.

        if (!notInProjectRootError) {
            showError(
                'You are not in the root directory of the project. Please run this command from the root directory.',
            )
        }

        if (directoryAlreadyExistsError) {
            showError(
                `Application directory "${cliResult.directory}" already exists. Please choose a different name or remove the existing directory.`,
            )
        }

        if (stackInvalidError) {
            showError(
                `Invalid stack "${cliResult.stack}". Allowed values are: ${STACK_CHOICES.map(stack => stack.id).join(', ')}`,
            )
        }

        // ============================================================================
        // STAGE 2: COLLECT MISSING USER INPUT USING PROMPTS
        // ============================================================================
        // At this stage, we collect any missing information (stack, app name)
        // that was not provided via CLI arguments or options, prompting the user as needed.

        if (directoryEmptyError) {
            cliResult.directory = await input({
                message: 'Enter a name for your application:',
                default: 'admin',
                validate: input => {
                    if (fs.existsSync(path.join(process.cwd(), 'apps', input))) {
                        return 'Application directory already exists. Please choose a different name or remove the existing directory.'
                    }
                    return true
                },
            })
        }

        if (stackEmptyError) {
            cliResult.stack = await select({
                message: 'Select the framework for your application:',
                choices: STACK_CHOICES.map(stack => ({
                    name: stack.name,
                    value: stack.id,
                    description: stack.description,
                })),
            })
        }

        // ============================================================================
        // STAGE 3: ADD APP TO PROJECT
        // ============================================================================
        // Add the new application to the project's pnpm-workspace.yaml file
        // and install the dependencies.

        // Copy the stack-specific app template to apps
        fs.cpSync(
            path.join(__dirname, '..', 'templates', 'extras', 'apps', cliResult.stack),
            path.join(process.cwd(), 'apps', cliResult.directory),
            {
                recursive: true,
            },
        )

        // Change the "name" field in package.json so it matches the application's directory name
        const packageJsonPath = path.join(process.cwd(), 'apps', cliResult.directory, 'package.json')
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
        packageJson.name = cliResult.directory
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

        // Show a success message
        console.log(chalk.green.bold('\n🎉 Application created successfully!'))
        console.log('')
        console.log('Install dependencies:', chalk.cyan('pnpm install'))
        console.log('Start development:', chalk.cyan('pnpm dev'))
        console.log('')
        console.log("That's it!")
        console.log('')

    })
