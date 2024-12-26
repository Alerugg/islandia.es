// src/js/component/navbar.jsx

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useAuth0 } from "@auth0/auth0-react";

// Importa Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Importa el CSS propio
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);

  // Calcular total del carrito
  const cartTotal = store.cart.reduce((acc, item) => {
    const price =
      item.item.price !== undefined ? item.item.price : item.item.TotalPrice || 0;
    return acc + price * (item.qty || 1);
  }, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      navigate("/checkout");
    }
  };

  return (
    // Navbar Bootstrap
    <nav className="navbar navbar-expand-lg custom-navbar">
      {/* LOGO / BRAND */}
      <Link className="navbar-brand brand-container d-flex align-items-center ms-1" to="/">
        <img
          src="https://oscarg90.sg-host.com/wp-content/uploads/2024/06/Recurso-3-1.png"
          alt="Islandia.es Logo"
          className="logo-img"
        />
      </Link>

      {/* BOTÓN TOGGLER (Bootstrap) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* CONTENEDOR COLAPSABLE */}
      <div className="collapse navbar-collapse" id="navbarToggler">
        {/* LISTA DE LINKS (Centrada con mx-auto) */}
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 categories-list">
          <li className="nav-item">
            <Link className="nav-link" to="/all-excursions">
              Excursiones
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/coches">
              Coches
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/hoteles">
              Hoteles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vuelos">
              Vuelos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/all-experiences">
              Experiencias
            </Link>
          </li>
        </ul>

        {/* CARRITO + LOGIN (a la derecha) */}
        <div className="d-flex align-items-center cart-login-section me-1">
          {/* ICONO CARRITO */}
          <div
            className="position-relative cart-icon-container"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <i className="fas fa-shopping-cart cart-icon"></i>
            {/* Badge con la cuenta */}
            <span className="cart-badge">
              {store.cart.length}
            </span>

            {/* Dropdown del carrito */}
            {cartOpen && (
              <div className="cart-dropdown">
                {store.cart.length === 0 ? (
                  <p className="m-0 fst-italic">El carrito está vacío</p>
                ) : (
                  <>
                    <ul className="list-unstyled mb-2 cart-items-list">
                      {store.cart.map((cartItem, index) => {
                        const price =
                          cartItem.item.price !== undefined
                            ? cartItem.item.price
                            : cartItem.item.TotalPrice || 0;
                        const nameOrTitle = cartItem.item.title
                          ? cartItem.item.title
                          : cartItem.item.Name;

                        return (
                          <li key={index} className="d-flex justify-content-between mb-1 cart-item">
                            <span>{nameOrTitle}</span>
                            <span>${price}</span>
                            <button
                              className="btn btn-sm text-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.removeCartItem(index);
                              }}
                            >
                              X
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="text-end fw-bold mb-2">
                      Total: ${cartTotal}
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckout();
                      }}
                    >
                      Finalizar compra
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* LOGIN/LOGOUT */}
          {!isAuthenticated ? (
            <button
              className="btn btn-success ms-3"
              onClick={() => loginWithRedirect()}
            >
              Iniciar Sesión
            </button>
          ) : (
            <div className="d-flex align-items-center ms-3 user-logged">
              <img
                src={user.picture}
                alt={user.name}
                className="user-avatar"
              />
              <span className="mx-2">{user.name}</span>
              <button
                className="btn btn-outline-success"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
