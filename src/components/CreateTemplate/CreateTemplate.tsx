import { useAppSelector } from './../../Types/Tipes';
import React, { FC } from 'react';
import ConstructorPage from '../ConstructorWrap/СonstructorPage/ConstructorPage';
import styled from 'styled-components';

const EmptyWrapStyle = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
`

const ConstructorFooterStyle = styled.footer`
height: 100px;
background-color: #2c3e50;

`

interface Props {

}

const CreateTemplate: FC<Props> = () => {
    let constructor = useAppSelector(state => state.ConstructorReducer.constructor)
    if(constructor.length === 0) {
        return <EmptyWrapStyle>
            <span>
               Constructor is empty
            </span>
        </EmptyWrapStyle>
    }
    return <div>
          <ConstructorPage constructors={constructor}  />
          <ConstructorFooterStyle></ConstructorFooterStyle>
    </div>
}

export default CreateTemplate