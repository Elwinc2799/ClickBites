import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';

// import react from 'react';

// function getData(setData) {
//     const api_url = process.env.NEXT_PUBLIC_API_URL + '/api/business';

//     fetch(api_url, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     })
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {
//             setData(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

export default function Home() {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     getData(setData);
    // }, []);

    return (
        <>
            <Layout title="Home">
                <Hero />
                {/* Create a separator */}
                <div className="h-1 bg-gray-200 rounded-sm" />
                <Categories />
            </Layout>
        </>
    );
}
