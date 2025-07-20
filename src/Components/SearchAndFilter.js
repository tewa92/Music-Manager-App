import React, { useState } from 'react'
import styled from "@emotion/styled";
import { Plus, ChevronDown, Search } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import SongForm from "./SongForm";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addSong, setSearchTerm, setGenreFilter } from '../features/songs/songsSlice';






// Search container with input and filter
const SearchContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
gap: 1rem;
margin-bottom: 1.5rem;

@media (max-width: 640px){
flex-direction: row;
}
`;

const InputWrapper = styled.div`
flex: 1;
position: relative;
`;

const SearchIcon = styled(Search)`
position: absolute;
right: 6rem;
top: 50%;
transform: translateY(-50%);
color: #6b7280;
`;

const StyledInput = styled.input`
width: 90%;
padding-left: 2.5rem;
padding: 0.5rem 0.75rem;
border: 1px solid #ddd;
border-radius: 4px;

&:focus {
outline: none;
border-color: #3f51b5;}
`;

const SelectTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
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

const TriggerButton = styled.button`
  width: 10%;
  display: inline-flex;
  align-items: center;
  background: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: #303f9f;
  }
`;

const Overlay = styled(Dialog.Overlay)`
position: fixed;
inset: 0;
background: rgba(0, 0, 0, 0.5);
`;

const Content = styled(Dialog.Content)`
  background: #fff;
  border-radius: 8px;
  max-width: 28rem;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Title = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled(Dialog.Description)`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #555;
`;


function SearchAndFilter() {
    const dispatch = useDispatch();

    const searchTerm = useSelector(state => state.songs.searchTerm);
    const genreFilter = useSelector(state => state.songs.genreFilter);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const genresList = ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "Country", "Electronic", "Reggae", "Blues", "Folk"];


    const handleAddSong = (songData) => {
        dispatch(addSong(songData));
        setIsAddDialogOpen(false);
    }

     


    return (
        <SearchContainer>
            <InputWrapper>
                <SearchIcon />
                <StyledInput
                    placeholder="Search songs, artists, or albums..."
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                />
            </InputWrapper>


            <div style={{ position: "relative" }}>
                <Select.Root value={genreFilter} onValueChange={(value) => dispatch(setGenreFilter(value))}>
                    <SelectTrigger>
                        <Select.Value placeholder="Filter by genre" />
                        <ChevronDown size={16} />
                    </SelectTrigger>

                    <SelectContent side="bottom" align="start">
                        <SelectItem value="all">All Genres</SelectItem>
                        {genresList.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                                {genre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select.Root>
            </div>


            <Dialog.Root open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <Dialog.Trigger asChild>
                    <TriggerButton>
                        <Plus />
                        Add Song
                    </TriggerButton>
                </Dialog.Trigger>

                <Overlay />
                <Content>
                    <Title>Add New Song</Title>
                    <Description>Fill in the details to add a new song to your collection.</Description>
                    <SongForm onSubmit={handleAddSong} />
                </Content>
            </Dialog.Root>
        </SearchContainer>
    )
}



export default SearchAndFilter