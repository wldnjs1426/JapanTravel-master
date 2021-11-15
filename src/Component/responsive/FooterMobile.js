import React  from 'react';
import styled from "styled-components";

const Div = styled.div`
    width: 100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items:center;
    background-color: #ececec;
`
const Ul = styled.ul`
    width:100%;
    display:flex;
    justify-content: space-around;
    align-items:center;
`
const Li = styled.li`  
    width:20%;
    display:flex;
    justify-content: space-around;
    align-items:center;
    font-size:10px;
`
function Footer(){
    return(
        <Div>
            <Ul>
                <Li>
                    <img src={`/image/icon/instagram.png`} alt="instagram"/>
                    instagram
                </Li>
                <Li>
                    <img src={`/image/icon/facebook.png`} alt="facebook"/>
                    facebook
                </Li>
                <Li>
                    <img src={`/image/icon/youtube.png`} alt="youtube"/>
                    youtube
                </Li>
                <Li>
                    <img src={`/image/icon/kakao-talk.png`} alt="kakaotalk"/>
                    kakaotalk
                </Li>

            </Ul>
           
        </Div>
    )
}
export default Footer