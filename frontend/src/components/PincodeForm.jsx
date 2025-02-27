import { useState } from "react";
import "./PincodeForm.css";

const PincodeForm = ({ setLocationData, setError }) => {
  const [pincode, setPincode] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and limit input to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
      setIsValid(value.length === 6);

      // Clear location data if user removes any digit
      if (value.length < 6) {
        setLocationData(null);
        setError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLocationData(null);

    try {
      const response = await fetch(`http://localhost:8000/location/${pincode}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An error occurred. Please try again.");
      }

      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="pincode-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={pincode}
        onChange={handleChange}
        placeholder="Enter 6-digit Pincode"
        maxLength="6"
        pattern="^\d{6}$"
        required
      />
      <button type="submit" disabled={!isValid}>Get Location</button>
    </form>
  );
};

export default PincodeForm;