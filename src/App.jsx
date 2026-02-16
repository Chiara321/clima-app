import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sky } from '@react-three/drei';
import useWeatherStore from './store/useWeatherStore';
import { getWeatherDescription } from './utils/weatherUtils';

function App() {
  const { weather, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const weatherInfo = weather ? getWeatherDescription(weather.code) : null;

  return (
    <div className="h-screen w-full bg-slate-950">
      {/* UI Overlay */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none text-white">
        <h1 className="text-5xl font-extralight tracking-tighter mb-2">El Clima</h1>
        {loading && <p className="animate-pulse opacity-50">Localizando...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {weather && (
          <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-4xl font-bold">{weather.temp}°C</p>
            <p className="text-lg opacity-80 uppercase tracking-widest">{weatherInfo.label}</p>
          </div>
        )}
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [5, 5, 5] }}>
        {/* Sky dinámico según si es de día o de noche */}
        <Sky sunPosition={weather?.isDay ? [100, 10, 100] : [0, -10, 0]} />
        <ambientLight intensity={weather?.isDay ? 0.8 : 0.1} />

        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={weather?.isDay ? "orange" : "royalblue"} />
        </mesh>

        <OrbitControls />
        {!weather?.isDay && <Stars />}
      </Canvas>
    </div>
  );
}

export default App;
