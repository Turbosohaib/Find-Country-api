import axios from "axios";
import { useState, useEffect } from "react";

export default function Country({ lightMode, allCountries, setCountries }) {
  const [countryName, setCountryName] = useState("");

  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      const country = allCountries.filter(
        (country) => countryName == country.name
      );
      console.log(country);
      setCountries(country);
    }
  };

  const handleMobileSubmit = async () => {
    const country = allCountries.filter(
      (country) => countryName == country.name
    );
    console.log(country);
    setCountries(country);
  };

  return (
    <div className="relative sm:w-[40%]">
      <svg
        onClick={handleMobileSubmit}
        className="absolute left-8 top-7 transform -translate-y-1/2 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0 0 50 50"
        fill={`${lightMode ? "#000000" : "#FFFFFF"}`}
      >
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
      </svg>
      <input
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        onKeyDown={handleSubmit}
        className={`w-full px-20 py-4 ${
          lightMode
            ? "bg-white text-black"
            : "bg-slate-600 text-white placeholder:text-white"
        } rounded shadow-lg items-center`}
        placeholder="Search for a country..."
      />
    </div>
  );
}
