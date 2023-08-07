import { useEffect, useRef } from 'react'


const usePrevState = (state) => {
    console.log('usePrevState: FIRE!')
    
    const ref = useRef()

    useEffect(() => {
        console.log('usePrevState.useEffect: Initiat FIRE!')
        ref.current = state
    })

    return ref.current
}


export default usePrevState