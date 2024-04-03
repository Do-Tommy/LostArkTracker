/* eslint-disable react/prop-types */

import TableRow from "./tablerow";

const jsonData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 }
  ];
  

const Table = () => {

  return (
    <div>
        <h1>Table Example</h1>
      <TableRow data={jsonData} />
    </div>
  )
}

export default Table