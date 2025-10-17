import { useState } from "react";
import DrawerSearchPlaces from "./DrawerSearchPlaces";
import { useTemperatureUnit } from "../contexts/TemperatureUnitContext";
import { celsiusToFahrenheit, formattedDate } from "../helpers/utils/conversions";

function Places({ data, getGeolocalisation, setCordinates, loading, error }) {
    const { unit } = useTemperatureUnit();
    const [showDrawer, setShowDrawer] = useState(false);

    if (!data || !data.main || !data.weather) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-[#1E213A]">
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error loading data.</div>
                ) : (
                    <div className="text-center text-gray-400">No data available</div>
                )}
            </div>
        );
    }

    const temp = unit === 'C' ? Math.round(data.main.temp) : celsiusToFahrenheit(data.main.temp);
    const dateLabel = formattedDate(data.dt);

    return (
        <div className="relative h-full">
            <DrawerSearchPlaces showDrawer={showDrawer} setShowDrawer={setShowDrawer} setCordinates={setCordinates} />
            <div className="h-full bg-gray-200 dark:bg-[#1E213A]">
                <div className="flex justify-around pt-6 items-end">
                    <div className="cursor-pointer bg-gray-400/40 dark:bg-gray-100/40 w-44 h-9 flex justify-center items-center" onClick={() => setShowDrawer(true)}>
                        <span className="text-[16px]">Search for Places</span>
                    </div>
                    <div className="bg-gray-400/30 dark:bg-gray-100/20 p-2 rounded-full">
                        <img src="weatherapp/location.svg" alt="location" className="w-6 h-6 cursor-pointer" onClick={getGeolocalisation} />
                    </div>
                </div>
                <div className="flex justify-center h-[35%] items-center w-full relative overflow-hidden 
                                    after:bg-[url('/weatherapp/others/Cloud-background.png')] 
                                    after:absolute after:w-full after:h-full after:bg-[length:150%_110%] 
                                    after:bg-no-repeat after:opacity-5 after:bg-[bottom_center]">
                    <div className="flex items-center justify-center w-2/5 absolute">
                        {loading && <div className="text-center mt-10">Loading...</div>}
                        {error && <div className="text-center mt-10 text-red-500">Error loading data.</div>}
                        {!loading && !error && <img src={`weatherapp/weather/${data.weather[0].icon}.png`} alt="wheater" className="w-35" />}
                    </div>
                </div>
                {loading && <div className="text-center mt-10">Loading...</div>}
                {error && <div className="text-center mt-10 text-red-500">Error loading data.</div>}
                {!loading && !error && <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center">
                        <h2 className="font-medium text-8xl lg:text-9xl text-[#E7E7EB] my-8">{temp}</h2>
                        <h3 className=" mt-6 text-5xl lg:text-6xl text-[#A09FB1] font-medium">°{unit}</h3>
                    </div>
                    <h2 className=" capitalize pt-6 pb-12 text-2xl lg:text-3xl text-[#A09FB1] font-semibold">{data.weather[0].description}</h2>
                    <p className=" text-xs lg:text-sm text-[#88869D] font-medium mb-4 lg:mb-6">Today &nbsp;&nbsp; . &nbsp;&nbsp; {dateLabel}</p>
                    <pre className="flex items-center gap-2 text-xs lg:text-sm text-[#88869D] h-8 lg:h-10  bottom-0 font-semibold ">
                        <img alt="location on icon" loading="lazy" className="w-5 h-5 mb-2" src="weatherapp/location_on.svg" />
                        {data.name}
                    </pre>
                </div>
                }
                    

                

            </div>
        </div>

    );
}

export default Places;