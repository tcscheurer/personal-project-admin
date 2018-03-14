import React, {Component} from 'react';
import {PieChart} from 'react-d3-components';
import axios from 'axios';
import _ from 'lodash'

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
            <div>
            {(this.state.data[0]) ?
            <PieChart
                data={chartData}
                width={700}
                height={400}
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