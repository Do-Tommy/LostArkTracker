/* eslint-disable react/prop-types */

import { useState } from "react";


const Table = () => {
  const [inputValue,setInputValue] = useState('')
  const [rows, setRows] = useState([
    { id: 1, character: 'slayer', name: 'John', age: '30' },
    { id: 2, character: 'bard', name: 'Jane', age: '25' },
    { id: 3, character: 'sorceress', name: 'Bob', age: '40' },
  ]);

  
  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1,character: inputValue, name: '', age: '' }]);
  };

  const handleNewRow = (event) => {
    setInputValue(event.target.value);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleNewRow}
        placeholder="Enter row name"
      />
      <button onClick={handleAddRow}>Add Row</button>

      
      <table>
        <thead>
          <tr>
            <th>Characters name</th>
            <th>Raid</th>
          </tr>
        </thead>
        <tbody>
            
          {rows.map((row, index) => (
            
            <tr key={index}>
              <td>
                {row.character}
              </td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
                <input
                type="checkbox"
                />

              </td>
              <td>
                <input
                  type="text"
                  value={row.age}
                  onChange={(e) => handleChange(index, 'age', e.target.value)}
                />
                <input
                type="checkbox"
                />
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;