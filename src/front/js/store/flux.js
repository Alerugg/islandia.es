// src/js/store/flux.js

const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        // Categorías fijas (Excursiones, Coches, Hoteles, Vuelos, Experiencias)
        excursions: [],
        cars: [],
        hotels: [],
        flights: [],
        experiences: [],
  
        // Resultados de búsqueda en el SearchBar
        searchResults: [],
  
        // Carrito
        cart: [],
      },
  
      actions: {
        // -------------------------------
        // 1. Cargar datos MOCK
        // -------------------------------
        loadInitialData: () => {
          const mockExcursions = [
            {
              id: 1,
              title: "Landmannalaugar",
              price: 120,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/20230702_130640-scaled.jpg",
            },
            {
              id: 2,
              title: "Trekking en Glaciar",
              price: 150,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMG_3959-copia-scaled.jpg",
            },
            {
              id: 3,
              title: "Avistamiento de ballenas",
              price: 90,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMM9316-scaled.jpg",
            },
            {
              id: 4,
              title: "Blue Lagoon",
              price: 80,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/06/Blue-Lagoon-scaled.jpg",
            },
          ];
  
          const mockCars = [
            {
              id: 1,
              title: "4x4 Económico",
              price: 65,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/06/Blue-Lagoon-scaled.jpg",
            },
            {
              id: 2,
              title: "SUV Familiar",
              price: 80,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMM9316-scaled.jpg",
            },
            {
              id: 3,
              title: "Campervan",
              price: 100,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMG_3959-copia-scaled.jpg",
            },
            {
              id: 4,
              title: "Lujo Premium",
              price: 150,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/20230702_130640-scaled.jpg",
            },
          ];
  
          const mockHotels = [
            {
              id: 1,
              title: "Hotel en Reykjavik",
              price: 80,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/20230702_130640-scaled.jpg",
            },
            {
              id: 2,
              title: "Hostal en Akureyri",
              price: 60,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMG_3959-copia-scaled.jpg",
            },
            {
              id: 3,
              title: "Cabaña en zona rural",
              price: 100,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMM9316-scaled.jpg",
            },
            {
              id: 4,
              title: "Casa rural con aguas termales",
              price: 120,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/06/Blue-Lagoon-scaled.jpg",
            },
          ];
  
          const mockFlights = [
            {
              id: 1,
              title: "Vuelo desde Madrid",
              price: 300,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMG_3959-copia-scaled.jpg",
            },
            {
              id: 2,
              title: "Vuelo desde Barcelona",
              price: 320,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMM9316-scaled.jpg",
            },
            {
              id: 3,
              title: "Vuelo desde Valencia",
              price: 280,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/06/Blue-Lagoon-scaled.jpg",
            },
            {
              id: 4,
              title: "Vuelo desde Bilbao",
              price: 310,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/20230702_130640-scaled.jpg",
            },
          ];
  
          const mockExperiences = [
            {
              id: 1,
              title: "Baños de agua fría",
              price: 20,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/06/Blue-Lagoon-scaled.jpg",
            },
            {
              id: 2,
              title: "Avistamiento de pájaros",
              price: 15,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMG_3959-copia-scaled.jpg",
            },
            {
              id: 3,
              title: "Pesca en lago helado",
              price: 50,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/IMM9316-scaled.jpg",
            },
            {
              id: 4,
              title: "Snowboard nocturno",
              price: 90,
              image:
                "https://oscarg90.sg-host.com/wp-content/uploads/2024/07/20230702_130640-scaled.jpg",
            },

          ];
  
          setStore({
            excursions: mockExcursions,
            cars: mockCars,
            hotels: mockHotels,
            flights: mockFlights,
            experiences: mockExperiences,
            searchResults: [],
          });
        },
  
        // -------------------------------
        // 2. Simular un “search” local
        // -------------------------------
        searchItems: (category, searchParams) => {
          // Podrías filtrar por texto, precio, etc.
          const store = getStore();
          let data = [];
  
          if (category === "excursions") data = store.excursions;
          if (category === "cars") data = store.cars;
          if (category === "hotels") data = store.hotels;
          if (category === "flights") data = store.flights;
          if (category === "experiences") data = store.experiences;
  
          // Supongamos que “searchParams.query” es el texto
          // Filtramos por title contenga el query
          const query = searchParams.query?.toLowerCase() || "";
          const minPrice = searchParams.minPrice || 0;
          const maxPrice = searchParams.maxPrice || 999999;
  
          // Filtrar
          let results = data.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const priceMatch =
              item.price >= minPrice && item.price <= maxPrice;
            return titleMatch && priceMatch;
          });
  
          setStore({ searchResults: results });
        },
  
        // -------------------------------
        // 3. Carrito
        // -------------------------------
        addToCart: (category, item) => {
          const store = getStore();
          const newItem = {
            category: category,
            item: item,
            qty: 1,
          };
          setStore({ cart: [...store.cart, newItem] });
        },
  
        removeCartItem: (index) => {
          const store = getStore();
          const newCart = [...store.cart];
          newCart.splice(index, 1);
          setStore({ cart: newCart });
        },
  
        clearCart: () => {
          setStore({ cart: [] });
        },
      },
    };
  };
  
  export default getState;
  