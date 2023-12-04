// pages/[countryCode].js
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Header from "@/_components/Header";
import { useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const data = require("../../data.json");
  return {
    props: {
      allCountries: data,
    },
  };
}

function CountryDetail({ allCountries }) {
  const [lightMode, setLightMode] = useState(true);
  const router = useRouter();
  const { countryCode } = router.query;

  // Find the country based on countryCode
  const country = allCountries.find((c) => c.alpha3Code === countryCode);

  if (!country) {
    // Country not found, handle accordingly (e.g., show an error message)
    return <div>Country not found</div>;
  }

  return (
    <div className="fixed z-10 w-full items-center justify-between">
      <Header lightMode={lightMode} setLightMode={setLightMode} />
      <div
        className={`h-screen w-full justify-between ${
          lightMode ? "bg-gray-100 text-black" : "bg-slate-700 text-white"
        } sm:px-[60px] px-[20px] pb-6 pt-8`}
      >
        <Link href="/">
          <div
            className={`flex w-fit items-center cursor-pointer animate-bounce px-4 sm:py-1 rounded shadow-lg h-fit ${
              lightMode ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 512"
              id="left-arrow"
              fill={`${lightMode ? "#000000" : "#FFFFFF"}`}
            >
              <path d="M189.8 349.7c3.1-3.1 3-8 0-11.3L123.4 264H408c4.4 0 8-3.6 8-8s-3.6-8-8-8H123.4l66.3-74.4c2.9-3.4 3.2-8.1.1-11.2-3.1-3.1-8.5-3.3-11.4-.1 0 0-79.2 87-80 88S96 253.1 96 256s1.6 4.9 2.4 5.7 80 88 80 88c1.5 1.5 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3z"></path>
            </svg>
            <span className="px-2">Back</span>
          </div>
        </Link>

        <div className="sm:flex sm:mt-12 mt-6">
          <img
            className="aspect-[271/177] h-[300px]"
            src={country.flags.svg}
            alt="Flag"
          />
          <div className="sm:ml-12">
            <div className="sm:grid grid-cols-2 gap-x-12 sm:mt-0 mt-6 h-fit">
              <div>
                <h2 className="text-2xl font-bold">{country.name}</h2>
                <div className="text-sm mt-2">
                  <p className="py-2">
                    {" "}
                    <span className="font-medium">Native Name: </span>
                    {country.nativeName}{" "}
                  </p>
                  <p className="pb-2">
                    {" "}
                    <span className="font-medium">Population: </span>
                    {country.population}{" "}
                  </p>
                  <p className="pb-2">
                    {" "}
                    <span className="font-medium">Region: </span>
                    {country.region}{" "}
                  </p>
                  <p className="pb-2">
                    {" "}
                    <span className="font-medium">Sub Region: </span>
                    {country.subregion}{" "}
                  </p>
                  <p className="pb-2">
                    {" "}
                    <span className="font-medium">Capital: </span>
                    {country.capital}{" "}
                  </p>
                </div>
              </div>
              <div className="text-sm sm:mt-9 mt-6">
                <p className="py-2">
                  {" "}
                  <span className="font-medium">Top Level Domain: </span>
                  {country.topLevelDomain}{" "}
                </p>
                <p className="pb-2">
                  {" "}
                  <span className="font-medium">Currencies: </span>
                  {country.currencies.map((c) => {
                    return c.code + " " + c.name + " " + c.symbol;
                  })}{" "}
                </p>
                <p className="pb-2">
                  {" "}
                  <span className="font-medium">Languages: </span>
                  {country.languages.map((l, i) => {
                    return (
                      <span key={i} className="px-1">
                        {l.name}
                      </span>
                    );
                  })}{" "}
                </p>
              </div>
            </div>
            <div className="sm:mt-14 mt-4">
              <p className="items-center">
                {" "}
                <span className="font-medium">Border Countries:</span>{" "}
                <div className=" sm:flex grid grid-cols-3">
                  {country.borders?.map((b, i) => {
                    return (
                      <span
                        key={i}
                        className={`mx-1 py-1 px-6 ${
                          lightMode
                            ? "bg-white text-black"
                            : "bg-slate-600 text-white"
                        } border-2 rounded-[5px] text-sm`}
                      >
                        {b}
                      </span>
                    );
                  })}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
