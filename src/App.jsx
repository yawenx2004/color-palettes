import './App.css'
import { useState } from 'react';

function App() {
  const [colors, setColors] = useState([
    "#00693e", "#643c20", "#c4dd88", "#12312b", "#e2e2e2"
  ]);

  const updateColors = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  const addColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const deleteColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const moveColor = (index, direction) => {
    const newColors = [...colors];
    const targetIndex = index + direction;
    // out of bounds
    if (targetIndex < 0 || targetIndex >= colors.length) return;
    [newColors[index], newColors[targetIndex]] = [newColors[targetIndex], newColors[index]];
    setColors(newColors);
  };

  // determine text color based on background brightness
  const textColor = (hex) => {
    const c = hex.substring(1);
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness > 186 ? "black" : "white";
  };

  return (
    <div className="page">
      <div className="lhs">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color"
            style={{ backgroundColor: color }}
          >
            <div className="up-down">
              <button onClick={() => moveColor(index, -1)} style={{ color: textColor(color) }}>▲</button>
              <button onClick={() => moveColor(index, 1)} style={{ color: textColor(color) }}>▼</button>
            </div>
            <input
              type="text"
              value={color}
              onChange={(e) => updateColors(index, e.target.value)}
              style={{ color: textColor(color) }}
            />
            <div className="delete">
              <button onClick={() => deleteColor(index)} style={{ color: textColor(color) }}><strong>✕</strong></button>
            </div>
          </div>
        ))}
        <button onClick={() => addColor("#ffffff")}>+</button>
      </div>
      <div className="rhs"></div>
    </div>
  );
}

export default App;
