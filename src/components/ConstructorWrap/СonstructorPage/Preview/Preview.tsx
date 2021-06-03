import { useAppDispatch, useAppSelector } from "../../../../Types/Tipes";
import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import previewPng from './img/preview.png'
import editorPng from './img/editor.png'
import { setPreview } from "../../../../Redux/reducers/Constructor/ConstructorReducer";


const previewAnimation = keyframes`
 0% { transform: scale(1.2, 1.2) }
 100% { transform: scale(0.9, 0.9) }
`

const PreviewWrapStyle = styled.div`
   position: fixed;
   right: 24px;
   bottom: 24px;
   z-index: 99999;
`
const PreviewStyle = styled.div`
   cursor: pointer;
   padding: 12px;
   width: 200px;
   animation-name: ${previewAnimation};
   animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
    box-shadow: inset 0px -1px 0px 0px #1f87ff00, 0px 1px 2px 0px #0b325e80, -2px 3px 0px -2px rgb(0 0 0 / 12%);
    border-radius: 5px;
    &:hover { opacity: 0.8}

     & > img {
       width: 100%;
   }
`


interface Props {
   isShow?: boolean;
}

const Preview: FC<Props> = ({isShow}) => {
    let dispatch = useAppDispatch()
    let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)
    let currentImg = previewPng
    if(isPreview) {
        currentImg = editorPng
    }
    
    if(isShow) {
     
        return <div></div>
    }

    return <PreviewWrapStyle>
        <PreviewStyle >
            <img src={currentImg} alt="" onClick={() => dispatch(setPreview(!isPreview))} />
        </PreviewStyle>
    </PreviewWrapStyle>
}


export default Preview