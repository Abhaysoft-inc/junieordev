"use client"
import React, { useState, useEffect } from "react";

function SearchPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/ai") // Fetch API
            .then((response) => response.json()) // First parse
            .then((json) => {
                try {
                    const parsedResult = JSON.parse(json.result); // Second parse
                    setData(parsedResult); // Store the actual JSON
                }
                catch (err) {
                    console.log(err)
                }
            })
            .catch((error) => setError(error));
    }, []);

    return (
        <div>
            <h1>Search Page</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : data ? (
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.content}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SearchPage;
