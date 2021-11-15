import React  from 'react';
import { useState } from "react"
import styled from "styled-components";
import UseInterval from './UseInterval';


const WrapDiv = styled.div`
    width:100%;
    height:400px;
    display:flex;
    align-items: center;
    justify-content: center;
    background: #ececec;
    position:relative;
`
const IframeDiv = styled.div`
    width:50%;
    height:350px;
    position:relative;
`
const SlideDiv = styled.div`
    margin-left:30px;
    position:absolute;
    left:${props => props.left};
    transition:0.2s;
`
const Iframe = styled.iframe`
    width:600px;
    height:350px;
`
const BlurDiv = styled.div`
    position: absolute;
    width:600px;
    height:350px;
    background-color: rgba(255, 255, 255, 0.082);
    visibility:${props => props.left === 50+"px" ? "hidden" : "visible"};
`

function MainSlide(props){
    //슬라이드 option
    const iframeSettings ={
        title:"YouTube video player",
        frameborder:"0",
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
        -700+"px",50+"px",800+"px",1550+"px",2300+"px"
    ])

    const Move = (left,index) =>{
            
        const copyList = [...leftvalue]
        var value
        var i
        if(left === 800+"px"){
        for( i=4 ; i > 0 ; i--){   
            if(i === 4){
                value = copyList[4]
            }
            copyList[i] = copyList[i-1]
        }
        copyList[0] = value
        }else{
            for( i = 0 ; i < copyList.length ; i++){   
                if(i === 0){
                    value = copyList[0]
                }
                copyList[i] = copyList[i+1]
            }
            copyList[4] = value
        }
        setLeftvalue(copyList)
    }
    //auto slide
    const [isRunning,setIsRunning] = useState(true)

        UseInterval(() => {
            Move(800+"px")
        }, isRunning ? 4000 : null);
    
        
    

    return(
        <> 
            <WrapDiv onMouseOver={()=>setIsRunning(false)} onMouseOut={()=>setIsRunning(true)} menu={props.toggle} >
                    <IframeDiv >  
                        {iframeList.map((data,index) => (
                            <SlideDiv 
                                key={index} 
                                left={leftvalue[index]}
                            >
                                <BlurDiv 
                                    onClick={()=>Move(leftvalue[index])}
                                    left={leftvalue[index]}
                                >
                                </BlurDiv>
                                <Iframe 
                                    src={data}
                                    {...iframeSettings}
                                />
                            </SlideDiv>
                        ))}
                    </IframeDiv>
                    
            </WrapDiv>
            
        </>
    )
}

export default MainSlide