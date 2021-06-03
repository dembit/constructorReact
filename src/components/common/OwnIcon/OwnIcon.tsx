import React, { FC } from 'react';
import styled from 'styled-components';



const OwnWrapStyle = styled.div`
   padding: 6px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: inset 0px -1px 0px 0px #1f87ff00, 0px 1px 2px 0px #0b325e80, -2px 3px 0px -2px rgb(0 0 0 / 12%);
`

const OwnIconWrapStyle = styled.label`
  color: #fff;

  cursor: pointer;
  & > :first-child {
     display: inline-block;
    background-color: #389adc;
    padding: 5px;
    border-radius: 5px;
  }
`



const OwnIconInputStyle = styled.input`
   width: 0; 
`

interface Props {
   imgComponent?: React.ReactNode
   getFile: (e: React.ChangeEvent<HTMLInputElement>) => void
   index: number
   isPreview?: boolean
}



const OwnIcon: FC<Props> = ({ imgComponent, getFile, index, isPreview }) => {

   if(isPreview) {
      return <div></div>
   }

   return <OwnWrapStyle>
      <OwnIconWrapStyle htmlFor={`file_${index}`}>
         {imgComponent}
      </OwnIconWrapStyle>
      <OwnIconInputStyle id={`file_${index}`} onChange={(e) => getFile(e)} type={"file"} multiple />
   </OwnWrapStyle>
}


export default OwnIcon