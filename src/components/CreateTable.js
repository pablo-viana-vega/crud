import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListUser() {
  const original = "http://crud.raicom.online";
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [count, setCount] = useState(0);

  const addRow = () => {
    setCount((count) => count + 1);
    const table = document.getElementById("table");
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const removeBtn = document.createElement("button");    
    removeBtn.type = "button";
    removeBtn.innerHTML = "Remove";
    removeBtn.addEventListener("click", function () {
      removeRow(this.parentElement.parentElement.rowIndex - 1);
      /*  console.log(this);
      table.deleteRow(this.id);
      setCount(count => count - 1); */
    });
    cell1.innerHTML = `<input type="text" name="name" id="name" placeholder="Name" />`;
    cell2.innerHTML = `<select name="datatype">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="pass">Password</option>
                      </select>`;
    cell3.appendChild(removeBtn);
  };
  const removeRow = (rowindex) => {
    const table = document.getElementById("table");
    table.deleteRow(rowindex);
    setCount((count) => count - 1);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${original}/api/table/create`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      });
  };
  return (
    <div>
      <h1>Create New Data Base Table</h1>
      <form onSubmit={handleSubmit}>
        <table cellSpacing="10">
          <thead>
            <tr>
              <th>
                <label>Name: </label>
              </th>
              <td>
                <input type="text" name="name" onChange={handleChange} />
              </td>
              <th>
                <label>Columns: {count} </label>
              </th>
              <td>
                <button type="button" onClick={() => addRow()}>
                  Add
                </button>
              </td>
            </tr>
          </thead>
          <tbody id="table"></tbody>
          <tfoot>
            <tr>
              <td colSpan="2" align="right">
                <button>Save</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}
