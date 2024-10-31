import React, { useState, useEffect } from 'react';
import { getFloodData } from '../floodservice';

export default function FloodData() {
  const [floodData, setFloodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFloodData();
      const items = data?.items || [];
      setFloodData(items);
      setFilteredData(items);

      const uniqueLocations = Array.from(
        new Set(items.map((flood) => flood.floodArea?.county).filter(Boolean))
      );
      setLocations(uniqueLocations);
    };

    fetchData();
  }, []);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);

    const filtered = selectedLocation 
      ? floodData.filter((flood) => flood.floodArea?.county === selectedLocation)
      : floodData;
    setFilteredData(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Current Flood Data</h1>
      <select
        value={location}
        onChange={handleLocationChange}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      >
        <option value="">All Locations</option>
        {locations.map((loc, index) => (
          <option key={index} value={loc}>{loc}</option>
        ))}
      </select>

      {filteredData.length > 0 ? (
        filteredData.map((flood, index) => (
          <div key={index} className="border p-2 mb-2 bg-gray-100 rounded">
            <h2 className="font-semibold">{flood.description || "No description available"}</h2>
            <p>Area: {flood.eaAreaName || "Unknown area"}</p>
            <p>County: {flood.floodArea?.county || "No county available"}</p>
            <p>Message: {flood.message || "No message available"}</p>
            <p>Severity: {flood.severity || "No severity available"}</p>
            <p>Last Updated: {flood.timeMessageChanged ? new Date(flood.timeMessageChanged).toLocaleString() : "No update time available"}</p>
          </div>
        ))
      ) : (
        <p>No flood data available for this location.</p>
      )}
    </div>
  );
}
