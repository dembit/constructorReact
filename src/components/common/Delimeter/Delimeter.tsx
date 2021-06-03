import React, { FC } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const DelimeterStyle = styled.div`
   position: relative;

`

const TopDelimeterStyle = styled.div`
   width: 100%;
   position: absolute;
   margin: 0;
   top: -30px;
   z-index: 1;
`

const BottomDelimeterStyle = styled.div`
   width: 100%;
   position: absolute;
   z-index: 1;
   margin: 0;
   bottom: -30px;
`
const PlusOutlinedWrap = styled(PlusOutlined)`
  padding: 5px;
  border-radius: 18px;
  background-color: #78909b;
  color: #fff;
  cursor: pointer;
   &:hover {
      opacity: 0.8;
  }
  
`

interface Props {
   index: number
   getCurrentIndex?: (index: number) => void
   isPreview?: boolean
}

const Delimeter: FC<Props> = ({ children, index, getCurrentIndex, isPreview }) => {
    if(isPreview) {
        return <div>
            {children}
        </div>
    }

    return <DelimeterStyle>
                {index === 0 && getCurrentIndex && <TopDelimeterStyle>
                    <Divider orientation="center">
                        <PlusOutlinedWrap onClick={() => getCurrentIndex(index)} />
                    </Divider>
                </TopDelimeterStyle>}
                {children}
                <BottomDelimeterStyle>
                {getCurrentIndex && <Divider orientation="center">
                        <PlusOutlinedWrap onClick={() => getCurrentIndex(index + 1)} />
                    </Divider>}
                </BottomDelimeterStyle>
    </DelimeterStyle>

}


export default Delimeter