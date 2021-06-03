import React, { FC,  useRef } from 'react';
import styled from 'styled-components';


type CssNameType = string | undefined

const TitleStyle = styled.div<{isPreview: boolean | undefined, align: CssNameType, color: CssNameType, size: CssNameType, fontWeight: CssNameType }>`
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    border: ${({ isPreview }) => isPreview ? "none" : "1px dashed #b4bfc0"}; 
    border-radius: 5px;

    > input {
        text-align: ${({ align }) => align ? align : "left"};
        width: 100%; 
        border: none;
        background-color: inherit;
        outline: none;
        font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : "700"};
        color: ${({ color }) => color ? color : "#415053"};
        font-size: ${({ size }) => size ? size : "24px"};
        opacity: 1;
    }

    span {
        font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : "700"};
        color: ${({ color }) => color ? color : "#415053"};
        font-size: ${({ size }) => size ? size : "24px"};
        border-radius: 5px;
        
    }

    

    
`

interface Props {
    getTitle: (value: string) => void
    inputTitle?: React.InputHTMLAttributes<HTMLInputElement>
    color?: string
    size?: string
    fontWeight?: string
    plh?: string
    align?: "left" | "center" | "right"
    text: string
    isPreview?: boolean
}


const InputComponent: FC<Props> = ({isPreview, getTitle, inputTitle, text, color, size, plh, fontWeight, align }) => {
    let inputRef = useRef<HTMLInputElement>(null)


    return <TitleStyle isPreview={isPreview} align={align} fontWeight={fontWeight} size={size} color={color} >

        <input
            disabled={isPreview}
            type="text"
            onChange={(e) => Change(e.target.value)}
            ref={inputRef}
            placeholder={plh}
            {...inputTitle}
            value={text}

        />
    </TitleStyle>

    function Change(value: string) {
        getTitle(value)

    }
}

export default InputComponent