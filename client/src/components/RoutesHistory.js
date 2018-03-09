import React from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import io from 'socket.io-client';

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
                returned: false,
                returnedArr: []
            })
        }
        axios.get(`/api/routes/${this.state.employeephone}`).then(response=>{
            
            if(response.data[0]){
                this.setState({
                    returnedArr: response.data
                })
                this.setState({
                    returned: true
                })
            }
        })
    }

    componentWillUpdate(nextState){
        return true;
    }


    render(){
        
            const routesDisplay = this.state.returnedArr.map((curr,i)=>{
                return(
                    <Paper key={i} style={style} zDepth={5}>
                    <div>
                        <h1>{curr.name}</h1>
                        <p>{`Status: ${curr.status}`}</p>
                        <p>{`Description: ${curr.description}`}</p>
                        <p>{`Destination Latitude: ${curr.destlat}`}</p>
                        <p>{`Destination Longitude: ${curr.destlon}`}</p>
                        
                    </div>
                    </Paper>
                )
            })
            
        return(
            <div>
            {
                (this.state.returned) ?
                routesDisplay
                :
                <h3>No routes to display for this employee</h3>
            }
            </div>
        )
    }
}

export default RoutesHistory;