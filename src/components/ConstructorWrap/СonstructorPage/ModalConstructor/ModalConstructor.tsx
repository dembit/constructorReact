import React, { FC } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { getUniqueKey, useAppDispatch } from '../../../../Types/Tipes';
import { ConstructorType, setConstructorThunk } from '../../../../Redux/reducers/Constructor/ConstructorReducer';
const ModalItemType = styled.div`
  text-align: center;
  cursor: pointer;
  span {
      font-size: 24px;
      :hover {
          opacity: 0.8
      }
  }
`



interface Props {
    isModalVisible: boolean;
    setModalVisible: (data: boolean) => void;
    index: number
    copy?: ConstructorType
}

type nameTypes = "Title" | "Text" | "Slider" | "Video" | "Photo" | "Document" | "Music"

let title = "Title"
let text = "Text"
let slider = "Slider"
let video = "Video"
let photo = "Photo"
let document = "Document"
let music = "Music"

let names = [
    title,
    text,
    slider,
    video,
    photo,
    document,
    music
] as nameTypes[]

function getObject(type: nameTypes): ConstructorType | null {
    let template = { text: "", title: "", shortText: "", video: "", photo: "", document: "", audio: "", slider: [] }
    switch (type) {
        case title:
            return { ...template, type: "title", id: getUniqueKey() }
        case text:
            return { ...template, type: "text", id: getUniqueKey() }
        case slider:
            return { ...template, type: "slider", id: getUniqueKey() }
        case video:
            return { ...template, type: "video", id: getUniqueKey() }
        case photo:
            return { ...template, type: "photo", id: getUniqueKey() }
        case document:
            return { ...template, type: "document", id: getUniqueKey() }
        case music:
            return { ...template, type: "music", id: getUniqueKey() }
        default:
            return null

    }
}

const ModalConstructor: FC<Props> = ({ isModalVisible, setModalVisible, index, copy }) => {

    const dispatch = useAppDispatch()

    return <Modal width={300} footer={null} title={null} visible={isModalVisible} onCancel={handleCancel}>
        {copy && <ModalItemType onClick={(e) => {
            e.preventDefault()


            setItem({ ...copy, id: getUniqueKey() })
        }}>
            <span>
                {`Add element(${copy.type})`}
            </span>
        </ModalItemType>}
        {names.map((item) => {
            return <ModalItemType key={getUniqueKey()} onClick={() => getItem(item)}>
                <span>
                    {item}
                </span>
            </ModalItemType>
        })}

    </Modal>


    function setItem(el: ConstructorType) {
        dispatch(setConstructorThunk({ constructor: el, index }))
        setModalVisible(false)
    }

    function getItem(item: nameTypes) {
        let newConstructor = getObject(item)
        if (!newConstructor) {
            console.log("No constructor found")
            return
        }

        dispatch(setConstructorThunk({ constructor: newConstructor, index }))
        setModalVisible(false)


    }

    function handleCancel() {
        setModalVisible(false)
    }

}




export default ModalConstructor