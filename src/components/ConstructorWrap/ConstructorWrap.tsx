import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from './../../Types/Tipes';
import ModalConstructor from './СonstructorPage/ModalConstructor/ModalConstructor';
import Preview from './СonstructorPage/Preview/Preview';
import ConstructorPage from './СonstructorPage/ConstructorPage';
import { setPreview } from '../../Redux/reducers/Constructor/ConstructorReducer';



const ConstructorButtonStyle = styled.div`
width: 100%;
text-align: center;
padding: 40px 0;
`



const ButtonStyle = styled(Button)`
 background-color: green;
 border: 1px solid green;
 
 
`

const PreviewTextStyle = styled.div`
padding: 12px;
   > p {
       margin: 0;
   }
 
 
`


const ConstructorWrap = () => {
    let constructor = useAppSelector(state => state.ConstructorReducer.constructor)
    let copy = useAppSelector(state => state.ConstructorReducer.copy)
    let history = useHistory();
    let dispatch = useAppDispatch()
    const [isShowPreview, setIsShowPreview] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [indexLocal, setIndex] = useState(0);


    return <div>

        {constructor.length === 0 && <PreviewTextStyle>
            <p>Ваше вниманию  предоставляется Конструктор, который реализует создание определенного шаблона страницы для нужд клиента!</p>
            <p>Есть несколько блоков из которых и будет состоять наш шаблон.(такие как слайдер, заголовок, музыка, видео, документ, фото и текст)</p>
            <p>Их можно будет выбрать в PopUp. Так же при копирования определенного блока он будет появлятся в этом же PopUP, который
            можно  вставить на любой позиции.</p>
            <p> Блоки можно копировать, перемещать, удалять, добавлять на любую позицию.
            Реализована Drag and Drop для вставки фото и видео. Так же есть предпросмотр. Весь проект типизирован(Typescript) и реализован на фронте.</p>
            <br />
            <p>Какие инструменты я использовал для этого проекта:</p>
            <p>Webpack, CreateReactApp, React, StyledComponent, ReduxToolKit, Ant design, react-multi-carousel, video-react,
react-h5-audio-player, typescript.</p>
            <p>Теперь нажимаем кнопку 'ADD CONSTRUCTOR' и смотрим)))</p>


        </PreviewTextStyle>}

        {constructor.length === 0 && <ConstructorButtonStyle>
            <Button onClick={() => setIsModalVisible(true)} type="primary">Add Constructor</Button>
        </ConstructorButtonStyle>}

        {constructor.length === 0 && <PreviewTextStyle>

            <p>Now we can see Constructor which creates a specific type of template</p>
            <p>This one consists of several blocks(such as slider,  title,  text, music,  document, video, photo)</p>
            <p>these blocks can be select  in the pop up
            also when copying a certain block it will appear in this pop up.
             Its will be remove move and add to any position. </p>
            <p>the constructor has a preview, drag and drop.
            the whole project is typed on the client side what tools i used for this project</p>

            <p>What is tools i'm use:</p>
            <p>Webpack, CreateReactApp, React, StyledComponent, ReduxToolKit, Ant design, react-multi-carousel, video-react,
            react-h5-audio-player, typescript.</p>
            <p>Now press the button above 'ADD CONSTRUCTOR'</p>


        </PreviewTextStyle>}



        <ModalConstructor copy={copy} index={indexLocal} isModalVisible={isModalVisible} setModalVisible={setIsModalVisible} />

        <ConstructorPage constructors={constructor} getCurrentIndex={getCurrentIndex} />

        {constructor.length !== 0 && <>

            <Preview isShow={isShowPreview} />
            <ConstructorButtonStyle>
                <ButtonStyle size="large" onClick={() => {
                    alert("Constructor Create successfully")
                    history.push("/constructor/create")
                    dispatch(setPreview(true))
                    setIsShowPreview(true)
                }} type="primary" >Save layout</ButtonStyle>
            </ConstructorButtonStyle>
        </>}
    </div>

    function getCurrentIndex(index: number) {
        setIndex(index)
        setIsModalVisible(true)
    }
}

export default ConstructorWrap