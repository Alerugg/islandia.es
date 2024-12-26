// src/js/pages/AllExcursions.jsx
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/allCategories.css"; // Usamos los estilos unificados

export const AllExcursions = () => {
  const { store } = useContext(Context);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filtrado local
  const filtered = store.excursions.filter((item) => {
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : 999999;
    return item.price >= min && item.price <= max;
  });

  return (
    <div className="all-categories-page">
      <h2 className="page-title">Todas las Excursiones</h2>

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
          filtered.map((exc) => (
            <div className="category-card" key={exc.id}>
              <img src={exc.image} alt={exc.title} />
              <h4>{exc.title}</h4>
              <p>Precio: ${exc.price}</p>
            </div>
          ))
        ) : (
          <p>No hay excursiones en este rango de precios.</p>
        )}
      </div>
    </div>
  );
};
