import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./css/DynamicBackground.css";

const DynamicBackground = ({ theme }) => {
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        const canvas = document.getElementById("dynamic-background");

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        const resizeCanvas = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            renderer.dispose(); // 保留釋放資源
        };
    }, []);

    useEffect(() => {
        if (sceneRef.current) {
            sceneRef.current.background = theme === "light"
                ? new THREE.Color(0xffffff)
                : new THREE.Color(0x333333);
        }
    }, [theme]);

    return <canvas id="dynamic-background" />;
};

export default DynamicBackground;
