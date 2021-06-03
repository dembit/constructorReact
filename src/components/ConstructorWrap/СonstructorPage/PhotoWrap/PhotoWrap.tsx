import React, { FC } from 'react';
import styled from 'styled-components';
import InputComponent from '../../../common/InputComponent/InputComponent';
import { CameraOutlined } from "@ant-design/icons"

import {  useAppDispatch, useAppSelector } from "../../../../Types/Tipes"
import OwnIcon from '../../../common/OwnIcon/OwnIcon';
import { OwnIconWrapStyle } from '../VideoWrap/VideoWrap';
import { ConstructorType, setPhoto, setText } from '../../../../Redux/reducers/Constructor/ConstructorReducer';


const VideoWrapStyle = styled.div`
  background-color: #e9ebed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 40px 0;


`

const VideoStyle = styled.div`
  border-radius: 5px;
  background-color: #fff;
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  & > span {
    text-align: center;
    padding: 40px;
  }

  & > img {
    border-radius: 5px;
    width: 100%;
    
  }

`

const VideoTextStyle = styled.div`
  border-radius: 5px;
  width: 250px;
  margin-top: 15px;
`


let initialText = "Click or drag file to this area to upload"




interface DragDropPhotoType extends React.DragEvent<HTMLDivElement> {

}
interface Props {
  item: ConstructorType
  index: number
 
}

const PhotoWrap: FC<Props> = ({ item, index }) => {
  let dispatch = useAppDispatch()
  let text = useAppSelector(state => state.ConstructorReducer.constructor[index].text)
  let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)

  return <VideoWrapStyle>
    <OwnIconWrapStyle>
      <OwnIcon isPreview={isPreview} index={index} getFile={getFile} imgComponent={<CameraOutlined />} />
    </OwnIconWrapStyle>
    <VideoStyle onDrop={(e) => DropPhoto(e)} onDragLeave={(e) => DragLeavePhoto(e)} onDragOver={e => DragOverPhoto(e)}>
      {item.photo === "" && <span>
        {initialText}
      </span>}
      {item.photo !== "" && <img src={item.photo} alt="img" />}
    </VideoStyle>
    <VideoTextStyle>
      <InputComponent isPreview={isPreview} align="center" text={text} size="18px" getTitle={getTitle} inputTitle={{ maxLength: 15 }} />
    </VideoTextStyle>
  </VideoWrapStyle>


  function DragOverPhoto(e: DragDropPhotoType) {
    e.preventDefault()
    let current = e.currentTarget as HTMLDivElement
    current.style.border = '1px dotted #213b69f9'

  }

  function DragLeavePhoto(e: DragDropPhotoType) {
    let current = e.currentTarget as HTMLDivElement
    current.style.border = ''
  }


  function DropPhoto(e: DragDropPhotoType) {
    e.preventDefault()
    let files = e.dataTransfer.files
    setFile(files)

  }

  function getTitle(value: string) {
    dispatch(setText({index, text: value}))
  }


  function getUrl(files: FileList) {
    if(files.length === 0) {
      return 
    }
    let reg = /image\//i
    let checkType = files[0].type.match(reg)
    if (!checkType) {
      alert("Photo type is wrong.Type must includes 'image/'(Example 'image/jpeg')")
      return
    }
    return URL.createObjectURL(files[0])
  }

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    let files = e.currentTarget.files
    if (!files) {
      return
    }
    setFile(files)
  }
  
  function setFile(files: FileList) {
    let url = getUrl(files)
    if (!url) {
      return
    }


    dispatch(setPhoto({ index, url }))
    alert("photo installed successfully")
  }


}


export default PhotoWrap