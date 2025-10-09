export function MdxImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="px-5">
            <img src={src} alt={alt} className="dark:invert dark:hue-rotate-180 rounded-xl border border-neutral-300 overflow-hidden" />
        </div>
    )
}
