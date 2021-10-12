import React, { createContext, useState } from 'react'

// export reference to connect with this context
export const PlayerContext = createContext()

function PlayerContextProvider(props) {
    const [ context, setContext ] = useState({
        player: null,
        queue: [],
        currentSong: null
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
        <PlayerContext.Provider value={[context, updateContext]}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
