'use client'

import { Button } from '@workspace/ui/components/Button'
import { cn } from '@workspace/ui/lib/utils'
import { useMachine } from '@xstate/react'
import { Check, Copy } from 'lucide-react'
import { fromPromise, setup } from 'xstate'

export const machine = setup({
    types: {
        events: {} as { type: 'copy' },
        input: {} as { text: string },
        context: {} as { text: string },
    },
    actors: {
        copy: fromPromise(async ({ input }: { input: { text: string } }) => {
            await navigator.clipboard.writeText(input.text)
        }),
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QFUB2AXAlugNpAdAJKraYCGOAxAMYD2ADgJ4DaADALqKj22ym2ouIAB6IAjABZW+AMwAmVjNYSAHAHZWANlYBWCWoA0IRojlyZ+NToC+1o2iy4CAYQaNMqKJQgCw+DwButADWfg7YeBD4rkweUAiBtNRkWAJs7OlCPHypgkgiiFLSUprm+hJicmKsAJwSRiYIZjr4cjZ2IOFOUTGYkJTCsOgpfmQAZuhgAE4AFEqsrACUlF2R0Qx9EJn52fx5oKIIFZqtmjraNWoVVbX1xogqYvjtHai0EHBCq5BZvHtChwAtJoGohgbZ7BgIgRiKQKL8cpgBADCnJQQgVCdWCoZLi8fjcRDOlDuutYp4Ef98odzCp8DidDUzHJrtU6uiFNIrETvj0Nj8dn9ciiEDoZDV8HUdHIVDVNGIxI9NHdGio6TocQStbZbEA */
    context: ({ input }) => ({ text: input.text }),
    id: 'Untitled',
    initial: 'Initial',
    states: {
        Initial: {
            on: {
                copy: {
                    target: 'Copying',
                },
            },
        },
        Copying: {
            invoke: {
                src: 'copy',
                input: ({ context }) => ({ text: context.text }),
                onDone: {
                    target: 'Copied',
                },
                onError: {
                    target: 'Initial',
                },
            },
        },
        Copied: {
            after: {
                '3000': {
                    target: 'Initial',
                },
            },
        },
    },
})

export function CopyToClipboard({ className, text = '12322' }: { className?: string; text: string }) {
    const [state, send] = useMachine(machine, {
        input: { text },
    })

    return (
        <Button
            aria-label="Copy to clipboard"
            className={cn('text-neutral-500 backdrop-blur-sm hover:bg-[#343b44]/10', className)}
            variant={'unstyled'}
            size={'icon'}
            onClick={() => send({ type: 'copy' })}
        >
            {state.matches('Copied') ? <Check className="text-green-600" /> : <Copy />}
        </Button>
    )
}
