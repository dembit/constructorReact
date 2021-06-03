import InputComponent from '../../../common/InputComponent/InputComponent';
import React, { FC } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../Types/Tipes';

import { OwnIconWrapStyle } from '../VideoWrap/VideoWrap';
import OwnIcon from '../../../common/OwnIcon/OwnIcon';
import { SoundOutlined } from '@ant-design/icons';
import { setAudio, setText } from '../../../../Redux/reducers/Constructor/ConstructorReducer';

const PlayerWrapStyle = styled.div`
   position: relative;
   width: 40vw;
`

const PlayerTextStyle = styled.div`
   position: absolute;
   left: 20px;
    top: 14px;
 
`

const CustomPlayerStyle = styled(AudioPlayer)`
    background-color: #eaf4fb;
    box-shadow: 0 0 3px 0 rgb(104 162 204);

& .rhap_progress-section {
      justify-content: flex-end;
}

& .rhap_volume-container {
         flex-basis: 0;
}

& .rhap_volume-bar-area {
          display: none;
      }

& .rhap_progress-indicator, & .rhap_progress-filled { 
      background-color: #3498db;
     }
& .rhap_download-progress {
         background-color: #fff;
     }

& .rhap_main-controls-button {
         color: #3498db;
     }
`

const MusicWrapStyle = styled.div`
   
   padding: 40px 0;
   display: flex;
   justify-content: center;
   
`

interface Props {
    index: number;
}
let plh = "Name"
const MusicWrap: FC<Props> = ({ index }) => {
    let dispatch = useAppDispatch()
    let text = useAppSelector(state => state.ConstructorReducer.constructor[index].text)
    let audio = useAppSelector(state => state.ConstructorReducer.constructor[index].audio)
    let isPreview = useAppSelector(state => state.ConstructorReducer.isPreview)
    return <MusicWrapStyle>
        <OwnIconWrapStyle>
            <OwnIcon isPreview={isPreview} index={index} getFile={getFile} imgComponent={<SoundOutlined />} />
        </OwnIconWrapStyle>
        <PlayerWrapStyle>
            <PlayerTextStyle>
                <InputComponent isPreview={isPreview} plh={plh} text={text} size="18px" getTitle={getTitle} inputTitle={{ maxLength: 15 }} />
            </PlayerTextStyle>
            <CustomPlayerStyle
                autoPlay
                src={audio}
                showJumpControls={false}
                layout="stacked"
                customAdditionalControls={[]}
                customProgressBarSection={[RHAP_UI.VOLUME, RHAP_UI.DURATION]}
                customVolumeControls={[]}
                customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.PROGRESS_BAR]}
                

            />
        </PlayerWrapStyle>

    </MusicWrapStyle>

function getUrl(files: FileList) {
    let reg = /audio\//i
    let checkType = files[0].type.match(reg)
    if (!checkType) {
      alert("Music type is wrong.Type must includes 'audio'(Example 'audio/ogg')")
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


    dispatch(setAudio({ index, url }))
    alert("music installed successfully")
  }

    function getTitle(value: string) {
        dispatch(setText({ index, text: value }))
    }
}

export default MusicWrap


