import React, { FC } from 'react';
import styled from 'styled-components';
import {
  DownOutlined,
  UpOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { ConstructorType } from '../../../Redux/reducers/Constructor/ConstructorReducer';



const WrapButton = styled.div`
   position: relative;
   background-color: #fff;
   z-index: 100;
`

const RightBlock = styled.div`
  display: inline-flex;
  padding: 6px;
  border-radius: 5px;
  box-shadow: inset -1px 3px 8px 5px #1f87ff00, 2px 5px 16px 0px #0b325e80, -2px 3px 5px -2px rgb(0 0 0 / 12%);

  & > div {
    background-color: #ffff;
    background-color: #78909c;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
  
  & > div:not(:last-child) {
    margin-right: 8px;
  } 

`

const LeftBlock = styled.div`
background-color: #ffff;
display: inline-block;
margin-right: 10px;
padding: 6px;
border-radius: 5px;
box-shadow: inset -1px 3px 8px 5px #1f87ff00, 2px 5px 16px 0px #0b325e80, -2px 3px 5px -2px rgb(0 0 0 / 12%);

  & > div {
    background-color: #3498db;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
  

`

const DownOutlinedStyle = styled(DownOutlined)`
  color: #fff;
`

const UpOutlinedStyle = styled(UpOutlined)`
  color: #fff;
`

const CopyOutlinedStyle = styled(CopyOutlined)`
  color: #fff;
`

const DeleteOutlinedStyle = styled(DeleteOutlined)`
  color: #fff;
`




export type ListButtonsType = 0 | 1 | 2 | 3 | 4

interface Props {
  getCurrentButton: (current: ListButtonsType, item: ConstructorType, i: number ) => void
  ImgComponent?: React.ReactNode
  index: number
  lastIndex: number
  item: ConstructorType
  isPreview?: boolean
}


const ListButton: FC<Props> = ({getCurrentButton,  ImgComponent, index, lastIndex, item, isPreview }) => {
  console.log(isPreview)
  if(isPreview) {
    return <div></div>
  }
  return <WrapButton>
    {ImgComponent && <LeftBlock>
      <div onClick={() => getCurrentButton(0, item, index)}>
       {ImgComponent}
      </div>
    </LeftBlock>}
    <RightBlock>
      {index !== lastIndex && <div onClick={() => getCurrentButton(1, item, index)}>
        <DownOutlinedStyle  />
      </div>}
      {index !== 0 && <div onClick={() => getCurrentButton(2, item, index)}>
        <UpOutlinedStyle />
      </div>}
      <div onClick={() => getCurrentButton(3, item, index)}>
        <CopyOutlinedStyle />
      </div>
      <div onClick={() => getCurrentButton(4, item, index)}>
        <DeleteOutlinedStyle />
      </div>
    </RightBlock>
  </WrapButton>
}

export default ListButton