/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useState } from "react";

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

export default function SongForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [year, setYear] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, artist, album, year });
    };

    return (
        <Form onSubmit={handleSubmit}>
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
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <SubmitButton type="submit">Save Song</SubmitButton>
        </Form>
    );
}
