import { Link } from "react-router-dom";
import styled from "styled-components";
import React from 'react';

const Navi = styled.nav`
    color:black;
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 12px;
`

function Nav(props){

    let name = null
    if(props.Name){
         name = ` > `+ props.Name
    }
    return(
        <>
            <Navi><Link to={`/`}>Home&nbsp; </Link>{` > `}<span>&nbsp;{props.Area}&nbsp;{` > `}&nbsp;{props.Category} &nbsp;{name}&nbsp;</span></Navi>
        </>
    )
}

export default Nav