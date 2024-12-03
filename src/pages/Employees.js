import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Employees</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
