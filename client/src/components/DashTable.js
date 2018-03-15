import React from 'react'
import axios from 'axios'
import io from 'socket.io-client';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from 'react-loader'

const style = {
    height: 'auto',
    width: 'auto',
    margin: 20,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
  };

class DashTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            returned: false,
            returnedArr: [],
            arrayCopy: [],
            endpoint: 'http://localhost:5000'
        }
    }


    componentDidMount(){
        axios.get(`/api/dashRoutes`).then(response=>{
            console.log(response);
            if(response.data[0]){
                this.setState({
                    returnedArr: response.data,
                    arrayCopy: response.data
                })
                this.setState({
                    returned: true
                })
            }
        })
        const {endpoint} = this.state;
        const socket = io(endpoint);
        socket.on('RoutesUpdate',()=>{
            axios.get(`/api/dashRoutes`).then(response=>{
                console.log(response);
                if(response.data[0]){
                    this.setState({
                        returnedArr: response.data,
                        arrayCopy: response.data
                    })
                    this.setState({
                        returned: true
                    })
                }
            })
        })
    }


    componentWillReceiveProps(nextProps){
        axios.get(`/api/dashRoutes`).then(response=>{
            
            if(response.data[0]){
                this.setState({
                    returnedArr: response.data,
                    arrayCopy: response.data
                })
                this.setState({
                    returned: true
                })
            }else{
                this.setState({
                    returned: false,
                    returnedArr: []
                })
            }
        })
    }

    filterComplete(){
        let myArr = this.state.arrayCopy.filter((curr)=>{
            return curr.status == 'complete'
        })
       this.setState({
           returnedArr: myArr
       })
    }

    filterIncomplete(){
        let myArr = this.state.arrayCopy.filter((curr)=>{
            return curr.status == 'incomplete'
        })
       this.setState({
           returnedArr: myArr
       })
    }

    setOriginal(){
        this.setState({
            returnedArr: this.state.arrayCopy
        })
    }


    render(){
        
        return(
            <div style={{marginRight: 0, width: '100%', flexWrap: 'wrap', display: 'flex', justifyContent:'space-around', alignItems: 'center'}}>
            {
                (this.state.returned) ?
                <ReactTable
                style={{width: '80%'}}
                data={this.state.returnedArr}
                columns={[
                    { Header: 'Employee',
                        columns: [
                    {
                        Header: 'Name',
                        accessor: 'name'
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
                <Loader loaded={this.state.returned} />
            }
            <div style={{height: 170, display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <RaisedButton
            label="Filter Complete"
            onClick={()=>this.filterComplete()}
            />
            <RaisedButton
            label="Filter Incomplete"
            onClick={()=>this.filterIncomplete()}
            />
            <RaisedButton
            label="View Original"
            onClick={()=>this.setOriginal()}
            />
            </div>
           </div>
        )
    }
}

export default DashTable;