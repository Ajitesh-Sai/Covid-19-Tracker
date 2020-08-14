import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import classes from './Charts.module.css'

const Charts = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ?(<Line 
            data= {{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed ),
                    label: 'Infected', 
                    borderColor: 'rgba(0, 0, 250, 0.9)',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths ),
                    label: 'Deaths', 
                    borderColor: 'rgba(250, 0, 0)',
                    backgroundColor: 'rgba(250, 0, 0, 0.2)',
                    fill: true
                }],                
            }}
        />) : null
    );

    const barChart = (
        confirmed
        ?(
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor:['rgba(150, 0, 0, 0.9)', 'rgba(0, 150, 0, 0.9)', 'rgba(150, 0, 0, 0.9)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options= {{
                    legend: {display: false},
                    title: {display: true, text:`Current state in ${country}`}
                }}
            />
        ):null
    )

    return(
        <div className={classes.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;