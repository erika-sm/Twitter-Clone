import React from "react";
import styled from "styled-components";

import Heart from "./Heart";
import ScaleIn from "./ScaleIn";


const LikeButton = ({ size = 40, liked }) => {
  const heartSize = size * 0.6;

  return (
    <Wrapper style={{ width: size, height: size }}>
      {liked ? (
        <ScaleIn>
          <Heart width={heartSize} isToggled={liked} />
        </ScaleIn>
      ) : (
        <Heart width={heartSize} isToggled={liked} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
