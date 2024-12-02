import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [processedData, setProcessedData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/process-data", {
        data: data,
      });
      setProcessedData(response.data.processed_data);
    } catch (error) {
      console.error("Error processing data:", error);
      setProcessedData("An error occurred while processing the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Data Processing with OpenAI API</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter your data here"
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      <h2>Processed Data:</h2>
      <pre>{processedData}</pre>
    </div>
  );
}

export default App;
