import React  from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 9%;
  display: flex;
  align-items: center;
  border-bottom:1px solid gray;
  background-color:white;
`
const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const Span = styled.span`
  width: 200px;
  text-align: center;
  color:black;
`
const Img = styled.img`
  height:55px;
`

function HeaderMobile(){
  
  const logo = `/image/icon/logo.png`


    return(
          <Div>
                <Section>
                  <Link to={`/`}>
                    <Span><Img src={logo}/></Span>
                  </Link>
                </Section>
          </Div>

    )
}
export default HeaderMobile