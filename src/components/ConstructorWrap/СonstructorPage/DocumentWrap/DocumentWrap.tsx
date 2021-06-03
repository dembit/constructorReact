import DocumentEditor from './DocumentEditer/DocumentEditer';
import React, { FC } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from "../../../../Types/Tipes"
import { OwnIconWrapStyle } from '../VideoWrap/VideoWrap';
import OwnIcon from '../../../common/OwnIcon/OwnIcon';

import { ConstructorType, setDocument } from '../../../../Redux/reducers/Constructor/ConstructorReducer';
import { FilePdfOutlined } from '@ant-design/icons';

const DocumentWrapStyle = styled.div`
   height: 150px;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
`

const DocumentStyle = styled.a`
    width: "400px";

`

interface Props {
    item: ConstructorType
    index: number
    
}


const DocumentWrap: FC<Props> = ({ item, index }) => {
    let dispatch = useAppDispatch()
    let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)

    return <DocumentWrapStyle>
        <OwnIconWrapStyle>
            <OwnIcon isPreview={isPreview} index={index} getFile={getFile} imgComponent={<FilePdfOutlined />} />
        </OwnIconWrapStyle>
        <DocumentStyle >
            <DocumentEditor index={index}  />
        </DocumentStyle>
        
    </DocumentWrapStyle>

    

    
    
    function getUrl(files: FileList) {
        let reg = /\/pdf/i
        let checkType = files[0].type.match(reg)
        if (!checkType) {
          alert("Document type is wrong.Type must includes '/pdf'(Example 'application/pdf')")
          return
        }
        return URL.createObjectURL(files[0])
      }
    
      function getFile(e: React.ChangeEvent<HTMLInputElement>) {
        let files = e.currentTarget.files
        if (!files) {
          return
        }
        setFile(files)
      }
      
      function setFile(files: FileList) {
        let url = getUrl(files)
        if (!url) {
          return
        }
    
         
         dispatch(setDocument({ index, url }))
         alert("Document installed successfully")
      }

}



export default DocumentWrap