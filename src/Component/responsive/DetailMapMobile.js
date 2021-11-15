import GoogleMapReact from 'google-map-react';
import React  from 'react';
import DetailMaker from '../DetailMaker';
import styled from "styled-components";
import { useParams } from 'react-router-dom';

const Div = styled.div`
  width: 100%;
  height: 100vh;
`
const ContentDiv = styled.div`
  width:100%;
  height:50px;
  display:flex;
  border-bottom:1px solid gray;
  justify-content:space-between;
  align-items:center;
`
const Ul = styled.ul`
  margin-left:10px;
`
const TitleLi = styled.li`
  font-size:15px;
`
const Li = styled.li`
  font-size:10px;
  color:gray;
`
const Img = styled.img`
  margin-right:10px;
`


function DetailMapMobile({history}) {
  
  const go = ()=>{
    history.goBack()

  }
    const lat = Number(useParams().lat)
    const lng = Number(useParams().lng)
    return (
      <>
        <ContentDiv onClick={()=>go()}>
          <Ul>
            <TitleLi>{useParams().name}</TitleLi>
            <Li>({useParams().japanName})</Li>
          </Ul>
          <Img src={"/image/icon/right-arrow.png"}/>
        </ContentDiv>
        <Div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyB_KKBXNCZ4h0jVdVfe6M3LQjNJMZJ5CUM" }}
            defaultCenter={{
              lat: lat,
              lng: lng
            }}
            defaultZoom={18}
          >
            <DetailMaker
                lat={lat}
                lng={lng}
                name={useParams().name}
              />
          </GoogleMapReact>
        </Div>
      </>
    );
}
export default DetailMapMobile;