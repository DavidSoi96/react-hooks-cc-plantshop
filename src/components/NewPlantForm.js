import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.image || !formData.price) {
      alert("All fields are required.");
      return;
    }

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        ...formData, 
        price: parseFloat(formData.price),  
      }),
    })
      .then((response) => response.json())
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData({ name: "", image: "", price: "" });
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
        alert("Failed to add new plant.");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="new-plant-form">
      <h2>Add New Plant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Plant Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter plant name"
          />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            type="number"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
