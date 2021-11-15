import styled from "styled-components";
import React from 'react';


const Maker = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: red;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &:hover {
    z-index: 1;
}
`

const DetailMaker = () => {

    return(
        <Maker/>
    )}

    export default DetailMaker