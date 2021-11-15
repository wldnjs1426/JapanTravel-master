import styled from "styled-components"
import React  from 'react';

const Div = styled.div`
    display:flex;
    justify-content:center;
`
const Img = styled.img`
`

function Loading(){
    const loading = `/image/icon/loading.gif`

    return(
        <Div>
            <Img src={loading} />
        </Div>
    )
        
}

export default Loading