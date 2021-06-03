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


const ConstructorWrap = () => {
    let constructor = useAppSelector(state => state.ConstructorReducer.constructor)
    let copy = useAppSelector(state => state.ConstructorReducer.copy)
    let history = useHistory();
    let dispatch = useAppDispatch()
    const [isShowPreview, setIsShowPreview] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [indexLocal, setIndex] = useState(0);


    return <div>
        {constructor.length === 0 && <ConstructorButtonStyle>
            <Button onClick={() => setIsModalVisible(true)} type="primary">Add Constructor</Button>
        </ConstructorButtonStyle>}
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