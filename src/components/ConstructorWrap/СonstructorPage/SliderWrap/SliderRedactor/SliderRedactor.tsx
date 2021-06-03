
import React, { FC } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import InputComponent from '../../../../common/InputComponent/InputComponent';
import { setSliderText } from '../../../../../Redux/reducers/Constructor/ConstructorReducer';
import { useAppDispatch, useAppSelector } from '../../../../../Types/Tipes';





const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,

    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,

    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,

    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};



const CarouselStyle = styled(Carousel)`
`

const SliderStyle = styled.div`
  position: relative;

`
const SliderEmptyStyle = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 24px;

`

const SliderInputStyle = styled.div`
  position: absolute;
  background-color: #444f6085;
  left: 24px;
  bottom: 24px;
  border-radius: 5px;


  & input {
    color: #fff;
  }

`
const CarouselItemStyle = styled.img`
   width: 100%;
    padding: 0 3px;
    position: responsive;
    
`
interface Props {
    index: number
    isPreview?: boolean
}

const SliderRedactor: FC<Props> = ({ index, isPreview }) => {
    let sliderPhoto = useAppSelector(state => state.ConstructorReducer.constructor[index].slider)
    let dispatch = useAppDispatch()

    if (sliderPhoto.length === 0) {
        return <SliderEmptyStyle>
            <span>Slider is empty</span>
        </SliderEmptyStyle>
    }

    return <CarouselStyle responsive={responsive} >
        {sliderPhoto.map((item, indexLocal) => {
            let text = sliderPhoto[indexLocal].text
            return <SliderStyle>
                <SliderInputStyle >
                    <InputComponent isPreview={isPreview} text={text} size="18px" getTitle={(value) => setTitle(value, indexLocal)} inputTitle={{ maxLength: 20 }} />
                </SliderInputStyle>
                <CarouselItemStyle key={indexLocal} src={item.url}></CarouselItemStyle>
            </SliderStyle>
        })}
    </CarouselStyle>

    function setTitle(value: string, indexSlider: number) {
        dispatch(setSliderText({ index, text: value, indexSlider }))
    }

}



export default SliderRedactor