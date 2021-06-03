import SliderRedactor from "./SliderRedactor/SliderRedactor"
import React, { FC } from "react"
import styled from "styled-components"
import { CameraOutlined } from "@ant-design/icons"

import { useAppDispatch, useAppSelector } from "../../../../Types/Tipes"
import OwnIcon from "../../../common/OwnIcon/OwnIcon";
import { OwnIconWrapStyle } from "../VideoWrap/VideoWrap";
import { ConstructorType, setSliderPhoto } from "../../../../Redux/reducers/Constructor/ConstructorReducer"




const SliderWrapStyle = styled.div`
  width: calc(99vw - 2px);  
  padding: 60px 0;
  position: relative;
`


interface Props {
  item: ConstructorType
  index: number
  
}

const SliderWrap: FC<Props> = ({ item, index }) => {
  let dispatch = useAppDispatch()
  let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)
  return <SliderWrapStyle>
       <OwnIconWrapStyle>
            <OwnIcon isPreview={isPreview} index={index} getFile={getFile} imgComponent={<CameraOutlined />} />
        </OwnIconWrapStyle>
    <SliderRedactor isPreview={isPreview} index={index} />
  </SliderWrapStyle>

function getUrl(files: FileList) {
  if(files.length < 3) {
      alert("min count img 3")
      return 
  }
  let reg = /image\//i

  let checkType = true
  let url = [] as string[]
  for (var i = 0; i < files.length; i++) {
    let check = files[i].type.match(reg)
    if(!check) {
       checkType = false
       break
    }
    url = [...url, URL.createObjectURL(files[i])]
  }
 
  if (!checkType) {
    alert(" Slider type is wrong.Type must includes 'image/'(Example 'image/jpeg')")
    return
  }
   
  
  return url
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
 
  url.map((item, indexLocal) => {
       dispatch(setSliderPhoto({ index, url: item  }))
  })
  
  alert("Slider installed successfully")
}


}



export default SliderWrap