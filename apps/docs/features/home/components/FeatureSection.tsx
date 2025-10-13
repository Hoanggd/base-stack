import { ProjectFeatures } from "@/shared/components/ProjectFeatures";

export function FeatureSection() {
    return (
        <>
            <section className="px-3">
                <div className="px-3 py-5 border-x container max-w-screen-xl mx-auto space-y-2 md:py-14 md:px-8">
                    <h2 className="text-2xl font-bold sm:text-4xl">Everything You Need</h2>
                    <p className="text-lg">Production-ready starter kit with best-in-class tools and patterns</p>
                </div>
            </section>
            <div className="px-3">
                <section className="container max-w-screen-xl mx-auto border-l">
                    <ProjectFeatures />
                </section>
            </div>
        </>
    )
}