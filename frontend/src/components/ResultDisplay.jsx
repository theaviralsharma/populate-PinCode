import "./ResultDisplay.css"; // Import CSS file

const ResultDisplay = ({ locationData }) => {
  return (
    <div className="result-card">
      <h2>Location Details</h2>
      <p><strong>City:</strong> {locationData.city}</p>
      <p><strong>State:</strong> {locationData.state}</p>
      <p><strong>Country:</strong> {locationData.country}</p>
    </div>
  );
};

export default ResultDisplay;