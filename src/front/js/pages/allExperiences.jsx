// src/js/pages/AllExperiences.jsx
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/allCategories.css"; // mismo CSS

export const AllExperiences = () => {
  const { store } = useContext(Context);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filtrado local
  const filtered = store.experiences.filter((exp) => {
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : 999999;
    return exp.price >= min && exp.price <= max;
  });

  return (
    <div className="all-categories-page">
      <h2 className="page-title">Todas las Experiencias</h2>

      <div className="filters-container">
        <div className="filter-item">
          <label>Precio mínimo:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>Precio máximo:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map((exp) => (
            <div className="category-card" key={exp.id}>
              <img src={exp.image} alt={exp.title} />
              <h4>{exp.title}</h4>
              <p>Precio: ${exp.price}</p>
            </div>
          ))
        ) : (
          <p>No hay experiencias en este rango de precios.</p>
        )}
      </div>
    </div>
  );
};
