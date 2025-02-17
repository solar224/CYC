import { useEffect } from "react";
import * as THREE from "three";
import "./css/DynamicBackground.css"; // 引入 CSS

const DynamicBackground = ({ theme }) => {
    useEffect(() => {
        const canvas = document.getElementById("dynamic-background");

        // 設置場景、相機與渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 設置光源
        const light = new THREE.AmbientLight(0x404040, 2); // 環境光
        scene.add(light);

        // 行星真實尺寸 (單位：公里)
        const planetDiameters = [
            4_880,   // 水星
            12_104,  // 金星
            12_742,  // 地球
            6_779,   // 火星
            139_820, // 木星
            116_460, // 土星
            50_724,  // 天王星
            49_244   // 海王星
        ];

        // 設定縮放比例
        const scaleFactor = 100_000;

        // 創建太陽的幾何體和材質
        const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // 太陽的黃色
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun); // 將太陽添加到場景中

        // 創建行星的材質
        const planetMaterials = [
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa }), // 水星
            new THREE.MeshBasicMaterial({ color: 0xf2b632 }), // 金星
            new THREE.MeshBasicMaterial({ color: 0x4e73df }), // 地球
            new THREE.MeshBasicMaterial({ color: 0xffa500 }), // 火星
            new THREE.MeshBasicMaterial({ color: 0x6fa3ff }), // 木星
            new THREE.MeshBasicMaterial({ color: 0x616161 }), // 土星
            new THREE.MeshBasicMaterial({ color: 0xff6347 }), // 天王星
            new THREE.MeshBasicMaterial({ color: 0x6495ed })  // 海王星
        ];

        // 行星的軌道參數：平均距離(單位：AU)和偏心率
        const planetOrbitalData = [
            { semiMajorAxis: 0.387, eccentricity: 0.205 }, // 水星
            { semiMajorAxis: 0.723, eccentricity: 0.007 }, // 金星
            { semiMajorAxis: 1.000, eccentricity: 0.017 }, // 地球
            { semiMajorAxis: 1.524, eccentricity: 0.093 }, // 火星
            { semiMajorAxis: 5.203, eccentricity: 0.049 }, // 木星
            { semiMajorAxis: 9.537, eccentricity: 0.056 }, // 土星
            { semiMajorAxis: 19.191, eccentricity: 0.046 }, // 天王星
            { semiMajorAxis: 30.070, eccentricity: 0.010 }  // 海王星
        ];

        // 定義行星的公轉速度和初始相位
        const planetSpeeds = [
            0.0005,  // 水星
            0.0004,  // 金星
            0.0003,  // 地球
            0.0002,  // 火星
            0.0001,  // 木星
            0.00007, // 土星
            0.00004, // 天王星
            0.00003  // 海王星
        ];

        const planetPhases = [
            0,  // 水星
            Math.PI / 4, // 金星
            Math.PI / 2, // 地球
            Math.PI / 3, // 火星
            Math.PI / 5, // 木星
            Math.PI / 6, // 土星
            Math.PI / 7, // 天王星
            Math.PI / 8  // 海王星
        ];

        // 初始化行星
        const planets = [];
        const distances = [10, 15, 20, 25, 30, 35, 40, 45]; // 行星與太陽的距離

        planetOrbitalData.forEach((orbitalData, index) => {
            const { semiMajorAxis, eccentricity } = orbitalData;
            const scaledDiameter = planetDiameters[index] / scaleFactor;
            const planetGeometry = new THREE.SphereGeometry(scaledDiameter, 32, 32);
            const planet = new THREE.Mesh(planetGeometry, planetMaterials[index]);

            // 計算行星的真實軌道半徑和位置
            const distance = semiMajorAxis * 10; // 我們將 AU 單位轉換成場景的距離單位
            planets.push({ planet, speed: planetSpeeds[index], phase: planetPhases[index], semiMajorAxis, eccentricity });
            scene.add(planet);

            // 創建行星的軌道（這裡簡化為圓形）
            const orbitGeometry = new THREE.RingGeometry(distance - 0.02, distance + 0.03, 100);
            const orbitMaterial = new THREE.MeshBasicMaterial({ color: (theme === "light" ? 0x333333 : 0xffffff), side: THREE.DoubleSide, opacity: 0.1, transparent: true });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2; // 使軌道平行於地面
            scene.add(orbit);
        });

        // 根據 theme 設定背景顏色
        const setBackground = () => {
            if (theme === "light") {
                scene.background = new THREE.Color(0xffffff); // 白天背景色
            } else {
                scene.background = new THREE.Color(0x333333); // 黑夜背景色
            }
        };

        setBackground(); // 初次設置背景顏色

        // 設置相機位置並讓它朝向中心
        camera.position.set(0, 10, 60); // 調整相機位置，創建斜上方視角
        camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相機朝向太陽系的中心

        // 動畫循環
        const animate = () => {
            requestAnimationFrame(animate);

            // 使行星自轉並圍繞太陽運行
            planets.forEach((planetData, index) => {
                const { planet, speed, phase, semiMajorAxis, eccentricity } = planetData;

                planet.rotation.y += 0.01; // 行星自轉

                // 計算行星位置（考慮橢圓形軌道）
                const time = (Date.now() * speed + phase) % (2 * Math.PI); // 保證循環不會過大
                const angle = time;
                const distance = semiMajorAxis * 10 * (1 - eccentricity * Math.cos(angle)); // 橢圓軌道公式
                planet.position.x = distance * Math.cos(angle);
                planet.position.z = distance * Math.sin(angle);
                planet.position.y = 2 * Math.sin(time / 2); // 使用sin(time / 2)來避免過大的起伏
            });

            // 渲染場景
            renderer.render(scene, camera);
        };

        animate();

        // 當視窗大小改變時，調整畫布大小
        const resizeCanvas = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [theme]);

    return <canvas id="dynamic-background" />;
};

export default DynamicBackground;
