
import { useEffect, useReducer } from "react";
import { getData as getDataOpenWeather } from "../api/open-weather/services";
import { getData as getDataLocal } from "../api/local/services";



const initialState = {
    data: null,
    loading: true,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { ...state, data: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, data: null, loading: false, error: action.payload };
        case "FETCH_LOADING":
            return { ...state, loading: true, error: null };
        default:
            return state;
    }
};

const typeService = async (endpoint, type ) =>{
    switch (type) {
        case "OPEN_WEATHER":
            return await getDataOpenWeather(endpoint);
        case "LOCAL":
            return await getDataLocal(endpoint);
        default:
            return await getDataLocal(endpoint);
    }
}


const useServices = (endpoint, type) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({ type: "FETCH_LOADING" });
        try {
            const  response = await typeService(endpoint, type);
           
            dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
    };

    useEffect(() => {
        if (endpoint) {
            fetchData();
        }
    }, [endpoint]);
    const { loading, data, error } = state;
    return { loading, data, error };
};

export default useServices;