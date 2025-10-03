import fs from 'fs'
import path from 'path'

// Exclude these files/folders
const excludes = [
    'node_modules',
    '.next',
    '.git',
    'dist',
    'build',
    '.turbo',
    '.cache',
    'coverage',
    '.env.local',
    '.DS_Store',
]

const filter = (src: string) => {
    const basename = path.basename(src)
    return !excludes.includes(basename)
}

const baseDir = path.join(__dirname, '..', 'tooling', 'cli', 'templates', 'base')
const extrasDir = path.join(__dirname, '..', 'tooling', 'cli', 'templates', 'extras')

// clean templates folder
fs.rmSync(path.join(__dirname, '..', 'tooling', 'cli', 'templates'), { recursive: true, force: true })

// copy packages to tooling/cli/templates/base
const packagesSource = path.join(__dirname, '..', 'packages')
fs.cpSync(packagesSource, path.join(baseDir, 'packages'), {
    recursive: true,
    force: true,
    filter,
})

// copy apps to tooling/cli/templates/extras
const appsSource = path.join(__dirname, '..', 'apps')
fs.cpSync(appsSource, path.join(extrasDir, 'apps'), {
    recursive: true,
    force: true,
    filter,
})

// copy other files to tooling/cli/templates/base
const files = ['.gitignore', '.prettierrc', 'package.json', 'README.md', 'tsconfig.json', 'turbo.json']
files.forEach(file => {
    fs.cpSync(path.join(__dirname, '..', file), path.join(baseDir, file), {
        force: true,
    })
})
