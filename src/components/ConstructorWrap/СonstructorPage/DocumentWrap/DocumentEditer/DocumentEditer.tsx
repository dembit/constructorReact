import { useAppDispatch, useAppSelector } from '../../../../../Types/Tipes';
import React, { FC } from 'react';
import styled from 'styled-components';
import InputComponent from '../../../../common/InputComponent/InputComponent';
import pdfImg from './img/pdf.png'
import { setShortText, setText } from '../../../../../Redux/reducers/Constructor/ConstructorReducer';

const DocumentWrapStyle = styled.div`
    background-color: #e9f7ef;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

`

const DocumentStyle = styled.div`
    background-color: #e9f7ef;
    border-radius: 5px;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 15px 25px;

    & > img {
       height: 100%;
       margin-right: 25px;
    }
`

const InputWrapStyle = styled.div`
  border-radius:5px;
  margin-right: 40px;
`
const InputComponentStyle = styled.div`
  min-width: 150px;
  
  & > div {
      justify-content: left;
  }
`
const DocumentButton = styled.button`
   background-color: #2aaf62;
   border-radius: 5px;
   border: 0;
   color: #fff;
   padding: 10px 15px;
   cursor: pointer;

   &:hover {
       opacity: 0.8;
   }
`

interface Props {
  index: number

}

let altDf = "pdf"
let firstDf = "Name file"
let secondDf = "Short Description"
let buttonDf = "Download"
const DocumentEditor: FC<Props> = ({ index }) => {

  let documentLocal = useAppSelector(state => state.ConstructorReducer.constructor[index].document)
  let text = useAppSelector(state => state.ConstructorReducer.constructor[index].text)
  let textShort = useAppSelector(state => state.ConstructorReducer.constructor[index].shortText)
  let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)
  let dispatch = useAppDispatch()
  return <DocumentWrapStyle>
    <DocumentStyle>
      <img src={pdfImg} alt={altDf} />
      <InputWrapStyle>
        <InputComponentStyle>
          <InputComponent isPreview={isPreview} plh={firstDf} text={text} size="18px" inputTitle={{ maxLength: 20 }} fontWeight={"500"} getTitle={getFirstText} />
        </InputComponentStyle>
        <InputComponentStyle>
          <InputComponent isPreview={isPreview} plh={secondDf} text={textShort} inputTitle={{ maxLength: 25 }} size="18px" fontWeight={"400"} getTitle={getSecondText} />
        </InputComponentStyle>
      </InputWrapStyle>
      <DocumentButton onClick={getDocument}>
        {buttonDf}
      </DocumentButton>
    </DocumentStyle>
  </DocumentWrapStyle>

  function getFirstText(value: string) {
    dispatch(setText({ index, text: value }))
  }

  function getSecondText(value: string) {
    dispatch(setShortText({ index, text: value }))
  }

  function getDocument() {
    if (documentLocal === "") {
      return
    }
    let link = document.createElement('a')
    link.download = "example"
    link.href = documentLocal
    link.click()
    link.remove()

  }
}


export default DocumentEditor