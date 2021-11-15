import React  from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import { useState,useEffect } from 'react';
import styled from "styled-components";
import MainSlideMobile from "./MainSlideMobile";
import FooterMobile from './FooterMobile';


const Div = styled.div`
    width: 1fr;
    height: 84vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
`
const MenuDiv = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top:1px solid gray;
    border-bottom:1px solid gray;
    background-color: whitesmoke;

`
const Section = styled.section`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border:1px solid brown;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`
const FooterDiv = styled.div`
    width:100%;
    height:60px;
`
const Img = styled.img`
    width:50%;
    height:50%;
`

function MainSubMobile(){
    const [Category, setCategory] = useState([]);

    //Axios로 데이터베이스 접근 
    useEffect(()=>{
        Axios.get('http://13.209.82.0:5000/tour/Category').then((response)=>{
    //가져온 데이터를 Category 데이터로 선언
        setCategory(response.data);
    })
    },[])


    
    return(
            <Div>
                <MainSlideMobile />
                {/* map함수로 length만큼 반복 */}
                <MenuDiv>
                    {Category.map(data => (
                        <Link key={data.category_id} to={`/map/${data.target_table}`}>
                            <Section>
                                <Img src={`/image/icon/${data.target_table}.png`} alt={data.target_table} />
                                {data.target_table.toUpperCase()}
                            </Section>
                        </Link>
                    ))}    
                    
                </MenuDiv>
                
                <FooterDiv>
                    <FooterMobile />
                </FooterDiv>
            </Div>
    )
}
export default MainSubMobile