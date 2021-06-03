import React, { FC } from 'react';
import Delimeter from '../../common/Delimeter/Delimeter';
import styled from 'styled-components';
import TextContainer from './TextContainer/TextContainer';
import TitleComponent from './TitleComponent/TitleComponent';
import SliderWrap from './SliderWrap/SliderWrap';
import PhotoWrap from './PhotoWrap/PhotoWrap';
import DocumentWrap from './DocumentWrap/DocumentWrap';
import VideoWrap from './VideoWrap/VideoWrap';

import ListButton, { ListButtonsType } from '../../common/ListButton/ListButton';

import MusicWrap from './MusicWrap/MusicWrap';
import { ButtonWrapStyle } from '../../../Style/Style';

import { useAppDispatch, useAppSelector } from '../../../Types/Tipes';
import { addConstructorThunk, ConstructorType, deleteConstructorThunk, setCopy } from '../../../Redux/reducers/Constructor/ConstructorReducer';



const ConstructorWrapStyle = styled.div`
   padding-top: 40px;
`




function ChooseConstructor(item: ConstructorType, index: number) {



    let props = { item, index }
    switch (item.type) {
        case "slider":
            return <SliderWrap {...props} />
        case "title":
            return <TitleComponent {...props} />
        case "text":
            return <TextContainer {...props} />
        case "video":
            return <VideoWrap {...props} />
        case "photo":
            return <PhotoWrap {...props} />
        case "document":
            return <DocumentWrap {...props} />
        case "music":
            return <MusicWrap {...props} />
        default:
            return <div>Type is not correct</div>

    }
}

interface Props {
    getCurrentIndex?: (index: number) => void;
    constructors: ConstructorType[]
}



const ConstructorPage: FC<Props> = ({getCurrentIndex, constructors}) => {
    let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)
    let dispatch = useAppDispatch()
    
    let lastIndex = constructors.length - 1


    return <ConstructorWrapStyle>
        
        {constructors.map((item, index) => {
            return <Delimeter isPreview={isPreview} key={item.id} index={index} getCurrentIndex={getCurrentIndex}>
                <ButtonWrapStyle>
                    <ListButton isPreview={isPreview} index={index} item={item} lastIndex={lastIndex} getCurrentButton={getCurrentButton} />
                </ButtonWrapStyle>
                {ChooseConstructor(item, index)}
            </Delimeter>
        })}
    </ConstructorWrapStyle>


    function getCurrentButton(value: ListButtonsType, item: ConstructorType, i: number) {

        //delete item
        if (value === 4) {
            dispatch(deleteConstructorThunk(i))
            return
        }

        if (value === 1) {
            dispatch(deleteConstructorThunk(i))
            dispatch(addConstructorThunk({ index: i + 1, item }))
            return
        }

        if (value === 2) {
            dispatch(deleteConstructorThunk(i))
            dispatch(addConstructorThunk({ index: i - 1, item }))
            return
        }
        if (value === 3) {
            dispatch(setCopy(item))
            return
        }
    }

   
}



export default ConstructorPage