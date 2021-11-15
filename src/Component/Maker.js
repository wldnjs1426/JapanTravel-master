import React from 'react';
import { useEffect, useState  } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';


const Div = styled.div`
  width: 200px;
  height: 200px;
`
const SubDiv = styled.div`
  width: 180px;
  height: 200px;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
  position: relative;
  top: -220px;
  left: -100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  visibility: ${props => props.hover ? `visible`: `hidden`};
  z-index:10;
`
const Img = styled.img`
  width: 150px;
  height: 150px;
`

const MakerDiv = styled.div`
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
    &:hover {
    z-index: 1;
`
const Li = styled.li`
      color:gray;
      text-align:right;
      font-size:12px;
      margin-bottom:5px;
`
function Maker(props){

  const index = props.data.id
  const id = props.id
    
  const [toggle, setToggle] = useState(props.hover)

  useEffect(()=>{
    index === id ? setToggle(props.hover) : setToggle(false)
    if(index === id){
      props.makerClick(props.data)
    }
  },[])

  const clickToggle = ()=>{
    setToggle(true)
    props.makerClick(props.data)
  }
  const deleteToggle = ()=>{
    setToggle(false)
  }


    return(
      <Div>
        <MakerDiv onClick={()=>clickToggle()} className="maker" alt="maker" />  
        <SubDiv hover={toggle}>
          <ul>
            <Li onClick={()=>deleteToggle()}>X</Li>
            <li>
              <Link to={`/detail/${props.data.id}/${props.category}/${props.data.Area}/${props.data.detail_nm}`}>
                <Img src={props.data.Thumbnail_img} alt={props.data.name}/>
              </Link>
            </li>
            <li>{props.data.name}</li>
          </ul>
        </SubDiv>
      </Div>
    )
  }

    export default Maker