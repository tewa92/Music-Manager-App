import React, { useMemo, useState } from 'react'
import styled from "@emotion/styled";
import { useSelector } from 'react-redux';


// Container for the stats grid
const StatsGrid = styled.div`
display: grid;
gap 2rem;
margin-bottom: 1.5rem;

@media (min-width: 768px){
grid-template-columns: repeat(3, 1fr);
gap: 2rem;
}
`;

const Card = styled.div`
background: #fff;
border: 1px solid #ddd;
border-radius: 8px;
box-shadow: 0 1px 4px rgba(0,0,0,0.1);
overflow: hidden;

@media (max-width: 767px){
margin: 10px;
}

`;

const CardHeader = styled.div`
padding: 1rem;
border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h3`
font-size: 0.875rem;
font-weight: 500;
margin: 0;
`;

const CardContent = styled.div`
padding: 1rem;

div {
font-size: 1.5rem;
font-weight: bold;
}
`;


// Mock data
const initialSongs = [
    {
        id: "1",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        genre: "Rock",
        duration: "5:55",
        releaseYear: 1975,
    },
    {
        id: "2",
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        genre: "Rock",
        duration: "6:30",
        releaseYear: 1976,
    },
    {
        id: "3",
        title: "Imagine",
        artist: "John Lennon",
        album: "Imagine",
        genre: "Pop",
        duration: "3:07",
        releaseYear: 1971,
    },
    {
        id: "4",
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        genre: "Rock",
        duration: "8:02",
        releaseYear: 1971,
    },
    {
        id: "5",
        title: "Billie Jean",
        artist: "Michael Jackson",
        album: "Thriller",
        genre: "Pop",
        duration: "4:54",
        releaseYear: 1982,
    },
    {
        id: "6",
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        genre: "Rock",
        duration: "5:03",
        releaseYear: 1987,
    },
    {
        id: "7",
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Nevermind",
        genre: "Grunge",
        duration: "5:01",
        releaseYear: 1991,
    },
    {
        id: "8",
        title: "Like a Rolling Stone",
        artist: "Bob Dylan",
        album: "Highway 61 Revisited",
        genre: "Folk Rock",
        duration: "6:13",
        releaseYear: 1965,
    },
    {
        id: "9",
        title: "Purple Haze",
        artist: "Jimi Hendrix",
        album: "Are You Experienced",
        genre: "Rock",
        duration: "2:50",
        releaseYear: 1967,
    },
    {
        id: "10",
        title: "Good Vibrations",
        artist: "The Beach Boys",
        album: "Pet Sounds",
        genre: "Pop",
        duration: "3:39",
        releaseYear: 1966,
    },
    {
        id: "11",
        title: "What's Going On",
        artist: "Marvin Gaye",
        album: "What's Going On",
        genre: "Soul",
        duration: "3:53",
        releaseYear: 1971,
    },
    {
        id: "12",
        title: "Respect",
        artist: "Aretha Franklin",
        album: "I Never Loved a Man",
        genre: "Soul",
        duration: "2:28",
        releaseYear: 1967,
    },
    {
        id: "13",
        title: "Hey Jude",
        artist: "The Beatles",
        album: "Hey Jude",
        genre: "Pop",
        duration: "7:11",
        releaseYear: 1968,
    },
    {
        id: "14",
        title: "Born to Run",
        artist: "Bruce Springsteen",
        album: "Born to Run",
        genre: "Rock",
        duration: "4:31",
        releaseYear: 1975,
    },
    {
        id: "15",
        title: "Superstition",
        artist: "Stevie Wonder",
        album: "Talking Book",
        genre: "Funk",
        duration: "4:26",
        releaseYear: 1972,
    },
]


function Stats() {
    const songs = useSelector(state => state.songs.list);
    const searchTerm = useSelector(state => state.songs.searchTerm);
    const genreFilter = useSelector(state => state.songs.genreFilter);

    const filteredSongs = useMemo(() => {
        return songs.filter((song) => {
            const matchesSearch =
                song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.album.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = genreFilter === "all" || song.genre === genreFilter;
            return matchesSearch && matchesGenre;
        });
    }, [songs, searchTerm, genreFilter]);

    const uniqueGenres = useMemo(() => {
        return Array.from(new Set(songs.map(s => s.genre))).filter(Boolean);
    }, [songs]);

    return (
        <StatsGrid>
            <Card>
                <CardHeader>
                    <CardTitle>Total Songs</CardTitle>
                </CardHeader>
                <CardContent>{songs.length}</CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Filtered Results</CardTitle>
                </CardHeader>
                <CardContent>{filteredSongs.length}</CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Genres</CardTitle>
                </CardHeader>
                <CardContent>{uniqueGenres.length}</CardContent>
            </Card>
        </StatsGrid>
    );
}


export default Stats