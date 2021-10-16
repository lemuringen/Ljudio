import React, {createContext, useState} from 'react'

// export reference to connect with this context
export const PlaylistContext = createContext()

function PlaylistContextProvider(props) {
    const [context, setContext] = useState({
        /*expexted structure for playlists elements:
        {
        name: "name"
        songIds: []
        }

         */
        playlists: [
            {}
        ], //"songs", "artists"
        list: []
    })

    // use spread to keep old data and only
    // replace the once who match
    function updateContext(values) {
        setContext({
            ...context,
            ...values
        })
    }

    return (
        <PlaylistContext.Provider value={[context, updateContext]}>
            {props.children}
        </PlaylistContext.Provider>
    )
}

export default SearchContextProvider