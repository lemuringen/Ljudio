import React, { createContext, useState } from 'react'

// export reference to connect with this context
export const ProgressbarContext = createContext()

function ProgressbarContextProvider(props) {
    const [ context, setContext ] = useState({
        isHandleHeld: null
    })

    /*
      values = {
        currentSong: { videoId: '23546erge3' }
      }
    */
    // use spread to keep old data and only
    // replace the once who match
    function updateContext(values) {
        setContext({
            ...context,
            ...values
        })
    }

    return (
        <ProgressbarContext.Provider value={[context, updateContext]}>
            {props.children}
        </ProgressbarContext.Provider>
    )
}

export default ProgressbarContextProvider
