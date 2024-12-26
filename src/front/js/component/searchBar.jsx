// src/js/component/searchBar.jsx
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/searchBar.css";

export const SearchBar = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("excursions");

  // Campos de búsqueda
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // limpiar el formulario
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleSearch = () => {
    // Convertir minPrice / maxPrice a número
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : 999999;

    actions.searchItems(activeTab, {
      query,
      minPrice: min,
      maxPrice: max,
    });
  };

  return (
    <div className="search-bar">
      <div className="search-bar-tabs">
        <button
          className={`tab ${activeTab === "excursions" ? "active" : ""}`}
          onClick={() => handleTabClick("excursions")}
        >
          Excursiones
        </button>
        <button
          className={`tab ${activeTab === "cars" ? "active" : ""}`}
          onClick={() => handleTabClick("cars")}
        >
          Coches
        </button>
        <button
          className={`tab ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => handleTabClick("hotels")}
        >
          Hoteles
        </button>
        <button
          className={`tab ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => handleTabClick("flights")}
        >
          Vuelos
        </button>
        <button
          className={`tab ${activeTab === "experiences" ? "active" : ""}`}
          onClick={() => handleTabClick("experiences")}
        >
          Experiencias
        </button>
      </div>

      {/* Formulario de búsqueda */}
      <div className="search-bar-form">
        <input
          type="text"
          className="form-input bigger"
          placeholder="Buscar por título..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="number"
          className="form-input bigger"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className="form-input bigger"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button className="search-button bigger" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Mostrar resultados si hay */}
      {store.searchResults && store.searchResults.length > 0 && (
        <div className="search-results">
          <h4>Resultados de {activeTab}:</h4>
          <ul>
            {store.searchResults.map((item) => (
              <li key={item.id} className="search-result-item">
                <span>{item.title}</span> - ${item.price}
                <button
                  onClick={() => actions.addToCart(activeTab, item)}
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
