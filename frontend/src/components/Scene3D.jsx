import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Particles with gradient colors
const Particles = () => {
    const points = useRef();
    const particleCount = 300;

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Spread particles in a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 3 + Math.random() * 5;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Gradient from purple to cyan
            const t = Math.random();
            colors[i * 3] = 0.5 + t * 0.3;     // R
            colors[i * 3 + 1] = 0.2 + t * 0.6; // G
            colors[i * 3 + 2] = 0.8 + t * 0.2; // B
        }
        return [positions, colors];
    }, []);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.02;
            points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Glowing Orb with distortion effect
const GlowingOrb = ({ position, color, scale = 1, speed = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.7}
                />
            </mesh>
        </Float>
    );
};

// Orbiting Ring
const OrbitRing = ({ radius, color, rotationSpeed = 0.5 }) => {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
    );
};

// Neural Network Lines
const NeuralLines = () => {
    const linesRef = useRef();
    const lineCount = 15;

    const positions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < lineCount; i++) {
            const startPoint = new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            );
            const endPoint = new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            );
            positions.push([startPoint, endPoint]);
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <group ref={linesRef}>
            {positions.map((points, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([...points[0].toArray(), ...points[1].toArray()])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color="#8b5cf6"
                        transparent
                        opacity={0.15}
                    />
                </line>
            ))}
        </group>
    );
};

const Scene3D = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {/* Ambient lighting */}
                    <ambientLight intensity={0.2} />

                    {/* Colored point lights */}
                    <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
                    <pointLight position={[0, 0, 5]} intensity={0.2} color="#ffffff" />

                    {/* Main glowing orbs */}
                    <GlowingOrb position={[-4, 2, -3]} color="#8b5cf6" scale={0.8} speed={0.5} />
                    <GlowingOrb position={[4, -1, -4]} color="#06b6d4" scale={0.6} speed={0.7} />
                    <GlowingOrb position={[0, 3, -5]} color="#a855f7" scale={0.4} speed={0.9} />

                    {/* Orbit rings */}
                    <OrbitRing radius={3} color="#8b5cf6" rotationSpeed={0.3} />
                    <OrbitRing radius={4.5} color="#06b6d4" rotationSpeed={-0.2} />

                    {/* Particles */}
                    <Particles />

                    {/* Neural network lines */}
                    <NeuralLines />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
