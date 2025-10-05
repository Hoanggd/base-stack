import chalk from 'chalk'

interface ShowErrorOptions {
    exit?: boolean
    code?: number
    hint?: string
}

export function showError(message: string, options: ShowErrorOptions = {}) {
    const { exit = true, code = 1, hint } = options

    console.error(chalk.red('✗ Error:'), message)

    if (hint) {
        console.error(chalk.dim(`  Hint: ${hint}`))
    }

    if (exit) {
        process.exit(code)
    }
}
