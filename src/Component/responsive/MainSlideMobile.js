import React  from 'react';
import { useState } from "react"
import styled from "styled-components";


const WrapDiv = styled.div`
    width:100%;
    height:230px;
    position:relative;
`
const MoveDiv = styled.div`
    width:100%;
    height:30px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:#ececec;
`
const LeftArrow = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:25px;
    height:30px;
    font-size:30px;
    font-weight:bold;
    color:#8C4216;
`
const RightArrow = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    width:25px;
    height:30px;
    font-size:30px;
    color:#8C4216;
`
const SlideDiv = styled.div`
    width:100%;
    height:200px;
    position:absolute;
    bottom:0;
    left:${props => props.left};
    transition:0.2s;
`
const Iframe = styled.iframe`
    width:100%;
    height:200px;
`


function MainSlideMobile(props){
    //슬라이드 option
    const iframeSettings ={
        title:"YouTube video player",
        frameborder:"50px",
        allowFullScreen:true,
        allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    };
    const iframeList = [
        "https://www.youtube.com/embed/V2Xy2pplg_g",  
        "https://www.youtube.com/embed/gMaW-mR0pqI",                  
        "https://www.youtube.com/embed/RLpsbFamIKY",                  
        "https://www.youtube.com/embed/r1qKd_J6ak0", 
        "https://www.youtube.com/embed/6psF6R9xmhs" 
    ]
    const [leftvalue,setLeftvalue] = useState([
        -600+"px",0+"px",600+"px",720+"px",1080+"px"
    ])
    const [slideNum,setSlideNum] = useState(1);

    const Move = (left) =>{
            
        const copyList = [...leftvalue]
        var value
        var i
        if(left){
        for( i=4 ; i > 0 ; i--){   
            if(i === 4){
                value = copyList[4]
            }
            copyList[i] = copyList[i-1]
        }
        copyList[0] = value
        slideNum === 5 ? setSlideNum(1) : setSlideNum(slideNum+1)

        }else{
            for( i=0 ; i < copyList.length ; i++){   
                if(i === 0){
                    value = copyList[0]
                }
                copyList[i] = copyList[i+1]
            }
            copyList[4] = value
            slideNum === 1 ? setSlideNum(5) : setSlideNum(slideNum-1)

        }
        setLeftvalue(copyList)
    }


    return(
        <>
            <WrapDiv menu={props.toggle} >
                <MoveDiv>
                    <LeftArrow onClick={()=>Move(false)}>{"<"}</LeftArrow>
                    {slideNum}/{iframeList.length}
                    <RightArrow onClick={()=>Move(true)}>{">"}</RightArrow>
                </MoveDiv>
                        {iframeList.map((data,index) => (
                            <SlideDiv 
                                key={index} 
                                left={leftvalue[index]}
                                
                            >
                                <Iframe 
                                    src={data}
                                    {...iframeSettings}
                                />
                            </SlideDiv>
                        ))}

            </WrapDiv>
            
        </>
    )
}

export default MainSlideMobile