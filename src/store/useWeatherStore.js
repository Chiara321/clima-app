// src/store/useWeatherStore.js
import { create } from 'zustand'

const useWeatherStore = create((set) => ({
    weather: null,
    loading: true,
    error: null,

    fetchWeather: async () => {
        set({ loading: true, error: null });

        // Función para obtener clima usando coordenadas
        const getWeather = async (lat, lon) => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&timezone=auto`
                );
                const data = await response.json();
                set({
                    weather: {
                        temp: data.current.temperature_2m,
                        isDay: data.current.is_day === 1,
                        code: data.current.weather_code,
                    },
                    loading: false
                });
            } catch (err) {
                set({ error: "Error al consultar el clima", loading: false });
            }
        };

        // Intentar Geolocation Nativa primero
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
                async () => {
                    // FALLBACK: Si el usuario niega o no hay HTTPS, usamos IP-API
                    console.warn("Geolocation negada o no segura. Usando IP-API...");
                    try {
                        const res = await fetch('http://ip-api.com/json/'); // Nota: Algunos navegadores bloquean mixed content, si falla usa el de abajo
                        const ipData = await res.json();
                        getWeather(ipData.lat, ipData.lon);
                    } catch (e) {
                        // Último recurso: Ubicación por defecto (ej: Madrid o Tokyo)
                        getWeather(40.4168, -3.7038);
                    }
                }
            );
        }
    }
}));

export default useWeatherStore;