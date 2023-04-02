import React from 'react';
import { useRouter } from 'next/router';

function Search() {
    const router = useRouter();
    const searchquery = router.query.search;

    return <div>{searchquery}</div>;
}

export default Search;
