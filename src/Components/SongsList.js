import React, { useMemo, useState } from 'react'
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Edit, Trash2, ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";


import Pagination from "./Pagination";
import { updateSong, deleteSong } from '../features/songs/songsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { fetchSongs } from '../features/songs/songsSlice';
// import { Dialog } from '@radix-ui/react-dialog';
import SongForm from './SongForm';



// Songs Collection

const CardSong = styled.div`
background: #fff;
border: 1px solid #ddd;
border-radius: 8px;
overflow: hidden;
margin-bottom:: 2rem;
`;

const CardSongHeader = styled.div`
padding: 1rem;
border-bottom: 1px solid #eee;
`;

const CardSongTitle = styled.h2`
font-size: 1.25rem;
margin: 0;
`;

const CardSongDescription = styled.p`
font-size: 0.875rem;
color: #666;
`;

const CardSongContent = styled.div`
padding: 1.5rem;
`;

const CardSongTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CardSongTableHead = styled.th`
text-align: left;
padding: 0.75rem;
border-bottom: 1px solid #ddd;
font-size: 0.875rem;
font-weight: 600;
`;

const CardSongTableRow = styled.tr`
    &:nth-of-type(even) {
        background: #f9f9f9;
    }
`;

const CardSongTableCell = styled.td`
padding: 0.75rem;
border-bottom: 1px solid #eee;
font-size: 0.875rem;
`;

const Badge = styled.span`
display: inline-block;
background: #eee;
color: #3f51b5;
border-radius: 4px;
padding: 0.25rem 0.25rem;
font-size: 0.75rem;
`;

const Button = styled.button`
background: none;
border: none;
cursor: pointer;
color: #3f51b5;
display: inline-flex;
align-items: center;
justify-content: center;

&:hover {
opacity: 0.8;
}
`;

const IconButton = styled(Button)`
width: 2rem;
height: 2rem;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const PaginationBar = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 1rem;
`;

// Left side text
const PaginationText = styled.span`
font-size: 0.875rem;
color: #6b7280;
`;

// Controls row
const ControlsRow = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`;

// Rows per page section
const RowsPerPage = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;

span {
font-size: 0.875rem;
}
`;

const SelectTrigger = styled(Select.Trigger)`
display: inline-flex;
align-items: center;
justify-content: space-between;
width: 5rem;
padding: 0.5rem 0.75rem;
border: 1px solid #ddd;
border-radius: 4px;
cursor: pointer;

&:hover {
border-color: #3f51b5;
}
`;

const SelectContent = styled(Select.Content)`
background: white;
border: 1px solid #ddd;
border-radius: 4px;
margin-top: 0.25rem;
padding: 0.5rem 0;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SelectItem = styled(Select.Item)`
padding: 0.5rem 1rem;
cursor: pointer;

