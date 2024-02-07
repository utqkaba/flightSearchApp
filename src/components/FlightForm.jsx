import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoArrowSwitch, GoArrowRight } from "react-icons/go";

const FlightForm = () => {
  const [isOneway, setIsOneWay] = useState(false);
  const [data, setData] = useState([]);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [searchButton, setSearchButton] = useState(false)
  const [sortBy, setSortBy] = useState('priceIncrease');

  useEffect(() => {
    axios.get('http://localhost:3000/airports')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const searchFlights = () => {
    setSearchButton(true)
    if (isOneway == true) {
      if (departure == '' || arrival == '' || departureDate == '') {
        alert('Lutfen istediginiz ucus bilgilerini girin.')
        setSearchButton(false)
      } else {
        axios.get(`http://localhost:3000/flights?departure=${departure}&destination=${arrival}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`)
          .then(response => {
            if (response.data.length > 0) {
              setFlights(response.data)
              if (isOneway == false) {
                axios.get(`http://localhost:3000/flights?departure=${arrival}&destination=${departure}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`)
                  .then(response => {
                    setFlights(prevFlights => [...prevFlights, ...response.data])
                  })
              }
            } else {
              setFlights([])
            }
          })
          .catch(error => console.error('Error fetching flights:', error));
      }
    } else {
      if (departure == '' || arrival == '' || departureDate == '' || arrivalDate == '') {
        alert('Lutfen istediginiz ucus bilgilerini girin.')
        setSearchButton(false)
      } else {
        axios.get(`http://localhost:3000/flights?departure=${departure}&destination=${arrival}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`)
          .then(response => {
            if (response.data.length > 0) {
              setFlights(response.data)
              if (isOneway == false) {
                axios.get(`http://localhost:3000/flights?departure=${arrival}&destination=${departure}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`)
                  .then(response => {
                    setFlights(prevFlights => [...prevFlights, ...response.data])
                  })
              }
            } else {
              setFlights([])
            }
          })
          .catch(error => console.error('Error fetching flights:', error));
      }
    }

  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'priceIncrease') {
      return a.price - b.price;
    } else if (sortBy === 'priceDecrease') {
      return b.price - a.price;
    } else if (sortBy === 'duration') {
      return a.duration - b.duration;
    } else if (sortBy === 'departureTime') {
      return a.departureTime - b.departureTime;
    }
    return 0;
  });

  return (
    <div className='bg-white p-4'>
      <div className="mx-auto w-1/2 my-8 mb-10 p-8 bg-gray-200 rounded-lg shadow-2xl">
        {/* havalimani part */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <label className="block text-sm font-medium ml-1 text-gray-950">Kalkış Havaalanı</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Kalkış Havaalanı"
              list="departureAirports"
              onChange={(e) => setDeparture(e.target.value)}
              value={departure}
            />
            <datalist id="departureAirports">
              {data.map(airportName => (
                <option key={airportName.id} value={airportName.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium ml-1 text-gray-950">Varış Havaalanı</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Varış Havaalanı"
              list="arrivalAirports"
              onChange={(e) => setArrival(e.target.value)}
              value={arrival}
            />
            <datalist id="arrivalAirports">
              {data.map(airportName => (
                <option key={airportName.id} value={airportName.name} />
              ))}
            </datalist>
          </div>
        </div>
        {/* tarih part */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <label className="block text-sm font-medium ml-1 text-gray-950 ">Gidiş Tarihi</label>
            <input
              type="date"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setDepartureDate(e.target.value)}
              value={departureDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium ml-1 text-gray-950">Dönüş Tarihi</label>
            <input
              type="date"
              className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${isOneway ? 'bg-gray-200 cursor-not-allowed' : ''}`}
              disabled={isOneway}
              onChange={(e) => setArrivalDate(e.target.value)}
              value={arrivalDate}
            />
          </div>
        </div>
        {/* tek yon toggle part */}
        <div className="flex items-center justify-center mb-4 mx-auto">
          <input
            type="checkbox"
            className="mr-2"
            checked={isOneway}
            onChange={() => setIsOneWay(!isOneway)}
          />
          <label className="text-sm font-medium text-gray-950">
            Tek Yön
          </label>
        </div>
        {/* arama buton part */}
        <button onClick={searchFlights} className="bg-emerald-700 text-white w-2/5 py-2 px-4 rounded-md hover:bg-emerald-900 hover:scale-110 duration-500 mx-auto block">
          Bilet Bul
        </button>
      </div>
      {/* destination to arrival part */}
      {departure && arrival && (!isOneway ? (
        <div className="grid grid-cols-5 mx-auto w-2/5 my-2 p-4 px-8 bg-gray-200 rounded-lg shadow-2xl text-center">
          <p className="font-bold col-span-2 p-2"> {departure} </p>
          <div className="flex items-center justify-center">
            <GoArrowSwitch size={28} color='green' />
          </div>
          <p className="font-bold col-span-2 p-2"> {arrival} </p>
        </div>
      ) : (
        <div className="grid grid-cols-5 mx-auto w-2/5 my-2 p-4 px-8 bg-gray-200 rounded-lg shadow-2xl text-center">
          <p className="font-bold col-span-2 p-2"> {departure} </p>
          <div className="flex items-center justify-center">
            <GoArrowRight size={28} color='green' />
          </div>
          <p className="font-bold col-span-2 p-2"> {arrival} </p>
        </div>
      ))}
      {/* ucus bilgileri */}
      {flights.length > 0 ? (
        <div className="mx-auto w-3/4 my-4 mt-12 p-4 bg-gray-200 rounded-lg shadow-2xl text-center">
          <div className="my-2 mb-6 grid grid-cols-2">
            <label className="p-2"> <strong>Bulunan Uçuş Sayısı:</strong> {flights.length} </label>
            <section>
              <label htmlFor="sortBy"> <strong>Sırala:</strong> </label>
              <select
                id="sortBy"
                className="border border-emerald-700 rounded-lg shadow-2xl py-1 pl-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priceIncrease">Fiyata Göre Artan</option>
                <option value="priceDecrease">Fiyata Göre Azalan</option>
                <option value="duration">Uçuş Süresine Göre</option>
                <option value="departureTime">Kalkış Saatine Göre</option>
              </select>
            </section>
          </div>
          {sortedFlights.map((flightItem) => (
            <ul key={flightItem.id} className="mx-auto w-5/6 my-4 mb-8 p-4 bg-white rounded-lg shadow-2xl grid grid-cols-6 text-center hover:scale-105 duration-500">
              <li className="grid grid-rows-2">
                <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Havayolu</p>
                <p className="pt-2 font-extralight">{flightItem.airline}</p>
              </li>
              <li className="grid grid-rows-2">
                <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Uçuş</p>
                <p className="pt-2 font-extralight">{flightItem.departureCode} <strong>{">"}</strong> {flightItem.destinationCode}</p>
              </li>
              <li className="grid grid-rows-2">
                <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Bagaj Hakki</p>
                <p className="pt-2 font-extralight">{flightItem.baggage}</p>
              </li>
              <li className="grid grid-rows-2">
                <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Kalkış - Varış</p>
                <p className="pt-2 font-extralight">{flightItem.departureTime} - {flightItem.arrivalTime}</p>
              </li>
              <li className="grid grid-rows-2">
                <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Uçuş Süresi</p>
                <p className="pt-2 font-extralight">{flightItem.duration} saat</p>
              </li>
              <li className="grid grid-rows-2">
                <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Bilet Fiyatı</p>
                <p className="pt-2 font-extralight">{flightItem.price}₺</p>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <>
          {searchButton > 0 && (
            <div className="mx-auto w-3/4 my-4 mt-12 p-4 bg-gray-200 rounded-lg shadow-2xl text-center">
              <p className="text-red-500 font-semibold">Üzgünüz, uygun uçuş bulunamadı.</p>
            </div>
          )}
        </>
      )}
    </div >
  );
};

export default FlightForm;