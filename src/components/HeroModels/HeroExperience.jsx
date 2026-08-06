import { useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { GamingRoom } from './GamingRoom';
import GamingRoomLights from './GamingRoomLights';

const HeroExperience = () => {

    const navigate = useNavigate();
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [screenHovered, setScreenHovered] = useState(false)

    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                dpr={[1, isMobile ? 1.5 : 2]}
                frameloop="demand"
            >
                <OrbitControls
                    enablePan={false}
                    enableZoom={!isTablet}
                    maxDistance={20}
                    minDistance={8}
                    minPolarAngle={Math.PI / 2.6}
                    maxPolarAngle={Math.PI / 2.1}
                    minAzimuthAngle={-Math.PI / 8}
                    maxAzimuthAngle={Math.PI / 8}
                />
                <GamingRoomLights />
                <group
                    scale={isMobile ? 2.1 : 3}
                    position={[0, -2.4, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                    <GamingRoom
                        onScreenClick={() => navigate('/projects')}
                        onScreenHoverChange={setScreenHovered}
                    />
                </group>
            </Canvas>

            <span
                className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black-100/90 border border-white/10 text-white-50 text-xs font-mono whitespace-nowrap pointer-events-none transition-opacity duration-200 ${screenHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                View Projects →
            </span>
        </>
    )
}

export default HeroExperience
