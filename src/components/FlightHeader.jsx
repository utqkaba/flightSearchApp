import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";

const FlightHeader = () => {
  const iconStyle = { margin: "0 36px", display: "inline-block", verticalAlign: "middle" };

  return (
    <div className="App">
      <header className="bg-emerald-700 p-4">
        <p className="text-white text-3xl p-2 font-extralight text-center sm:text-center">
          <MdFlightTakeoff style={iconStyle} className="animate-pulse" />
          {/* I left an easter egg to show that the code is mine. There is another one somewhere else, hope you find it.:) */}
          <a href="https://github.com/utqkaba">Flight Search Application</a>
          <MdFlightLand style={iconStyle} className="animate-pulse" />
        </p>
      </header>
    </div>
  );
};

export default FlightHeader;
