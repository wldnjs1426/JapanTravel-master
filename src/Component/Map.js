import React from 'react';
import GoogleMapReact from 'google-map-react';
import Maker from './Maker'
import { useState } from 'react';
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 100%;
`
function Map(props){
  //react google map props로 보내줄 변수 선언
  const maker = props.Areadata;
  const [zoom, setZoom] = useState(5.5)
  const [mapCenter, setMapCenter] = useState({
    lat: 37.03013749473848,
    lng: 138.93663670054565
  })

  //maker focusing
  const makerClick= (maker)=> {
    const center ={
      lat: maker.coordinate_lat,
      lng: maker.coordinate_lng
    }
    setMapCenter(center)
    setZoom(16)
  }
    return (

      <Div>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: "AIzaSyB_KKBXNCZ4h0jVdVfe6M3LQjNJMZJ5CUM",
            libraries:['places', 'geometry', 'drawing', 'visualization']
          }}
          center={mapCenter}
          zoom={zoom}
          heatmap
          yesIWantToUseGoogleMapApiInternals={true}
          layerTypes={['TrafficLayer', 'TransitLayer']}
          
        >
          {maker.map(data =>(
            <Maker key={data.id}
              lat={data.coordinate_lat}
              lng={data.coordinate_lng}
              data={data}
              makerClick={makerClick}
              hover={props.hover}
              id={props.id}
              category={props.category}
            />
          ))}
        
        </GoogleMapReact>
      </Div>
    );
}
export default Map;