import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './../Redux/redux'

export const getUniqueKey = () => Math.random().toString(36).substr(2, 9)

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export function GetUploadFile(getFile: (e: HTMLInputElement) => void) {
    let input = document.createElement('input')
    input.type = 'file'
    input.click()
    input.addEventListener('change', (e) => {
      let current = e.currentTarget as HTMLInputElement
      getFile(current)  
      current.remove()
      
    })
} 






