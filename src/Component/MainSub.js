import React  from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import { useState,useEffect } from 'react';
import styled from "styled-components";
import MainSlide from "./MainSlide";
import Footer from './Footer';


const Div = styled.div`
    width: 1fr;
    height: 90%;
    position:absolute;
    top:100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
`
const MenuDiv = styled.div`
    width: 60%;
    height: 240px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition:0.5s
`
const Section = styled.section`
    width: 200px;
    height: 200px;
    border-radius: 10px;
    border:1px solid brown;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 30px;
    font-weight: 550;
    cursor: pointer;
`
const FooterDiv = styled.div`
    width:100%;
    height:150px;
`

function MainSub(){
    const [Category, setCategory] = useState([]);

    //Axios로 데이터베이스 접근 
    useEffect(()=>{
        Axios.get('http://13.209.82.0:5000/tour/Category').then((response)=>{
    //가져온 데이터를 Category 데이터로 선언
        setCategory(response.data);
    })
    },[])

        console.log("김지원")



    return(
            <Div>
                <MainSlide />
                {/* map함수로 length만큼 반복 */}
                <MenuDiv >
                    {Category.map(data => (
                        <Link key={data.id} to={`/map/${data.target_table}`}>
                            <Section>
                                <img src={`/image/icon/${data.target_table}.png`} alt={data.target_table} />
                                {data.target_table.toUpperCase()}
                            </Section>
                        </Link>
                    ))}    
                </MenuDiv>
                
                <FooterDiv>
                    <Footer />
                </FooterDiv>
            </Div>
    )
}
export default MainSub