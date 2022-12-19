import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {
    const original = 'https://crud.viansoftware.com.br';

    const [users, setUsers] = useState([]);
    const [tables, setTables] = useState([]);
    useEffect(() => {
        getUsers();
        getTables();
    }, []);

    function getTables() {
        axios.get(`${original}/api/tables`).then(function(response) {
            console.log(response.data);
            setTables(response.data);
        });
    }
    function getUsers() {
        axios.get(`${original}/api/user`).then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`${original}/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }
    const deleteTable = (name) => {
        axios.delete(`${original}/api/tables/${name}/delete`).then(function(response){
            console.log(response.data);
            getTables()
        });
    }
    return (
        <div>
            <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>                        
                        <th>Name</th>                       
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table, key) =>
                        <tr key={key}>
                           
                            <td>{table[Object.keys(table)[0]]}</td>                           
                                {/* <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link> */}
                                <button onClick={() => deleteTable(table[Object.keys(table)[0]])}>Delete</button>                            
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}
