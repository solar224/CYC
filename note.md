
**git
git add .
git commit -m "."
git push origin main

npm start
npm run build

v
npm run deploy

//localStorage
const [theme, setTheme] = useState(() => { return localStorage.getItem('theme') || "light" });
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

