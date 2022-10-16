import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(...registerables);

const BarChart = (props) => {
    console.log(props.data);
  return(
    <div>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [
              {
                // Label for bars
                label: "Ounces of Plastic",
                // Data or value of your each variable
                data: props.data,
                // Color of each bar
                backgroundColor: "black",
                // Border color of each bar
                borderColor: "black",
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
  </div>
  )
}
export default BarChart