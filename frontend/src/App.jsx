import { useState } from "react";
import PincodeForm from "./components/PincodeForm";
import ResultDisplay from "./components/ResultDisplay";
import "./App.css";

function App() {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="container">
      <div className="card">
        <h2>Search Pincode</h2>
        <PincodeForm setLocationData={setLocationData} setError={setError} />
        {error && <p className="error-message">{error}</p>}
        {locationData && <ResultDisplay locationData={locationData} />}
      </div>
    </div>
  );
}

export default App;