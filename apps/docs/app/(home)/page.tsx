import { FeaturesSection } from '@/app/(home)/_components/FeaturesSection'
import { HeroSection } from '@/app/(home)/_components/HeroSection'
import { Separator } from '@workspace/ui/components/Separator'
import { FooterSection } from '@/app/(home)/_components/FooterSection'

export default function Home() {
    return (
        <>
            <HeroSection />
            <Separator />
            <FeaturesSection />
            <Separator />
            <FooterSection />
        </>
    )
}
