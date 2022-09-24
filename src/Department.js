import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = { deps: [], error: null, isLoaded: false };
    }

    refreshList() {
        fetch('http://localhost:3000/department/list')
            .then((response) => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        deps: result.departments,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        console.log(this.state.deps);
    }

    render() {
        const { error, isLoaded, deps } = this.state;
        return (
            <div className="mt-5 d-flex justify-content-left">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && (
                            <tr>
                                <td></td>
                                <td>Error: {error.message}</td>
                                <td></td>
                            </tr>
                        )}
                        {!isLoaded && (
                            <tr>
                                <td></td>
                                <td>Loading...</td>
                                <td></td>
                            </tr>
                        )}
                        {deps.length > 0 && (deps.map((dep) => (
                            <tr key={dep.id}>
                                <td>{dep.departmentId}</td>
                                <td>{dep.departmentName}</td>
                                <td>Edit</td>
                            </tr>
                        )))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Department;
