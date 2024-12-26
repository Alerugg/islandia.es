// src/js/pages/home.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SearchBar } from "../component/searchBar.jsx";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  // Simulación form
  const [formData, setFormData] = useState({ nombre: "", email: "", descripcion: "" });
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    actions.loadInitialData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario personalizado enviado:", formData);
    setSendStatus("¡Solicitud enviada! Te contactaremos pronto.");
    setFormData({ nombre: "", email: "", descripcion: "" });
  };

  return (
    <div className="home">
      <header className="home-banner">
        <div className="banner-content">
          <h1>Planifica tu viaje a Islandia</h1>
          <p>Encuentra excursiones, coches, hoteles, vuelos y experiencias en un solo lugar</p>
        </div>
      </header>

      <SearchBar />

      <main className="main-home-content">
        {/* Excursiones */}
        <section className="home-category-section">
          <h2>Excursiones</h2>
          <div className="cards-container">
            {store.excursions.map((item) => (
              <div className="card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p>Precio: ${item.price}</p>
                  <button onClick={() => actions.addToCart("excursions", item)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botón "ver todas las excursiones" */}
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <Link to="/all-excursions" className="btn-icelandic-red">
              Ver todas las excursiones
            </Link>
          </div>
        </section>

        {/* Coches */}
        <section className="home-category-section">
          <h2>Coches</h2>
          <div className="cards-container">
            {store.cars.map((car) => (
              <div className="card" key={car.id}>
                <img src={car.image} alt={car.title} />
                <div className="card-body">
                  <h3>{car.title}</h3>
                  <p>Precio: ${car.price}</p>
                  <button onClick={() => actions.addToCart("cars", car)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hoteles */}
        <section className="home-category-section">
          <h2>Hoteles</h2>
          <div className="cards-container">
            {store.hotels.map((hotel) => (
              <div className="card" key={hotel.id}>
                <img src={hotel.image} alt={hotel.title} />
                <div className="card-body">
                  <h3>{hotel.title}</h3>
                  <p>Precio: ${hotel.price}</p>
                  <button onClick={() => actions.addToCart("hotels", hotel)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vuelos */}
        <section className="home-category-section">
          <h2>Vuelos</h2>
          <div className="cards-container">
            {store.flights.map((flight) => (
              <div className="card" key={flight.id}>
                <img src={flight.image} alt={flight.title} />
                <div className="card-body">
                  <h3>{flight.title}</h3>
                  <p>Precio: ${flight.price}</p>
                  <button onClick={() => actions.addToCart("flights", flight)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experiencias */}
        <section className="home-category-section">
          <h2>Experiencias</h2>
          <div className="cards-container">
            {store.experiences.map((exp) => (
              <div className="card" key={exp.id}>
                <img src={exp.image} alt={exp.title} />
                <div className="card-body">
                  <h3>{exp.title}</h3>
                  <p>Precio: ${exp.price}</p>
                  <button onClick={() => actions.addToCart("experiences", exp)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botón "ver todas las experiencias" */}
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <Link to="/all-experiences" className="btn-icelandic-red">
              Ver todas las experiencias
            </Link>
          </div>
        </section>

        {/* Formulario de viaje personalizado */}
        <section className="personalized-section">
          <h2>¿Quieres que te diseñemos tu viaje personalizado?</h2>
          <p>Por favor, envíanos tus datos y preferencias (fechas, presupuesto, número de personas, etc.):</p>

          <form className="personalized-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="tucorreo@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Detalles del viaje</label>
              <textarea
                name="descripcion"
                id="descripcion"
                rows="4"
                placeholder="Fechas, presupuesto, número de personas, etc."
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-personalized">
              Enviar solicitud
            </button>
          </form>

          {sendStatus && <p className="send-status">{sendStatus}</p>}
        </section>
      </main>
    </div>
  );
};
