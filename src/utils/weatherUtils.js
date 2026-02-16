export const getWeatherDescription = (code) => {
    if (code === 0) return { label: 'Despejado', effect: 'sunny' };
    if (code >= 1 && code <= 3) return { label: 'Nublado', effect: 'cloudy' };
    if (code >= 51 && code <= 67) return { label: 'Lluvia', effect: 'rainy' };
    if (code >= 71 && code <= 77) return { label: 'Nieve', effect: 'snowy' };
    if (code >= 95) return { label: 'Tormenta', effect: 'storm' };
    return { label: 'Variable', effect: 'sunny' };
};