&[data-highlighted] {
    background: #3f51b5;
    color: white;
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


function SongsList() {
    const dispatch = useDispatch();

    const songs = useSelector(state => state.songs.list);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const searchTerm = useSelector(state => state.songs.searchTerm);
    const genreFilter = useSelector(state => state.songs.genreFilter);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingSong, setEditingSong] = useState(null);




    const handleEdit = (song) => {
        setEditingSong(song);
        setIsEditDialogOpen(true);
    };

    const handleSaveEdit = (updatedSong) => {
        dispatch(updateSong(updatedSong));
        setIsEditDialogOpen(false);
        setEditingSong(null);
    }

    const handleDeleteSong = (_id) => {
        dispatch(deleteSong(_id));
    };

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


    const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSongs = filteredSongs.slice(startIndex, startIndex + itemsPerPage);

    const genres = useMemo(() => {
        const uniqueGenres = Array.from(new Set(songs.map((song) => song.genre)));
        return uniqueGenres.sort();
    }, [songs]);


    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    return (
        <CardSong>
            <CardSongHeader>
                <CardSongTitle>Songs Collection</CardSongTitle>
                <CardSongDescription>
                    Manage your music library with full CRUD operations
                </CardSongDescription>
            </CardSongHeader>

            <CardSongContent>
                <div>
                    <CardSongTable>
                        <thead>
                            <CardSongTableRow>
                                <CardSongTableHead>Title</CardSongTableHead>
                                <CardSongTableHead>Artist</CardSongTableHead>
                                <CardSongTableHead>Album</CardSongTableHead>
                                <CardSongTableHead>Genre</CardSongTableHead>
                                <CardSongTableHead>Duration</CardSongTableHead>
                                <CardSongTableHead>Release Year</CardSongTableHead>
                                <CardSongTableHead style={{ textAlign: "right" }}>Actions</CardSongTableHead>
                            </CardSongTableRow>
                        </thead>
                        <tbody>
                            {paginatedSongs.length === 0 ? (
                                <CardSongTableRow>
                                    <CardSongTableCell colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>
                                        No songs found for the current filters.
                                    </CardSongTableCell>
                                </CardSongTableRow>
                            ) : (
                                paginatedSongs.map((song) => (
                                    <CardSongTableRow key={song._id}>
                                        <CardSongTableCell>
                                            {song.title}
                                        </CardSongTableCell>
                                        <CardSongTableCell>
                                            {song.artist}
                                        </CardSongTableCell>
                                        <CardSongTableCell>
                                            {song.album}
                                        </CardSongTableCell>
                                        <CardSongTableCell>
                                            <Badge>
                                                {song.genre}
                                            </Badge>
                                        </CardSongTableCell>
                                        <CardSongTableCell>
                                            {song.duration}
                                        </CardSongTableCell>
                                        <CardSongTableCell>
                                            {song.releaseYear}
                                        </CardSongTableCell>
                                        <CardSongTableCell>
                                            <FlexEnd>
                                                <IconButton onClick={() => handleEdit(song)}>
                                                    <Edit size={16} />
                                                </IconButton>

                                                <AlertDialog.Root>
                                                    <AlertDialog.Trigger asChild>
                                                        <IconButton>
                                                            <Trash2 size={16} />
                                                        </IconButton>
                                                    </AlertDialog.Trigger>
                                                    <AlertDialog.Portal>
                                                        <AlertDialog.Overlay
                                                            style={{
                                                                position: "fixed",
                                                                inset: 0,
                                                                background: "rgba(0, 0, 0, 0.5)",
                                                            }}
                                                        />
                                                        <AlertDialog.Content
                                                            style={{
                                                                position: "fixed",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                background: "#fff",
                                                                borderRadius: "8px",
                                                                padding: "2rem",
                                                                maxWidth: "28rem",
                                                                width: "90%",
                                                                maxHeight: "90vh",
                                                                overflowY: "auto",
                                                                zIndex: 1000,
                                                            }}
                                                        >
                                                            <AlertDialog.Title>
                                                                Delete Song
                                                            </AlertDialog.Title>
                                                            <AlertDialog.Description>
                                                                Are you sure you want to delete "{song.title}" by {song.artist}? This action cannot be undone.
                                                            </AlertDialog.Description>
                                                            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                                                                <AlertDialog.Cancel asChild>
                                                                    <Button>
                                                                        Cancel
                                                                    </Button>

                                                                </AlertDialog.Cancel>
                                                                <AlertDialog.Action asChild>
                                                                    <Button onClick={() => handleDeleteSong(song._id)}>
                                                                        Delete
                                                                    </Button>
                                                                </AlertDialog.Action>

                                                            </div>
                                                        </AlertDialog.Content>
                                                    </AlertDialog.Portal>


                                                </AlertDialog.Root>
                                            </FlexEnd>
                                        </CardSongTableCell>

                                    </CardSongTableRow>
                                ))
                            )}
                        </tbody>
                    </CardSongTable>
                </div>


                {filteredSongs.length > 0 && (
                    <PaginationBar>
                        <div>
                            <PaginationText>
                                showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSongs.length)} of {""} {filteredSongs.length} songs
                            </PaginationText>
                        </div>

                        <ControlsRow>
                            <RowsPerPage>
                                <span>Rows per page:</span>

                                <Select.Root
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) => {
                                        setItemsPerPage(Number(value));
                                        setCurrentPage(1);
                                    }}
                                >

                                    <SelectTrigger>
                                        <Select.Value />
                                        <ChevronDown size={16} />
                                    </SelectTrigger>

                                    <SelectContent side="bottom" align="start">
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select.Root>
                            </RowsPerPage>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </ControlsRow>

                    </PaginationBar>
                )}
            </CardSongContent>

            <Dialog.Root open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                {/* <Dialog.Trigger>Edit</Dialog.Trigger> */}
                <Dialog.Portal>
                    <Dialog.Overlay style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.5)",
                    }} />
                    <Dialog.Content
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#fff",
                            borderRadius: "8px",
                            padding: "2rem",
                            maxWidth: "400px",
                            width: "90%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            zIndex: 1000,
                        }}>
                        <Dialog.Title>Edit Song</Dialog.Title>
                        <SongForm song={editingSong} onSubmit={handleSaveEdit} />
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Root>

        </CardSong>
    )
}

export default SongsList