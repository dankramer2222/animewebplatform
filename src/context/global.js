import React, { createContext, useContext, useReducer } from "react";
import Popular from "../Components/Popular";


const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {

const baseUrl = "https://api.jikan.moe/v4"

//reducer
const reducer = (state,action) =>{
    return state;
}

const intialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
}

const [state, dispatch] = useReducer(reducer,intialState);


//fetch popular anime 
const getPopularAnime = async () => {
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    console.log(data.data);
}

//initial Render
    React.useEffect(()=>{
        getPopularAnime();
    },[])

return (
    <GlobalContext.Provider value ={{
        ...state,
    }}>
        {children}
    </GlobalContext.Provider>
       )
}


export const useGlobalContext =()=>{
    return useContext(GlobalContext);   
}