import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export const readExampleFile = async (name: string, ext = 'tsx') => {
  const filePath = resolve(`examples`, `${name}.${ext}`)

  let fileContent = await readFile(filePath, 'utf-8')

  return fileContent
}
