import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deepfake Detection</h1>
      <form onSubmit={handleSubmit} id="submit_form">
        <input
          id="video_input"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <button id="sumbit_button" type="submit" disabled={loading}>
          {loading ? "Detecting..." : "Detect Deepfake"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
