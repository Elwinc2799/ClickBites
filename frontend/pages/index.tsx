import { Meta } from '@/components/Layout/Meta';
import Hero from '@/components/Hero/Hero';
import { AppConfig } from '@/components/utils/AppConfig';
import Footer from '@/components/Layout/Footer';
import Category from '@/components/Category/Category';
import NavBar from '@/components/NavigationBar/NavBar';

export default function Home() {
    return (
        <>
            <Meta title={AppConfig.title} description={AppConfig.description} />
            <NavBar isLanding={true} />
            {/* Hero */}
            <Hero
                heading="Discover the best restaurant near you."
                message="Search here"
            />
            {/* Category */}
            <Category />
            {/* Footer */}
            <Footer />
        </>
    );
}

// export const getStaticProps: GetStaticProps = async () => {
//     fetch using axios
//     const res = await axios.get(process.env.API_URL + '/api/session', {
//         headers: {
//             Authorization: `Bearer ${getCookie('token')}`,
//         },
//         withCredentials: true,
//     });
//     console.log(res.data.session);

//     return {
//         props: {
//             status: status,
//         },
//     };
// };
