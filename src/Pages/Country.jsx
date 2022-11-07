import React, { useContext, useEffect, useState } from 'react'
import PageHeader from './AdminDashboard/PageHeader'
import { MdCancel } from 'react-icons/md'
import { FaPlusCircle } from 'react-icons/fa'
import { RiSearchFill } from 'react-icons/ri'
import { AdminContext } from './AdminDashboard/AdminSignUp'
import StatusMessage from './AdminDashboard/StatusMessage'
import AddBuildingCards from './AddBuildingCards'
import AddCountryCards from './AddCountryCards'
import AddStatesAndCommodities from './AdminDashboard/AddStatesAndCommodities'

const Country = () => {
  const [countrySelected, setCountrySelected] = useState("");
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountry] = useState({
    countryName: '',
    countryCode: ''
  });
  const [addCountry, setAddCountry] = useState(false);
  const [danger, setDanger] = useState(false);
  const [message, setMessage] = useState("");
  const { adminToken } = useContext(AdminContext);
  const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1/countries"

  const iconStyle = {
    width: '17px',
    height: '17px',
    color: '#929292'
  }



  const getAllCountries = async () => {
    try {
      const response = await fetch(BASE_URL)
      const responseJson = await response.json()
      setAllCountries(responseJson.data)
      console.log(responseJson)
    } catch (error) {
      console.error(error)
    }
  }
  const createNewCountry = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        name: country.countryName,
        code: country.countryCode
      }),
      redirect: 'follow',
    };

    try {
      const response = await fetch(BASE_URL, requestOptions);
      const responseJson = await response.json();
      setMessage("Country Successfully Created");
      setDanger(false);
      setAddCountry(false);
      setCountry({
        countryName: '',
        countryCode: ''
      });
    } catch (error) {
      setMessage(error.message);
      setDanger(true);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, [message]);

  return (
    <div>
      <PageHeader />
      {isCountrySelected ? (
        <AddStatesAndCommodities countrySelected={countrySelected} setIsCountrySelected={setIsCountrySelected} />
      ) : (
        <>
          <section className="pb-10">
            <h1 className="font-bold text-2xl my-[.5em]">Countries</h1>
            <p>
              To add a new Country, click on the add button to create
              more Countries or to add state or Commodity for a country, click
              on the Country
            </p>
          </section>
          <StatusMessage statusMessage={message} danger={danger} />

          <AddCountryCards
            countries={allCountries}
            setCountrySelected={setCountrySelected}
            setIsCountrySelected={setIsCountrySelected}
          />

          {addCountry ? (
            <div className="mt-[3em]">
              <div className="border-2 border-black w-[50%] min-w-[300px] max-w-[700px] w-full rounded-[30px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em] justify-between">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createNewCountry();
                  }}
                  className="flex gap-[1.4em] items-center w-full"
                >

                  <label htmlFor='search-box'>
                    <RiSearchFill style={iconStyle} />
                  </label>
                  <input
                    type='text'
                    id='search-box'
                    value={country.countryName}
                    onChange={e => {
                      setCountry({
                        ...country,
                        countryName: e.target.value
                      })
                    }}
                    className='border-none outline-none w-[100%] bg-transparent flex-2'
                    placeholder='Enter Country Name e.g Canada'
                  />
                  <input
                    type='text'
                    id='search-box'
                    value={country.countryCode}
                    onChange={e => {
                      setCountry({
                        ...country,
                        countryCode: e.target.value
                      })
                    }}
                    className='border-none outline-none w-[100%] bg-transparent '
                    placeholder='Enter Country Code e.g CA'
                  />
                </form>
                {country && <FaPlusCircle onClick={createNewCountry} />}
              </div>
            </div>
          ) : (
            <button
              className="text-[1rem] text-[#fff] p-[1.4em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] self-[end] flex items-center gap-[.4em]"
              onClick={() => setAddCountry(true)}
            >
              <FaPlusCircle />
              Add
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Country



