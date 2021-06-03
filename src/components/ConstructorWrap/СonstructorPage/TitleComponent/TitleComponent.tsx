import React, { FC } from 'react';
import styled from 'styled-components';
import InputComponent from '../../../common/InputComponent/InputComponent'

import { useAppDispatch, useAppSelector } from '../../../../Types/Tipes';
import { ConstructorType, setText } from '../../../../Redux/reducers/Constructor/ConstructorReducer';


const TitleWrapStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100px;
     

`

const TitleStyle = styled.div`
    width: 600px;
    position: relative; 
    border-radius: 5px;
    

`

interface Props {
    item: ConstructorType

    index: number
    
}

const TitleComponent: FC<Props> = ({ item, index }) => {
    let dispatch = useAppDispatch()
    let text = useAppSelector(state => state.ConstructorReducer.constructor[index].text)
    let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)

    return <TitleWrapStyle>
        <TitleStyle >
            <InputComponent isPreview={isPreview} align="center" text={text} size="35px" getTitle={getTitle} inputTitle={{ maxLength: 25 }} />
        </TitleStyle>
    </TitleWrapStyle>


    function getTitle(value: string) {
        dispatch(setText({index, text: value}))
    }
}




export default TitleComponent