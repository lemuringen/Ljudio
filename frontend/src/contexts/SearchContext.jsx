import React, {createContext, useState} from 'react'

// export reference to connect with this context
export const SearchContext = createContext()

function SearchContextProvider(props) {
    const [context, setContext] = useState({
        type: null, //"songs", "artists"
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
        <SearchContext.Provider value={[context, updateContext]}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider