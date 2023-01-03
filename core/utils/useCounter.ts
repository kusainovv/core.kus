import { Dispatch, SetStateAction, useState } from "react"

interface CounterOutputData {
    count: number,
    increment: () => void,
    decrement: () => void,
    reset: () => void,
    setCount: Dispatch<SetStateAction<number>>
}

/**
 * 
 * @param initialValue the default value for counter
 * @returns counter config
 */
export const useCounter = (initialValue?: number) : CounterOutputData => {
    const [count, setCount] = useState(initialValue || 0);

    const increment = () => setCount(cnt => cnt + 1)
    const decrement = () => setCount(cnt => cnt - 1)
    const reset = () => setCount(initialValue || 0)
  
    return {
      count,
      increment,
      decrement,
      reset,
      setCount,
    }

}