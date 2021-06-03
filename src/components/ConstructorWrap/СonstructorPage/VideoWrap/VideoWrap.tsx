import React, { FC } from 'react';
import styled from 'styled-components';
import InputComponent from '../../../common/InputComponent/InputComponent';
import { VideoCameraOutlined } from '@ant-design/icons';

import { GetUploadFile, useAppDispatch, useAppSelector } from "../../../../Types/Tipes"
import OwnIcon from '../../../common/OwnIcon/OwnIcon'
import "video-react/dist/video-react.css";
// @ts-ignore
import { Player } from 'video-react';
import { ConstructorType, setText, setVideo } from '../../../../Redux/reducers/Constructor/ConstructorReducer';






const VideoWrapStyle = styled.div`
  background-color: #e9ebed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding:  40px 0;

`

const VideoStyle = styled.div`
  text-align: center;
  border-radius: 5px;
  background-color: #ffffff;
  width:40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;


`
 interface DragDropType extends React.DragEvent<HTMLDivElement> {

}

const VideoTextStyle = styled.div`
  border-radius: 5px;
  width: 250px;
  margin-top: 15px;
`

export const OwnIconWrapStyle = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 1;
  right: 150px;
  top: 12px;
`



let initialText = "Click or drag file to this area to upload "


interface Props {
  item: ConstructorType
  index: number
}


const VideoWrap: FC<Props> = ({ index, item }) => {
  let text = useAppSelector(state => state.ConstructorReducer.constructor[index].text)
  let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)
 

  let dispatch = useAppDispatch()

  return <VideoWrapStyle>
    <OwnIconWrapStyle>
      <OwnIcon isPreview={isPreview} index={index} getFile={getFile} imgComponent={<VideoCameraOutlined />} />
    </OwnIconWrapStyle>
    <VideoStyle onDrop={(e) => DropVideo(e)} onDragLeave={(e) => DragLeaveVideo(e)} onDragOver={e => DragOverVideo(e)} >
      {item.video === "" && <div style={{padding: "40px"}} onClick={clickPreVideo}>
        {initialText}
      </div>}

      {item.video !== "" && <Player
        playsInline
        src={item.video}
      />}
    </VideoStyle>
    <VideoTextStyle>
      <InputComponent isPreview={isPreview} text={text}  align="center" size="18px" getTitle={getTitle} inputTitle={{ maxLength: 15 }} />
    </VideoTextStyle>
  </VideoWrapStyle>

  function clickPreVideo() {
    GetUploadFile((e) => {
      let files = e.files
      if (!files) {
        return
      }
      setFile(files)

    })

  }

  function DragOverVideo(e: DragDropType) {
    e.preventDefault()
    let current = e.currentTarget as HTMLDivElement
    current.style.border = '1px dotted #213b69f9'

  }

  function DragLeaveVideo(e: DragDropType) {
    let current = e.currentTarget as HTMLDivElement
    current.style.border = ''
  }


  function DropVideo(e: DragDropType) {
    e.preventDefault()
    let files = e.dataTransfer.files
    setFile(files)

  }

  function getTitle(value: string) {
     dispatch(setText({index, text: value}))
  }

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    let files = e.currentTarget.files
    if (!files) {
      return
    }
    setFile(files)
  }

  function getUrl(files: FileList) {
    let reg = /video/i
    let checkType = files[0].type.match(reg)
    if (!checkType) {
      alert(" Video type is wrong.Type must includes 'video'(Example 'video/mp4')")
      return
    }
    return URL.createObjectURL(files[0])
  }

  function setFile(files: FileList) {
    let url = getUrl(files)
    if (!url) {
      return
    }
    dispatch(setVideo({ index, url }))
    alert("video installed successfully")
  }

}


export default VideoWrap