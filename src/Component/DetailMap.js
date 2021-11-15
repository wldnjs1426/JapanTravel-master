import GoogleMapReact from 'google-map-react';
import React  from 'react';
import DetailMaker from './DetailMaker';
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 100%;
`


function DetailMap(props) {

    return (

      <Div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB_KKBXNCZ4h0jVdVfe6M3LQjNJMZJ5CUM" }}
          defaultCenter={{
            lat: props.lat,
            lng: props.lng
          }}
          defaultZoom={18}
        >
          <DetailMaker
              lat={props.lat}
              lng={props.lng}
              name={props.name}
            />
        </GoogleMapReact>
      </Div>
    );
}
export default DetailMap;