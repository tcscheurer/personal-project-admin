import React, {Component} from 'react';
import {PieChart} from 'react-d3-components';
import axios from 'axios';
import _ from 'lodash';
import '../styles/Dashboard.css';

class DashPie extends Component{

    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        axios.get('/api/getAllRoutes').then(response=>{
            this.setState({
                data: response.data
            })
        }).catch(err=>console.log(err))
    }

    render(){
        console.log(this.state.data);
        const values = this.state.data.map(curr=>{
            return{
                x: curr.name,
                y: curr.count
            }
        })
        const chartData = {
            label: 'Routes completed',
            values: [...values]
        }

        
        return(
            <div className='pie-chart-container'>
            {(this.state.data[0]) ?
            <PieChart
                data={chartData}
                width={780}
                height={500}
                sort={null}
            />
            :
            false
            }
            </div>
        )

    }
}

export default DashPie;