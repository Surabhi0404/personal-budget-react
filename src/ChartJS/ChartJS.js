import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Pie} from 'react-chartjs-2';

function ChartJS() {
    const [chartData, setChartData] = useState({})
    const [budgetData, setBudgetData] = useState([])
    const [budgetTitle, setBudgetTitle] = useState([])

    const chart = () => {
        let budData = [];
        let budLabel = [];
        axios.get('http://localhost:3000/budget')
        .then(res =>{
            console.log(res);
            for(const dataObj of res.data.myBudget){
                budData.push(parseInt(dataObj.budget))
                budLabel.push(dataObj.title)
            }
            setChartData({
                labels: budLabel,
                datasets: [
                    {
                        data: budData,
                        backgroundColor: ['#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#9A7D0A',
                        '#27AE60',
                        '#D0D3D4',
                        '#34495E']
                    }
                ]
            })
        })
        .catch(err =>{
            console.log(err);
        })
        console.log(budData, budLabel);

       
    }
    useEffect(()=>{
        chart()
    }, [])
  return (
      <div>
          <Pie data = {chartData}/>
      </div>
      
  );
}

export default ChartJS;
