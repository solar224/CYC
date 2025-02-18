import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./css/DynamicBackground.css"; // 引入 CSS

// 使用五邊形和六邊形來模擬C60結構
const createC60Structure = (scene) => {
    const sphereRadius = 50; // C60結構的半徑
    const material = new THREE.LineBasicMaterial({
        color: 0x000000, // 模擬炭60的顏色
        linewidth: 0.5, // 設定線條寬度
    });

    // 使用 IcosahedronGeometry 來近似炭60結構
    const geometry = new THREE.IcosahedronGeometry(sphereRadius, 2); // 2級細分
    const edges = new THREE.EdgesGeometry(geometry); // 獲取邊緣線條
    const c60 = new THREE.LineSegments(edges, material);

    // 將每個頂點連接，組成六邊形和五邊形
    scene.add(c60);
    return c60;
};
const createParticles = (scene) => {
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // 隨機分布粒子的位置
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = Math.random() * 200 - 100; // X
        positions[i * 3 + 1] = Math.random() * 200 - 100; // Y
        positions[i * 3 + 2] = Math.random() * 200 - 100; // Z
    }

    // 創建粒子材質
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff, // 粒子顏色
        size: 0.5, // 粒子大小
        transparent: true,
        opacity: 0.7
    });

    // 創建粒子系統並添加到場景中
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    scene.add(particles);

    return particles;
};

const DynamicBackground = ({ theme }) => {
    const sceneRef = useRef(null);
    const cubeRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const canvas = document.getElementById("dynamic-background");

        // 設置場景、相機與渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        sceneRef.current = scene;
        cubeRef.current = createC60Structure(scene);
        particlesRef.current = createParticles(scene);

        camera.position.set(0, 20, 150); // 調整相機位置
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // 動畫循環
        const animate = () => {
            requestAnimationFrame(animate);
            cubeRef.current.rotation.x += 0.001;
            cubeRef.current.rotation.y += 0.001;

            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < 500; i++) {
                const index = i * 3;
                positions[index] += Math.sin(Date.now() * 0.001 + i) * 0.1;
                positions[index + 1] += Math.cos(Date.now() * 0.001 + i) * 0.1;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;

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

        // 清理
        return () => {
            // 這裡會在組件卸載時執行，移除canvas
            window.removeEventListener("resize", resizeCanvas);
            renderer.dispose(); // 釋放渲染器資源
            document.body.removeChild(renderer.domElement); // 移除canvas
        };
    }, []);

    useEffect(() => {
        const onMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // 改變粒子系統或其他元素的行為
            particlesRef.current.rotation.x = x * 0.1;
            particlesRef.current.rotation.y = y * 0.1;
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);
    // 更新背景顏色
    useEffect(() => {
        if (sceneRef.current && cubeRef.current && particlesRef.current) {
            const scene = sceneRef.current;
            const cube = cubeRef.current;
            const particles = particlesRef.current;

            if (theme === "light") {
                scene.background = new THREE.Color(0xffffff); // 白色背景
                cube.material.color.set(0x000000); // 黑色立方體
                particles.material.color.set(0x000000); // 黑色粒子
            } else {
                scene.background = new THREE.Color(0x333333); // 深色背景
                cube.material.color.set(0xffffff); // 白色立方體
                particles.material.color.set(0xffffff); // 白色粒子
            }
        }
    }, [theme]);
    useEffect(() => {
        const handleMouseMove = (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            // 根據鼠標位置改變粒子顏色
            const color = new THREE.Color(mouseX, mouseY, 0.5);
            particlesRef.current.material.color.set(color);

            // 根據鼠標位置改變粒子運動方向
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < 500; i++) {
                const index = i * 3;
                positions[index] += Math.sin(mouseX * 10) * 0.1;
                positions[index + 1] += Math.cos(mouseY * 10) * 0.1;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);



    return <canvas id="dynamic-background" />;
};

export default DynamicBackground;
