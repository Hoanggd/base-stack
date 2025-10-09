import React from 'react'
import NProgressJs from 'nprogress'

NProgressJs.configure({
    showSpinner: false,
    trickleSpeed: 150,
    template:
        '<div class="bar bg-primary-foreground! h-[3px]!" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
})

function useNProgress({ isFetching }: { isFetching: boolean }) {
    React.useEffect(() => {
        if (isFetching) {
            NProgressJs.start()
        } else {
            NProgressJs.done()
        }
    }, [isFetching])
}

export { useNProgress }
