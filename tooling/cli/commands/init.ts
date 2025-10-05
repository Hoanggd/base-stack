import { input, select } from '@inquirer/prompts'
import chalk from 'chalk'
import { Command } from 'commander'
import * as fs from 'fs'
import path from 'path'
import { PROJECT_NAME, STACK_CHOICES, Stack } from '../consts'
import { showError } from '../utils/error-handling'

interface InitCliResult {
    docs: boolean
    stack: Stack
    projectDirectory: string
    appDirectory: string
}

export const init = new Command()
    .name('init')
    .description('Create a new Base Stack project')
    .argument('[projectDirectory]', 'The name of the project, as well as the name of the directory to create')
    .argument('[firstAppDirectory]', 'The name of the first application')
    .option('-s, --stack <stack>', `specify the stack to use (${STACK_CHOICES.map(stack => stack.id).join(', ')}) `)
    .action(async (projectDirectory, appDirectory, options) => {
        const cliResult: InitCliResult = {
            ...options,
            projectDirectory,
            appDirectory,
        }

        const projectNameEmptyError = !cliResult.projectDirectory
        const projectNameAlreadyExistsError = cliResult.projectDirectory
            ? fs.existsSync(path.join(process.cwd(), cliResult.projectDirectory))
            : false
        const stackEmptyError = !cliResult.stack
        const stackInvalidError = cliResult.stack ? !STACK_CHOICES.some(stack => stack.id === cliResult.stack) : false
        const appDirectoryEmptyError = !cliResult.appDirectory
        const appDirectoryInvalidError = cliResult.appDirectory ? cliResult.appDirectory === 'docs' : false

        // ============================================================================
        // STAGE 1: VALIDATE INPUTS
        // ============================================================================
        // Verify that the provided stack is valid and check if the target directory
        // already exists. This prevents errors during the template copying phase.

        if (projectNameAlreadyExistsError) {
            showError(
                `Project directory "${cliResult.projectDirectory}" already exists. Please choose a different name.`,
            )
        }

        if (stackInvalidError) {
            showError(
                `Invalid stack "${cliResult.stack}". Allowed values are: ${STACK_CHOICES.map(stack => stack.id).join(', ')}`,
            )
        }

        if (appDirectoryInvalidError) {
            showError(
                `The app folder name "docs" is reserved for the documentation site. Please choose a different name.`,
            )
        }

        // ============================================================================
        // STAGE 2: COLLECT MISSING USER INPUT USING PROMPTS
        // ============================================================================
        // At this stage, we collect any missing information (project name, stack, app name)
        // that was not provided via CLI arguments or options, prompting the user as needed.

        if (projectNameEmptyError) {
            cliResult.projectDirectory = await input({
                message: 'Enter a name for your project:',
                default: PROJECT_NAME,
                validate: input => {
                    if (fs.existsSync(path.join(process.cwd(), input))) {
                        return `Project directory "${input}" already exists. Please choose a different name or remove the existing directory.`
                    }
                    return true
                },
            })
        }

        if (appDirectoryEmptyError) {
            cliResult.appDirectory = await input({
                message: 'Enter a name for your first application:',
                default: 'web',
                validate: input => {
                    if (input === 'docs') {
                        return 'The app folder name "docs" is reserved for the documentation site. Please choose a different name.'
                    }
                    return true
                },
            })
        }

        if (stackEmptyError) {
            cliResult.stack = await select({
                message: 'Select the framework for your first application:',
                choices: STACK_CHOICES.map(stack => ({
                    name: stack.name,
                    value: stack.id,
                    description: stack.description,
                })),
            })
        }

        // ============================================================================
        // STAGE 3: CREATE PROJECT FROM TEMPLATES
        // ============================================================================
        // Copy the base template and selected stack-specific templates to create
        // the new project structure. This is the final step that generates the
        // complete project files.

        // Copy base template (common project structure)
        fs.cpSync(
            path.join(__dirname, '..', 'templates', 'base'),
            path.join(process.cwd(), cliResult.projectDirectory),
            {
                recursive: true,
            },
        )

        // Copy documentation template
        fs.cpSync(
            path.join(__dirname, '..', 'templates', 'extras', 'apps', 'docs'),
            path.join(process.cwd(), cliResult.projectDirectory, 'apps', 'docs'),
            {
                recursive: true,
            },
        )

        // Copy stack-specific app template
        fs.cpSync(
            path.join(__dirname, '..', 'templates', 'extras', 'apps', cliResult.stack),
            path.join(process.cwd(), cliResult.projectDirectory, 'apps', cliResult.appDirectory),
            {
                recursive: true,
            },
        )

        // Change the "name" field in package.json so it matches the application's directory name
        const packageJsonPath = path.join(
            process.cwd(),
            cliResult.projectDirectory,
            'apps',
            cliResult.appDirectory,
            'package.json',
        )
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
        packageJson.name = cliResult.appDirectory
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

        // Show a success message
        console.log(chalk.green.bold('\n🎉 Project created successfully!'))
        console.log('Enter your project directory using:', chalk.cyan(`cd ./${cliResult.projectDirectory}`))
        console.log('')
        console.log('Install dependencies:', chalk.cyan('pnpm install'))
        console.log('Start development:', chalk.cyan('pnpm dev'))
        console.log('')
        console.log('Happy hacking!')
        console.log('')
    })
