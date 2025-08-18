import { codeToHtml } from 'shiki'

export const highlightCode = (code: string, opts?: Partial<Parameters<typeof codeToHtml>[1]>) => {
  return codeToHtml(code, {
    lang: 'tsx',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    colorReplacements: {
      '#fff': '#FAFAFA',
      '#24292e': '#212121',
    },
    ...opts,
  })
}
