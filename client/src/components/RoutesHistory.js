import React from 'react'
import axios from 'axios'
import io from 'socket.io-client';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const style = {
    height: 'auto',
    width: 'auto',
    margin: 20,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
  };

class RoutesHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            employeephone: props.employeephone,
            returned: false,
            returnedArr: [],
            endpoint: 'http://localhost:5000'
        }
    }


    componentDidMount(){
        axios.get(`/api/routes/${this.state.employeephone}`).then(response=>{
            console.log(response);
            if(response.data[0]){
                this.setState({
                    returnedArr: response.data
                })
                this.setState({
                    returned: true
                })
            }
        })
        const {endpoint} = this.state;
        const socket = io(endpoint);
        socket.on('RoutesUpdate',()=>{
            axios.get(`/api/routes/${this.state.employeephone}`).then(response=>{
                console.log(response);
                if(response.data[0]){
                    this.setState({
                        returnedArr: response.data
                    })
                    this.setState({
                        returned: true
                    })
                }
            })
        })
    }

  
    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            this.setState({
                employeephone: nextProps.employeephone,
                
            })
        }
        axios.get(`/api/routes/${this.state.employeephone}`).then(response=>{
            
            if(response.data[0]){
                this.setState({
                    returned: true,
                    returnedArr: response.data
                })
                
            } else{
                this.setState({
                    returnedArr: [],
                    returned: false
                })
            }
        })
    }

 


    render(){
        
        return(
            <div style={{zIndex: this.props.z, width: '80%', display: 'flex', justifyContent:'center'}}>
            {
                (this.state.returned) ?
                <ReactTable
                style={{width: '100%'}}
                data={this.state.returnedArr}
                columns={[
                    { Header: 'Manager',
                        columns: [
                    {
                        Header: 'Group',
                        accessor: 'managerauthid'
                    }]
                    },
                    { 
                        Header: 'Destination',
                        columns: [
                    {
                        Header: 'Destination Latitude',
                        accessor: 'destlat'
                    },
                    {
                        Header: 'Destination Longitude',
                        accessor: 'destlon'
                    }]
                    },
                    { Header: 'Information',
                        columns: [
                    {
                        Header: 'Details',
                        accessor: 'description'
                    },
                    {
                        Header: 'Completion Status',
                        accessor: 'status',
                        Cell: row => (<span style={{color: row.value == 'incomplete' ? 'red': 'green'}}>{row.value}</span>)
                    }]
                    }
                ]}
                pageSizeOptions={[5,10]}
                defaultPageSize={5}
                />
                :
                <h3>No routes to display for this employee</h3>
            }
           </div>
        )
    }
}

export default RoutesHistory;

/*
<ReactTable
data={this.state.returnedArr}
columns={[
    {
        Header: 'Group',
        accessor: 'managerauthid'
    },
    {
        Header: 'Destination Latitude',
        accessor: 'destlat'
    },
    {
        Header: 'Destination Longitude',
        accessor: 'destlon'
    },
    {
        Header: 'Details',
        accessor: 'description'
    },
    {
        Header: 'Completion Status',
        accessor: 'status'
    }
]}
/>
*/