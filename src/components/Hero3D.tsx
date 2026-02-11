"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const AnimatedSphere = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={mesh} args={[1, 100, 100]} scale={1.5}>
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
};

const AttendanceRings = () => {
    return (
        <group>
            {[...Array(3)].map((_, i) => (
                <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
                    <meshStandardMaterial color={["#3b82f6", "#8b5cf6", "#ec4899"][i]} emissive={["#3b82f6", "#8b5cf6", "#ec4899"][i]} emissiveIntensity={0.5} />
                </mesh>
            ))}
        </group>
    );
};

export const Hero3D = () => {
    return (
        <div className="h-[500px] w-full lg:h-[700px]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <AnimatedSphere />
                <AttendanceRings />
            </Canvas>
        </div>
    );
};
