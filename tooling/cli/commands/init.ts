import { confirm, input, select } from '@inquirer/prompts'
import { Command } from 'commander'
import * as fs from 'fs'
import path from 'path'
import { PROJECT_NAME, STACK_CHOICES, Stack } from '../consts'
import { showError } from '../utils/error-handling'
import chalk from 'chalk'

interface InitCliResult {
    docs: boolean
    stack: Stack
    projectDirectory: string
    appDirectory: string
}

export const init = new Command()
    .name('init')
    .description('Create a new Base Stack project')
    .argument('[dir]', 'The name of the project, as well as the name of the directory to create')
    .argument('[app]', 'The name of the application')
    .option('-s, --stack <stack>', `specify the stack to use (${STACK_CHOICES.map(stack => stack.id).join(', ')}) `)
    .action(async (projectDirectory, appDirectory, options) => {
        const cliResult: InitCliResult = {
            ...options,
            projectDirectory,
            appDirectory,
        }

        // ============================================================================
        // STAGE 1: COLLECT USER INPUT & CLI OPTIONS
        // ============================================================================
        // Gather project name and stack selection either from CLI arguments or
        // interactive prompts. This stage ensures we have all required information
        // before proceeding with project creation.

        if (!cliResult.projectDirectory) {
            cliResult.projectDirectory = await input({
                message: 'What is the name of the project?',
                default: PROJECT_NAME,
                validate: input => {
                    if (fs.existsSync(path.join(process.cwd(), input))) {
                        return 'Project directory already exists. Please choose a different name or remove the existing directory.'
                    }
                    return true
                },
            })
        }

        if (!cliResult.stack) {
            cliResult.stack = await select({
                message: 'Which stack would you like to use for your first application?',
                choices: STACK_CHOICES.map(stack => ({
                    name: stack.name,
                    value: stack.id,
                    description: stack.description,
                })),
            })
        }

        if (!cliResult.appDirectory) {
            cliResult.appDirectory = await input({
                message: 'What is the name of the first application?',
                default: cliResult.stack,
                validate: input => {
                    if (fs.existsSync(path.join(process.cwd(), cliResult.projectDirectory, 'apps', input))) {
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

        if (!STACK_CHOICES.some(stack => stack.id === cliResult.stack)) {
            showError(
                `Invalid stack "${cliResult.stack}". Allowed values are: ${STACK_CHOICES.map(stack => stack.id).join(', ')}`,
            )
        }

        const targetPath = path.join(process.cwd(), cliResult.projectDirectory)
        if (fs.existsSync(targetPath)) {
            showError(
                'Project directory already exists. Please choose a different name or remove the existing directory.',
            )
        }

        const appTargetPath = path.join(process.cwd(), cliResult.projectDirectory, 'apps', cliResult.appDirectory)
        if (fs.existsSync(appTargetPath)) {
            showError(
                'Application directory already exists. Please choose a different name or remove the existing directory.',
            )
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
    })
