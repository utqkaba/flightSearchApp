import PropTypes from 'prop-types';

const TicketCard = ({ flights }) => {
  return (
    <div className="mx-auto w-3/4 my-4 mt-12 p-4 bg-gray-200 rounded-lg shadow-2xl text-center">
      {flights.length > 0 ? (
        flights.map((flightItem) => (
          <ul key={flightItem.id} className="mx-auto w-5/6 my-4 mb-8 p-4 bg-white rounded-lg shadow-2xl grid grid-cols-5 text-center hover:scale-105 duration-500">
            <li className="grid grid-rows-2">
              <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Havayolu</p>
              <p className="pt-2 font-extralight">{flightItem.airline}</p>
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
              <p className="pt-2 font-extralight">{flightItem.duration}</p>
            </li>
            <li className="grid grid-rows-2">
              <p className="font-semibold pb-2 border-double border-b-2 border-emerald-500">Bilet Fiyatı</p>
              <p className="pt-2 font-extralight">{flightItem.price}₺</p>
            </li>
          </ul>
        ))
      ) : (
        <p className="text-red-500 font-semibold">Üzgünüz, uygun uçuş bulunamadı.</p>
      )}
    </div>
  )
}

TicketCard.propTypes = {
  flight: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      airline: PropTypes.string.isRequired,
      baggage: PropTypes.string.isRequired,
      departureTime: PropTypes.string.isRequired,
      arrivalTime: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TicketCard;
