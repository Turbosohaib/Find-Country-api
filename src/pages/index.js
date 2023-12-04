import { Inter } from "next/font/google";
import Header from "@/_components/Header";
import SearchCountry from "@/_components/SearchCountry";
import SearchRegion from "@/_components/SearchRegion";
import { useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const data = require("../../data.json");
  return {
    props: {
      allCountries: data,
    },
  };
  // } catch (err) {
  //   console.log(err);
  // }
}

export default function Home({ allCountries }) {
  const [lightMode, setLightMode] = useState(true);
  const [countries, setCountries] = useState(allCountries);

  return (
    <>
      <div className="fixed z-10 w-full items-center justify-between">
        <Header lightMode={lightMode} setLightMode={setLightMode} />
        <div
          className={`sm:flex block w-full justify-between ${
            lightMode ? "bg-gray-100 text-black" : "bg-slate-700 text-white"
          } sm:px-[70px] px-[40px] pb-6 pt-8`}
        >
          <SearchCountry
            allCountries={allCountries}
            setCountries={setCountries}
            lightMode={lightMode}
            setLightMode={setLightMode}
          />
          <SearchRegion
            allCountries={allCountries}
            setCountries={setCountries}
            lightMode={lightMode}
            setLightMode={setLightMode}
          />
        </div>
      </div>
      <main
        className={`sm:grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 sm:px-[60px] px-[5px] pb-12 sm:pt-52 pt-80 ${
          lightMode ? "bg-gray-100 text-black" : "bg-slate-700 text-white"
        } items-center justify-between ${inter.className}`}
      >
        {countries.map((country, index) => (
          <Link
            href={`/[countryCode]`}
            as={`/${country.alpha3Code}`}
            key={index}
          >
            <div
              className="cursor-pointer mx-6 my-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
              key={index}
            >
              <img
                className="w-full aspect-[271/177]"
                src={country.flags.svg}
                alt={country.flags.alt}
              />
              <div
                className={`${
                  lightMode ? "bg-white text-black" : "bg-slate-600 text-white"
                } shadow-lg px-6 py-6`}
              >
                <h3 className="text-lg font-bold py-3">
                  {index + 1 + ":"} {country.name}
                </h3>

                <p className="text-sm">
                  <span className="font-medium">Population: </span>
                  {country.population}
                </p>
                <p className="text-sm py-2">
                  <span className="font-medium">Region: </span>
                  {country.region}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Capital: </span>
                  {country.capital}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
