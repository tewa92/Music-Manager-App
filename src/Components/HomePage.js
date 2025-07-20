/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from 'react';
import * as Select from "@radix-ui/react-select";

import Header from "./Header";
import SearchAndFilter from "./SearchAndFilter";
import Stats from "./Stats";
import SongsList from "./SongsList";

// Container for the entire page
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;


function HomePage() {
 
    return (
        <Container>
            <Header />

            {/* Search and Filter */}
            <SearchAndFilter
            />

            {/* Stats Grid */}
            <Stats />

            {/* Songs Table */}
            <SongsList/>

        </Container>
    );
}

export default HomePage;