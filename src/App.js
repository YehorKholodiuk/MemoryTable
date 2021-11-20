import { shuffle, chunk } from 'lodash';
import { nanoid } from 'nanoid';
import './App.css';
import { useState } from 'react';
function App(){
  const side = 4;
  let variants = [];
  for (let i = 1; i <= (side * side)/2; i++){
    variants.push(i);
  }
  variants = [...variants,...variants];
  variants = shuffle(variants).map(el => ({
    open:false,
    value:el,
    id: nanoid()
      })
  );
  variants = chunk (variants,side);
  console.log(variants);
  const [gameField,setGameField] = useState(variants);
  const openClick = (id) =>{
    const updatedGameField = gameField.map(row =>row.map (col => col.id === id ? {
      ...col,
      open:true
    }:col ));
    setGameField(updatedGameField);
  };
  return (
      <div className="App">
        <table border={1}>
          <tbody>
          {gameField.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                    <td key={colIndex}>{col.open ? col.value :
                        <button onClick={() => openClick(col.id)}>Open</button>}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}
export default App;