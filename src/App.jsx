import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

function App() {
  return (
    <div className="h-screen w-full">
      {/* UI Overlay */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h1 className="text-white text-4xl font-light tracking-tighter">El Clima</h1>
        <p className="text-gray-400">Cargando clima...</p>
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />

        {/* Luces básicas */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Un cubo de prueba (donde irá el diorama) */}
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="royalblue" />
        </mesh>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}

export default App
