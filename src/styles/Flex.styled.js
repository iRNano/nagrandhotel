import React from "react";
import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;

  & > div,
  & > ul {
    flex: 1;
  }
`;
