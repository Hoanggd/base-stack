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

        // ============================================================================
        // STAGE 1: COLLECT USER INPUT & CLI OPTIONS
        // ============================================================================
        // Gather application name and stack selection either from CLI arguments or
        // interactive prompts. This stage ensures we have all required information
        // before proceeding with application creation.
        if (!cliResult.stack) {
            cliResult.stack = await select({
                message: 'Which stack would you like to use for this app?',
                choices: STACK_CHOICES.map(stack => ({
                    name: stack.name,
                    value: stack.id,
                    description: stack.description,
                })),
            })
        }

        if (!cliResult.directory) {
            cliResult.directory = await input({
                message: 'What is the name of the application?',
                default: cliResult.stack,
                validate: (input) => {
                    if (fs.existsSync(path.join(process.cwd(), 'apps', input))) {
                        return 'Application directory already exists. Please choose a different name or remove the existing directory.'
                    }
                    return true
                },
            })
        }

        // ============================================================================
        // STAGE 2: VALIDATE INPUTS & CHECK PREREQUISITES
        // ============================================================================
        // Verify that the provided stack is valid and check if the target directory
        // already exists. This prevents errors during the template copying phase.

        // Verify that the current directory is the project root by looking for pnpm-workspace.yaml
        if (!fs.existsSync(path.join(process.cwd(), 'pnpm-workspace.yaml'))) {
            showError(
                'You are not in the root directory of the project. Please run this command from the root directory.',
            )
        }

        if (!STACK_CHOICES.some(stack => stack.id === cliResult.stack)) {
            showError(
                `Invalid stack "${cliResult.stack}". Allowed values are: ${STACK_CHOICES.map(stack => stack.id).join(', ')}`,
            )
        }

        const targetPath = path.join(process.cwd(), cliResult.directory)
        if (fs.existsSync(targetPath)) {
            showError('Directory already exists. Please choose a different name or remove the existing directory.')
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
        console.log('Install dependencies:' , chalk.cyan('pnpm install'))
        console.log('Start development:' , chalk.cyan('pnpm dev'))
        console.log('')
        console.log('That\'s it!')
    })
