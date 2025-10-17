import { useTemperatureUnit } from "../contexts/TemperatureUnitContext";
import { celsiusToFahrenheit, formattedDate, mToKm, mToMiles, msToMph } from "../helpers/utils/conversions";

function Information({ dataWeather, dataForecast, loading, error }) {
    const { unit, toggleUnit } = useTemperatureUnit();

    if (!dataWeather || !dataWeather.main || !dataWeather.weather || !dataForecast || !dataForecast.list) {
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
    const wind = unit === 'C' ? dataWeather.wind.speed : msToMph(dataWeather.wind.speed);
    const visibility = unit === 'C' ? mToKm(dataWeather.visibility) : mToMiles(dataWeather.visibility);

    const compareDateWithToday = (dateStr) => {
        const today = new Date();
        const [year, month, day] = dateStr.split("-").map(Number);
        const givenDate = new Date(year, month - 1, day);

        today.setHours(0, 0, 0, 0);
        givenDate.setHours(0, 0, 0, 0);

        const diffInDays = (givenDate - today) / (1000 * 60 * 60 * 24);
        let response = "Today";
        if (diffInDays === 1) response = "Tomorrow";
        if (diffInDays > 1) response = formattedDate(dateStr);
        return response;
    };
    const dataForecastList = Object.values(
        dataForecast.list.reduce((acc, item) => {
            const date = item.dt_txt.split(" ")[0];
            const resp = compareDateWithToday(date)
            if (resp !== "Today") {
                const { temp_min, temp_max } = item.main;

                if (!acc[date]) {
                    acc[date] = {
                        date,
                        temp_min,
                        temp_max,
                        weather: item.weather,
                    };
                } else {
                    acc[date].temp_min = Math.min(acc[date].temp_min, temp_min);
                    acc[date].temp_max = Math.max(acc[date].temp_max, temp_max);
                    acc[date].weather = item.weather;
                }

            }
            return acc;

        }, {})
    );

    return (
        <div className="h-full flex flex-col items-center bg-gray-500 dark:bg-[#100E1D] md:overflow-y-auto">
            <div className="flex flex-col gap-4 md:max-w-lg lg:max-w-2xl md:w-full ">

                {loading && <div className="text-center mt-10">Loading...</div>}
                {error && <div className="text-center mt-10 text-red-500">Error loading data.</div>}
                {!loading && !error && (
                    <>
                        <div className="flex justify-end items-end h-12 gap-5 ">
                            <button className={`cursor-pointer w-10 h-10 pr-1 pt-1 text-center text-xl font-bold ${unit === 'C' ? 'text-[#110E3C]  bg-[#E7E7EB]/90 hover:bg-white' : 'text-[#E7E7EB]  bg-[#585676]/90 hover:bg-[#585676]'} transition-all duration-200 rounded-full`} onClick={toggleUnit}>°C</button>
                            <button className={`cursor-pointer w-10 h-10 pr-1 pt-1 text-center text-xl font-bold ${unit === 'f' ? 'text-[#110E3C]  bg-[#E7E7EB]/90 hover:bg-white' : 'text-[#E7E7EB]  bg-[#585676]/90 hover:bg-[#585676]'} transition-all duration-200 rounded-full`} onClick={toggleUnit}>°F</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full">
                            {dataForecastList.map((item, index) => {
                                const dateLabel = compareDateWithToday(item.date);
                                const tempMin = unit === 'C' ? Math.round(item.temp_min) : celsiusToFahrenheit(item.temp_min);
                                const tempMax = unit === 'C' ? Math.round(item.temp_max) : celsiusToFahrenheit(item.temp_max);
                                return (
                                    <div key={`card-${index}`} className="bg-gray-200 dark:bg-[#1E213A] h-38 w-30 flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium">
                                        <h3 className=" mb-2">{dateLabel}</h3>
                                        <span className="flex items-center justify-center w-14 h-16">
                                            <img alt="condition" loading="lazy" src={`weatherapp/weather/${item.weather[0].icon}.png`} className="w-14 h-16 object-contain" />
                                        </span>
                                        <div className=" flex gap-2 mt-2">
                                            <p>{tempMax}°{unit}</p>
                                            <p className="text-[#A09FB1]">{tempMin}°{unit}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h2 className="h-7 text-[#E7E7EB] text-2xl font-bold my-2  md:text-left">Today`s Hightlights</h2>
                        <div className="w-full flex flex-col items-center md:grid md:grid-cols-2  gap-5 md:gap-6 md:max-w-2xl">
                            <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                                <h2 className="text-medium text-base text-center text-[#E7E7EB]">Wind status</h2>
                                <div className="flex items-end h-20 mb-4">
                                    <h3 className="text-[#E7E7EB] text-5xl lg:text-6xl font-bold">{wind}</h3>
                                    <h4 className="text-[#E7E7EB] text-3xl lg:text-4xl mb-2 ml-1">{unit === 'C' ? 'ms' : 'mph'}</h4>
                                </div>
                                <div className="flex items-center text-[#E7E7EB] text-sm">
                                    <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]">
                                        <img alt="Navigation Icon" loading="lazy" className="w-[18px] h-[18px] rotate-260" src="weatherapp/navigation.svg" />
                                    </span>
                                    WSW
                                </div>
                            </div>
                            <div className="w-full  max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                                <h2 className="text-medium text-base text-center text-[#E7E7EB]">Humidity</h2>
                                <div className="flex items-end h-20 mb-4">
                                    <h3 className=" text-[#E7E7EB] text-5xl lg:text-6xl font-bold">{dataWeather.main.humidity}</h3>
                                    <h4 className="text-[#E7E7EB] text-3xl lg:text-4xl mb-2 ml-1 text-right">%</h4>
                                </div>
                                <div className=" w-[70%] font-bold text-xs flex justify-between text-[#A09FB1]">
                                    <p>0</p>
                                    <p>50</p>
                                    <p>100</p>
                                </div>
                                <div className="flex items-center w-[70%] h-2 bg-[#E7E7EB] rounded-3xl">
                                    <div
                                        className="h-2 bg-[#FFEC65] rounded-3xl transition-all duration-500"
                                        style={{ width: `${dataWeather.main.humidity}%` }}
                                    ></div>
                                </div>
                                <div className="w-[70%] text-right font-bold text-[#A09FB1]">%</div>
                            </div>
                            <div className=" w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] py-4">
                                <h2 className="text-medium text-base text-center text-[#E7E7EB]">Visibility</h2>
                                <div className="flex items-end h-20 mb-4">
                                    <h3 className="text-[#E7E7EB] text-5xl lg:text-6xl font-bold">{visibility}</h3>
                                    <h4 className="text-[#E7E7EB] text-3xl lg:text-4xl mb-2 ml-1">{unit === 'C' ? 'km' : 'miles'}</h4>
                                </div>
                            </div>
                            <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] p-4">
                                <h2 className="text-medium text-base text-center text-[#E7E7EB]">Air Pressure</h2>
                                <div className="flex items-end h-20 mb-4">
                                    <h3 className="text-[#E7E7EB] text-5xl lg:text-6xl font-bold">{dataWeather.main.pressure}</h3>
                                    <h4 className="text-[#E7E7EB] text-3xl lg:text-4xl mb-2 ml-1">mb</h4>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
            <footer className="  py-5 w-full flex flex-row justify-center items-center text-[#A09FB1] ">
                <h4 className=" text-sm font-medium text-center">Created by</h4>
                <h2 className=" font-bold text-sm text-center mx-1">Luis Palacio</h2>
                <h3 className=" font-semibold text-sm text-center">- devChallenges.io</h3>
            </footer>
        </div>
    );
}

export default Information;