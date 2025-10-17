import { useState } from "react";
import { getData } from "../api/local/services";

function DrawerSearchPlaces({ showDrawer, setShowDrawer, setCordinates }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); 

  const fetchData = async () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setError(null);
    setData([]);
    setHasSearched(true); 

    try {
      const response = await getData("/cities.json");
      const filtered = response.data.filter((city) =>
        city.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData(filtered);
      setSearchValue("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (city)=>{
    setCordinates({latitude:city.lat, longitude:city.lon});
    setShowDrawer(false); 
  };

  return (
    <div
      className={`absolute h-full justify-center items-center z-20 bg-gray-200 dark:bg-[#1E213A] w-full ${
        showDrawer ? "translate-x-auto" : "-translate-x-full"
      } transition-all duration-300`}
    >
      <button
        onClick={() => setShowDrawer(false)}
        type="button"
        className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200/40 hover:text-gray-900 
          rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center 
          dark:hover:bg-gray-600/40 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      <div className="mt-12">
        <div className="flex justify-around">
          <div className="flex items-center w-[60%] max-w-[268px] h-9 bg-transparent border border-[#E7E7EB] font-medium text-base text-[#616475]">
            <img
              alt="Search Icon"
              loading="lazy"
              src="weatherapp/search.svg"
              className="w-6 h-6 mx-2"
            />
            <input
              className="bg-transparent outline-none w-[70%] h-9 pr-1 text-white/40 placeholder:text-white/50 text-[15px]"
              placeholder="search location"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <button
            onClick={fetchData}
            disabled={!searchValue.trim() || loading}
            className={`w-20 h-9 text-[15px] font-semibold  transition-all duration-250 ${
              !searchValue.trim() || loading
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-[#3C47E9] text-[#E7E7EB] hover:text-[#def341] cursor-pointer"
            }`}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        <ul className="flex flex-col items-center w-full h-fit pb-5">
          {loading && <div className="text-center mt-10">Loading...</div>}

          {error && (
            <div className="text-center mt-10 text-red-500">
              Error loading data.
            </div>
          )}

          {data.length > 0 ? (
            data.map((city, index) => (
              <li
                key={index}
                onClick={() => {handleSelectCity(city)}}
                className="flex justify-between w-[70%] max-w-367px h-14 pl-2 text-base font-medium cursor-pointer text-[#E7E7EB] hover:border border-[#616475] mt-6 hover:after:bg-arrow-bg hover:after:bg-contain hover:after:bg-no-repeat hover:after:p-2 hover:after:mt-5 hover:after:mr-5"
              >
                <p className="flex items-center text-ms ml-2">
                  {city.name}, &nbsp;&nbsp;&nbsp; {city.country_code}
                </p>
              </li>
            ))
          ) : (
            hasSearched && !loading && !error && (
              <li className="text-[#E7E7EB] mt-6">No results found</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default DrawerSearchPlaces;
