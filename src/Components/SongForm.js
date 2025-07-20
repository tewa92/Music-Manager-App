/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";


const Form = styled.form`
  top: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const SubmitButton = styled.button`
  background: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #303f9f;
  }
`;

// useEffect(() => {
//   // Reset form fields when the component mounts
//   setId("");
//   setTitle("");
//   setArtist("");
//   setAlbum("");
//   setGenre("");
//   setDuration("");
//   setReleaseYear("");
// }, []);



function SongForm({ song, onSubmit }) {
  const [id, setId] = useState(song?.id || "");
  const [title, setTitle] = useState(song?.title || "");
  const [artist, setArtist] = useState(song?.artist || "");
  const [album, setAlbum] = useState(song?.album || "");
  const [genre, setGenre] = useState(song?.genre || "");
  const [duration, setDuration] = useState(song?.duration || "");
  const [releaseYear, setReleaseYear] = useState(song?.releaseYear || "");

  useEffect(() =>{
    if(song){
      setId(song._id);
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setGenre(song.genre);
      setDuration(song.duration);
      setReleaseYear(song.releaseYear);
    } else {
      setId("");
      setTitle("");
      setArtist("");
      setAlbum("");
      setGenre("");
      setDuration("");
      setReleaseYear("");
    }
  }, [song]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!title || !artist || !album || !genre || !duration || !releaseYear) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new song object
    const newSong = {
      id: id || undefined,
      title,
      artist,
      album,
      genre,
      duration,
      releaseYear,
    };
    
    // Call the onSubmit function with the new song data
    onSubmit(newSong);

    // Reset the form fields
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
    setDuration("");
    setReleaseYear("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Song ID "
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <Input
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      />
      <Input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <Input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <Input
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
      />
      <SubmitButton type="submit">Save Song</SubmitButton>
    </Form>
  );
}

export default SongForm;