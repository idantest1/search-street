import React, { useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("free");
  const [results, setResults] = useState([]);

  const search = async () => {
    let queryBody;
    switch (searchType) {
      case "exact":
        queryBody = { query: { match_phrase: { "*": query } } };
        break;
      case "full":
        queryBody = { query: { match: { "*": query } } };
        break;
      default:
        queryBody = { query: { match: { name: query } } };
    }

    const response = await axios.post("http://localhost:9200/streets/_search", queryBody);
    setResults(response.data.hits.hits);
  };

  const deleteResult = (id) => {
    setResults(results.filter((res) => res._id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">חיפוש רחובות</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full"
      />
      <div className="flex gap-4 my-2">
        <label><input type="radio" name="searchType" value="free" checked={searchType === "free"} onChange={() => setSearchType("free")} /> חיפוש חופשי</label>
        <label><input type="radio" name="searchType" value="exact" checked={searchType === "exact"} onChange={() => setSearchType("exact")} /> חיפוש מדויק</label>
        <label><input type="radio" name="searchType" value="full" checked={searchType === "full"} onChange={() => setSearchType("full")} /> חיפוש מלא</label>
      </div>
      <button onClick={search} className="bg-blue-500 text-white px-4 py-2">חפש</button>
      <ul className="mt-4">
        {results.map((res) => (
          <li key={res._id} className="border p-2 flex justify-between">
            <span>{res._source.name}</span>
            <button onClick={() => deleteResult(res._id)} className="bg-red-500 text-white px-2 py-1">מחק</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
