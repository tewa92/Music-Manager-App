import React from 'react';
import styled from "@emotion/styled";
import { Music } from "lucide-react";



// Header row with title and icon
const HeaderRow = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
margin-bottom: 2rem;
`;

const StyledMusicIcon = styled(Music)`
height: 2rem;
width: 2rem;
color: ${(props) => props.theme?.color?.primary || '#3f51b5'};
`;

const TitleMusic = styled.h1`
font-size: 1.875rem;
font-weight: bold;
`;


function Header () {
  return (
      <HeaderRow>
          <StyledMusicIcon />
          <TitleMusic>Music Manager</TitleMusic>
      </HeaderRow>
  )
}

export default Header