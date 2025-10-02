#! /usr/bin/env node
import { confirm, input, select } from '@inquirer/prompts'
import { Command, InvalidArgumentError } from 'commander'
import * as fs from 'fs'
import path from 'path'
import { APP_NAME, CLI_NAME, STACKS } from './consts'
import packageJson from './package.json'

interface CliResult {
    docs: boolean
    stack: (typeof STACKS)[number]
}

export async function main() {
    let projectDirectory = ''

    const program = new Command()
        .name(CLI_NAME)
        .version(packageJson.version)
        .description('CLI to create a new Base Stack application')
        .argument('[dir]', 'The name of the application, as well as the name of the directory to create', dir => {
            projectDirectory = dir
            return dir
        })
        .option('-d, --docs', 'include docs')
        .option('-s, --stack <stack>', 'stack to use (must be "next" or "vite")')
        .parse()

    const options = program.opts<CliResult>()

    if (!projectDirectory) {
        projectDirectory = await input({
            message: 'What is the name of the application?',
            default: APP_NAME,
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
            message: 'Do you want to include docs?',
            default: true,
        })
    }

    if (!STACKS.includes(options.stack)) {
        throw new InvalidArgumentError(`Invalid stack "${options.stack}". Allowed values are: ${STACKS.join(', ')}`)
    }

    // Check if directory already exists
    const targetPath = path.join(process.cwd(), projectDirectory)
    if (fs.existsSync(targetPath)) {
        throw new Error(`Directory "${projectDirectory}" already exists in the current directory. Please choose a different name or remove the existing directory.`)
    }

    // copy template
    fs.cpSync(path.join(__dirname, '..', 'templates', 'base'), path.join(process.cwd(), projectDirectory), {
        recursive: true,
    })
}

main()
