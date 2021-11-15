import React from 'react';
import { useEffect, useState } from "react"
import Axios from 'axios';
import {Link} from 'react-router-dom'
import styled from "styled-components";
import FooterMobile from './FooterMobile';

const Div = styled.div`
    width:1fr;
    height: 100vh;
    display:flex;
    flex-direction: column;
    align-items: center;
`
const DetailDiv = styled.div`
    width: 100%;
    height: 99%;
    background-color: white;
    overflow-y: scroll;
    overflow-x: hidden;
`
const Section = styled.section`
    width: 100%;
    height: 50%;
    background:url(${props => props.img});
    background-size:cover;
    position: relative;
`
const ThumbnailInfoDiv = styled.div`
    width: 40%;
    height: 150px;
    position:absolute;
    bottom:0;
    z-index: 2;
    background-color:rgba(3, 3, 3, 0.253);
    color:white;
`
const DetailSection = styled.section`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items:center;
`
const TextDiv = styled.div`
    width: 100%;
    z-index: 2;
`
const Ul = styled.ul`
    display: flex;
    width:100%;
    flex-direction:column;
    justify-self: flex-end;
    align-items:center;
    margin-bottom:15px;
    
`
const Li = styled.li`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    border-bottom:1px solid rgb(189, 187, 187) ;
`
const HeadLi = styled.li`
    width: 90%;
    margin-bottom:30px;
    margin-right:15px;
    color:#8C4216;
    font-size:15px;
    font-weight:bold;   
`
const SubHeadLi = styled.li`
    width: 90%;
    margin-bottom:20px;
    margin-right:10px;
    font-size:13px;
    color:#8C4216;
    font-weight:bold;   

`
const ListDiv = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-end;
`
const FooterMobileDiv = styled.div`
    margin-top:20px;
    width:99%;
    height:70px;
`
function DetailPage({match}) {

    const [detailData,setdetailData] = useState([]);
    const category = match.params.category
    const id = match.params.id
    const area = match.params.Area

    useEffect(()=>{
        Axios.get('http://13.209.82.0:5000/detail',{
        params: {
            id: id,
            Category: category
        }
        }).then((response)=>{
            setdetailData(response.data);
        }).catch((error) =>{
            console.log(error)
        })
        
    },[category,id,area])

return(
    <Div>
        {detailData.map(data =>(
            <DetailDiv key={data.id}>
                <Section img={data.Thumbnail_img} >
                    <ThumbnailInfoDiv>
                        <ul>
                            <li style={{fontSize: "25px",fontWeight:"600", marginBottom:"10px"}}>{data.name}</li>
                            <li style={{fontSize: "15px",fontWeight:"100"}}>({data.Japan_name})</li>
                            
                        </ul>
                    </ThumbnailInfoDiv>
                </Section>
                <DetailSection>
                    <TextDiv>
                        <Ul>
                            <HeadLi>개요</HeadLi>
                            <Li>{data.Thumbnail_text}</Li>
                        </Ul>
                    </TextDiv>
                    
                    <TextDiv>
                        <Ul>
                            <HeadLi>시설 설명</HeadLi>
                            <Li>{data.Detail_text}</Li>
                        </Ul>
                    </TextDiv>

                    <TextDiv>
                        <Ul>
                            <HeadLi>시설 기본정보</HeadLi>
                            <Li>
                                <Ul>
                                    <SubHeadLi>주소 <Link to={`/detailMap/${data.coordinate_lat}/${data.coordinate_lng}/${data.name}/${data.Japan_name}`}>지도보기</Link></SubHeadLi>
                                    <Li>{data.Address}</Li>
                                </Ul>
                                <Ul>
                                    <SubHeadLi>전화번호</SubHeadLi>
                                    <Li>{data.phone_number}</Li>
                                </Ul>
                                <Ul>
                                    <SubHeadLi>영업시간</SubHeadLi>
                                    <Li>{data.Opening_hours}</Li>
                                </Ul>
                            </Li>
                        </Ul>
                        <ListDiv>
                            <Link to={`/map/${match.params.category}`}>
                                <button>목록</button>
                            </Link>
                        </ListDiv>
                    </TextDiv>
                </DetailSection>
                <FooterMobileDiv>
                    <FooterMobile />
                </FooterMobileDiv>
            </DetailDiv>
        ))}
    </Div>
    

)
}
export default DetailPage