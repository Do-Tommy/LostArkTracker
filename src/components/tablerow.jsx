/* eslint-disable react/prop-types */

import { useState } from "react";


const Table = () => {
  const [inputValue,setInputValue] = useState('')
  const [charValue,setCharValue] =  useState('')
  const daily = ['unas','guild','chaos']
  const raids  =  ['Valtan','Vykas','Clown','Brelshaza','Kayangel']

  const [rows, setRows] = useState([
    { id: 1, character: 'slayer', tasks : [daily,raids] },
    { id: 2, character: 'bard', tasks : [daily,raids] },
    { id: 3, character: 'sorceress',tasks : [daily,raids] },
  ]);

  
  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1,character: inputValue, name: '', age: '' }]);
  };


  // get new row input value and puts it in inputValue state
  const handleNewRow = (event) => {

    setInputValue(event.target.value);
  };

  // cell input when character doesnt have a name
  const handleCharChange = (e) => {
    setCharValue(e.target.value);
  };

  
  const handleCharSubmit = (index, field, value,event) => {
    event.preventDefault();
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
      <table className="border-separate p-8">
        <thead >
          <tr>
            <th></th>
            <th>Daily</th>
            <th></th>
            <th></th>
            <th>Weekly</th>
            <th></th>
            <th></th>
            <th>Raids</th>
          </tr>
          <tr>
            <th>Characters name</th>
           {daily.map((daily,index) => (
            <th key={index}>{daily}</th>
           ))}
           {raids.map((raid,index) => (
            <th key={index}>{raid}</th>
           ))}
          </tr>
          
        </thead>
        <thead >
          
        </thead>
        <tbody>
            
          {rows.map((row, index) => (
            
            <tr key={index}>
              <td>
                {row.character.trim() === "" ? (
                  <form
                    onSubmit={(e) => handleCharSubmit(index,'character',charValue,e)}>
                    <input
                      type="text"
                      value={charValue}
                      onChange={(e) => handleCharChange(e)}>
                    </input>
                  </form>
                  ):(
                    row.character
                  ) }
              </td>
              {row.tasks.map((task, index) => (
                
                task.map(()=> (
                  <td key={index}>
                  <input type="checkbox" key={index}></input>
                  </td>
                ))
              
            ))}
              
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;