#! /usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init'
import { add } from './commands/add'
import { CLI_NAME } from './consts'
import packageJson from './package.json'

export async function main() {
    const program = new Command()
        .name(CLI_NAME)
        .version(packageJson.version)
        .description('CLI to create a new Base Stack application')

    program.addCommand(init)
    program.addCommand(add)

    program.parse()
}

main()
