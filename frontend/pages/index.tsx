import { Meta } from '@/components/Layout/Meta';
import Hero from '@/components/Hero/Hero';
import { AppConfig } from '@/components/utils/AppConfig';
import Footer from '@/components/Layout/Footer';

export default function Home() {
    return (
        <>
            <Meta title={AppConfig.title} description={AppConfig.description} />
            {/* Hero */}
            <Hero
                heading="Discover the best restaurant near you."
                message="Search here"
            />
            {/* Category */}
            {/* Footer */}
            <Footer />
        </>
    );
}
