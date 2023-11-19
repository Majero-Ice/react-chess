import { ChangeEvent, useState } from "react"


export const useInput = (initialValue:string) =>{
    const [value,setValue] = useState(initialValue)

    const changeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setValue(e.currentTarget.value)

    }

    return {
        value,
        changeHandler
    }
} 