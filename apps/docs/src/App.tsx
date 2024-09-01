import 'css/docsSearch.css';
import 'css/global.css';
import { vars } from 'css/vars.css';
import Home from "pages/Home"
import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"

const highlightColors = [
  vars.colors.orange,
  vars.colors.blue,
  vars.colors.pink,
  vars.colors.purple,
  vars.colors.red,
  vars.colors.green,
];

function getColor() {
  return highlightColors[Math.floor(Math.random() * highlightColors.length)];
}

function App() {
  useEffect(() => {
    const body = document.body;

    const uniqueColors = (function* () {
      let lastColor = getColor();
      while (true) {
        const color = getColor();
        if (color !== lastColor) {
          lastColor = color;
          yield color;
        }
      }
    })();

    const tasteTheRainbow = () =>
      body.style.setProperty('--selectionColor', uniqueColors.next().value);

    body.addEventListener('mousedown', tasteTheRainbow);

    return () => body.removeEventListener('mousedown', tasteTheRainbow);
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
