import React, { FC } from 'react';
import styled from 'styled-components';
import { ConstructorType, setText } from '../../../../Redux/reducers/Constructor/ConstructorReducer';
import { useAppDispatch, useAppSelector } from "../../../../Types/Tipes"


const TextWrapStyle = styled.div`
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TextareaStyle = styled.textarea<{ isPreview: boolean | undefined}>`
      border: ${({ isPreview }) => isPreview ? "none" : "1px dashed #b4bfc0"}; 
      border-radius: 5px;
      width: 600px;
      overflow: hidden;
      outline: none;
      padding: 8px;
      resize: none;
      height: 150px;
`

interface Props {
    item: ConstructorType
    index: number
}

let plh = "Description"

const TextContainer: FC<Props> = ({ item, index}) => {
    let text = useAppSelector(state => state.ConstructorReducer.constructor[index].text)
    let dispatch = useAppDispatch()
    let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)

    

    

    return <TextWrapStyle>
        <TextareaStyle
            isPreview={isPreview}
            readOnly={isPreview}
            onChange={(e) => {
                let current = e.target
                console.log(current.clientHeight)
                console.log(current.scrollHeight)
                if(current.clientHeight !== current.scrollHeight) {
                    alert("max height 200px")
                    return
                }
                setValueFC(current.value)
            }}
            value={text}
            placeholder={plh}
            
            
        />
    </TextWrapStyle>



    function setValueFC(value: string) {
        dispatch(setText({index, text: value}))

    }
}

export default TextContainer