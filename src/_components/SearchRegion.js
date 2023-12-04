import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Region({ lightMode, allCountries, setCountries }) {
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutSide, true);
  });

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setDropdown(false);
    }
  };

  const hideOnClickOutSide = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdown(false);
    }
  };

  const handleRegionSelect = async (region) => {
    console.log("Region: ", region);
    const regionalCountries = allCountries.filter((c) => c.region == region);
    setCountries(regionalCountries);
    setDropdown(false);
  };

  return (
    <div className="w-[220px] sm:pt-0 pt-12">
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`flex cursor-pointer items-center justify-between pl-7 py-3.5 rounded shadow-lg ${
          lightMode ? "bg-white text-black" : "bg-slate-600 text-white"
        }`}
      >
        <span className="pr-8">{selectedRegion}</span>
        <svg
          className="animate-bounce mr-4"
          height="25"
          viewBox="0 0 48 48"
          width="23"
          fill={`${lightMode ? "#000000" : "#FFFFFF"}`}
        >
          <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
          <path d="M0-.75h48v48h-48z" fill="none" />
        </svg>
      </div>
      {dropdown ? (
        <div
          className={`dropdown absolute w-[220px]  ${
            lightMode ? "bg-white text-black" : "bg-slate-600 text-white"
          } mt-1 rounded-lg shadow-lg`}
        >
          <ul className="px-6">
            <li
              className="pb-1 pt-4 cursor-pointer"
              onClick={() => handleRegionSelect("Africa")}
            >
              Africa
            </li>
            <li
              className="py-1 cursor-pointer"
              onClick={() => handleRegionSelect("America")}
            >
              America
            </li>
            <li
              className="py-1 cursor-pointer"
              onClick={() => handleRegionSelect("Asia")}
            >
              Asia
            </li>
            <li
              className="py-1 cursor-pointer"
              onClick={() => handleRegionSelect("Europe")}
            >
              Europe
            </li>
            <li
              className="pt-1 pb-4 cursor-pointer"
              onClick={() => handleRegionSelect("Oceania")}
            >
              Oceania
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
