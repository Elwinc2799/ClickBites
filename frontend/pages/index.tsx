import { Meta } from '@/components/Layout/Meta';
import Hero from '@/components/Hero/Hero';
import { AppConfig } from '@/components/utils/AppConfig';
import Footer from '@/components/Layout/Footer';
import Category from '@/components/Category/Category';
import NavBar from '@/components/NavigationBar/NavBar';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';


export default function Home() {
    const [status, setStatus] = useState(false);

    useEffect (() => {
        if (hasCookie('token')) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [hasCookie('token')]);


    return (
        <>
            <Meta title={AppConfig.title} description={AppConfig.description} />
            <NavBar isLanding={true} isLoggedIn={status} />
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
