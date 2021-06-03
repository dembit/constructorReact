import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux";


let nameReducer = "constructor";

export const setConstructorThunk = createAsyncThunk<
  void,
  SetConstructorType,
  { dispatch: AppDispatch; state: RootState }
>(
  `${nameReducer}/setConstructor`,
  ({ index, constructor }, { getState, dispatch }) => {
    let state = getState();
    let copy = [...state.ConstructorReducer.constructor];
    copy.splice(index, 0, constructor);

    dispatch(setConstructor(copy));
  }
);

export const deleteConstructorThunk = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: RootState }
>(`${nameReducer}/deleteConstructor`, (index, { getState, dispatch }) => {
  let state = getState();
  let copy = [...state.ConstructorReducer.constructor];
  copy.splice(index, 1);
  dispatch(setConstructor(copy));
});

export const addConstructorThunk = createAsyncThunk<
  void,
  {
    index: number;
    item: ConstructorType;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  `${nameReducer}/addConstructor`,
  ({ item, index }, { getState, dispatch }) => {
    let state = getState();
    let copy = [...state.ConstructorReducer.constructor];
    copy.splice(index, 0, item);
    dispatch(setConstructor(copy));
  }
);

export type ConstructorNameType =
  | "slider"
  | "title"
  | "text"
  | "video"
  | "photo"
  | "document"
  | "music"

export interface ConstructorType {
  type: ConstructorNameType;
  text: string;
  title: string;
  shortText: string;
  video: string
  photo: string
  document: string
  id: string
  audio: string
  slider: {url: string, text: string}[]
}

export interface SetConstructorType {
  constructor: ConstructorType;
  index: number;
}

export interface SetVideoType {
  index: number;
  url: string;
}

export interface SetSliderTextType {
  index: number;
  text: string;
  indexSlider: number

}

export interface SetTextType {
  index: number;
  text: string;
}

const initialState = {
  constructor: [] as ConstructorType[],
  copy: undefined as undefined | ConstructorType,
  isPreview: false
};



export const ConstructorReducer = createSlice({
  name: nameReducer,
  initialState,
  reducers: {
    setConstructor: (state, action: PayloadAction<ConstructorType[]>) => {
      let constructor = action.payload;
      state.constructor = constructor;
    },

    setVideo: (state, action: PayloadAction<SetVideoType>) => {
      let {index, url } = action.payload; 
      state.constructor[index].video = url
    },
    setText: (state, action: PayloadAction<SetTextType>) => {
      let {index, text } = action.payload; 
      state.constructor[index].text = text
    },
    setShortText: (state, action: PayloadAction<SetTextType>) => {
      let {index, text } = action.payload; 
      state.constructor[index].shortText = text
    },
    setCopy: (state, action: PayloadAction<ConstructorType>) => {
      let copy = action.payload; 
      state.copy = copy
    },
    setPhoto: (state, action: PayloadAction<SetVideoType>) => {
      let {index, url } = action.payload; 
      state.constructor[index].photo = url
    },
    setDocument: (state, action: PayloadAction<SetVideoType>) => {
      let {index, url } = action.payload; 
      state.constructor[index].document = url
      
    },
    setAudio: (state, action: PayloadAction<SetVideoType>) => {
      let {index, url } = action.payload; 
      state.constructor[index].audio = url
      
    },
    setSliderPhoto: (state, action: PayloadAction<SetVideoType>) => {
      let {index, url } = action.payload; 
      state.constructor[index].slider = [...state.constructor[index].slider, {url, text: ""}]
      
    },
    setSliderText: (state, action: PayloadAction<SetSliderTextType>) => {
      let {index, text, indexSlider } = action.payload; 
      state.constructor[index].slider[indexSlider] = {...state.constructor[index].slider[indexSlider], text}
      
    },
    setPreview: (state, action: PayloadAction<boolean>) => {
      let isPreview = action.payload; 
      state.isPreview = isPreview
      
    },
  },
});

export const { setConstructor, setVideo, setText, setCopy, setPhoto, setDocument, setShortText, setAudio, setSliderPhoto, setSliderText, setPreview} = ConstructorReducer.actions;

export default ConstructorReducer.reducer;
