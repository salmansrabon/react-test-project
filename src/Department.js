import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = { deps: [] };
    }
    refreshList() {
        //calling department api by axios
        // fetch('http://localhost:3000/department/list')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ deps: data });
        //     });
        //axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(`http://localhost:3000/department/list`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(response => {
            this.setState({ deps: response.data.deparments });
        });
    }
    componentDidMount() {
        this.refreshList();
    }
    componentDidUpdate() {
        this.refreshList();
        console.log(this.state.deps);
    }
    render() {
        const { deps } = this.state;
        return (
            <div className='mt-5 d-flex justify-content-left'>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>Edit</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Department;