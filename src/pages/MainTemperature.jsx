import { useEffect, useState } from "react";
import Information from "../components/Information";
import Places from "../components/Places";
import useServices from "../hooks/useServices";
import { getDataIpify, getDataIpinfoDetail } from "../api/geolocalisation/services";
import { getUserCoordinates } from "../helpers/utils/geolocalisation";
const initCordinate = {
    longitude: -75.4933,
    latitude: 10.3982
}
function MainTeperature() {
    const [cordinates, setCordinates] = useState({
        latitude: null,
        longitude: null
    });

   
    const fetchCoordinates = async () => {
        try {
            const coords = await getUserCoordinates();
            setCordinates(coords);
        } catch (error) {
            console.error("Error getting coordinates:", error);
            setCordinates(initCordinate);
        } 
    };

    useEffect(() => {
        fetchCoordinates();
    }, []);

    const hasCoordinates = cordinates.latitude !== null && cordinates.longitude !== null;

    const {
        loading: loadingWeather,
        data: dataWeather,
        error: errorWeather,
    } = useServices(
        hasCoordinates ? `/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}` : null,
        "OPEN_WEATHER"
    );

    const {
        loading: loadingForecast,
        data: dataForecast,
        error: errorForecast,
    } = useServices(
        hasCoordinates ? `/forecast?lat=${cordinates.latitude}&lon=${cordinates.longitude}` : null,
        "OPEN_WEATHER"
    );

    // const { loading: loadingWeather, data: dataWeather, error: errorWeather } = useServices('/currentData.json');
    // const { loading: loadingForecast, data: dataForecast, error: errorForecast } = useServices('/5daysData.json');
    const getGeolocalisation = async () => {
        try {
            const respIp = await getDataIpify();
            const ip = respIp.data;
            const respIpinfoDetail = await getDataIpinfoDetail(`/json/${ip}`);
            const ipinfoDetail = respIpinfoDetail.data;
            setCordinates({ latitude: ipinfoDetail.lat, longitude: ipinfoDetail.lon })
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-center min-h-screen bg-gray-100 dark:bg-[#2c3052] w-full">
            <div className="h-[100vh] w-full md:w-[30%] relative ">

                <Places
                    data={dataWeather || {}}
                    getGeolocalisation={getGeolocalisation || {}}
                    setCordinates={setCordinates}
                    loading={loadingWeather}
                    error={errorWeather}
                />

            </div>
            <div className="md:h-[100vh] w-full md:w-[70%]">

                <Information
                    dataWeather={dataWeather || {}}
                    dataForecast={dataForecast || {}}
                    loading={loadingForecast}
                    error={errorForecast}
                />

            </div>
        </div>
    );
}

export default MainTeperature;