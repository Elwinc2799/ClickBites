import React from 'react';
import { useRouter } from 'next/router';

function Results() {
    const router = useRouter();
    const search_query = router.query.search_query;

    return <div>{search_query}</div>;
}

export default Results;
