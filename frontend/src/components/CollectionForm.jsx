import { useState } from "react";
import { useCollectionContext } from "../hooks/useCollectionContext";

const CollectionForm = () => {
  const { dispatch } = useCollectionContext();

  const [full_name, setFull_name] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [ph_number, setPh_number] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collection = { full_name, price, location, ph_number };
    const response = await fetch("/api/details", {
      method: "POST",
      body: JSON.stringify(collection),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setFull_name("");
      setPrice("");
      setLocation("");
      setPh_number("");
      setError(null);
      setEmptyFields([]);
      console.log("New collection added", json);
      dispatch({ type: "CREATE_COLLECTION", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Collection</h3>

      <label>Customer Full Name:</label>
      <input
        type="text"
        onChange={(e) => setFull_name(e.target.value)}
        value={full_name}
        className={emptyFields.includes("full_name") ? "error" : ""}
      />
      <label>Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes("price") ? "error" : ""}
      />
      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes("location") ? "error" : ""}
      />
      <label>Phone Number:</label>
      <input
        type="number"
        onChange={(e) => setPh_number(e.target.value)}
        value={ph_number}
        className={emptyFields.includes("ph_number") ? "error" : ""}
      />
      <button>Add Collection</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default CollectionForm;
