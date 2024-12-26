// src/js/pages/Checkout.jsx
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/checkout.css"; // nuestro CSS para la página

export const Checkout = () => {
  const { store, actions } = useContext(Context);

  // Calcular el total
  const totalPrice = store.cart.reduce((acc, cartItem) => {
    const price = cartItem.item.price !== undefined
      ? cartItem.item.price
      : (cartItem.item.TotalPrice || 0);
    return acc + price * (cartItem.qty || 1);
  }, 0);

  const handlePayNow = () => {
    // Aquí podrías redirigir a una pasarela real (Stripe, PayPal...) o simular
    alert("¡Pago procesado con éxito (simulado)!");
    // Podrías limpiar el carrito
    actions.clearCart();
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>

      {store.cart.length === 0 ? (
        <p className="empty-msg">
          Tu carrito está vacío. Agrega productos antes de continuar.
        </p>
      ) : (
        <>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {store.cart.map((cartItem, index) => {
                const item = cartItem.item;
                const price = item.price !== undefined
                  ? item.price
                  : (item.TotalPrice || 0);

                return (
                  <tr key={index}>
                    <td>{item.title || item.Name}</td>
                    <td>${price}</td>
                    <td>{cartItem.qty || 1}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => actions.removeCartItem(index)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="checkout-summary">
            <p className="summary-text">
              Total a pagar: <strong>${totalPrice}</strong>
            </p>
            <button className="pay-btn" onClick={handlePayNow}>
              Pagar ya
            </button>
          </div>
        </>
      )}
    </div>
  );
};
