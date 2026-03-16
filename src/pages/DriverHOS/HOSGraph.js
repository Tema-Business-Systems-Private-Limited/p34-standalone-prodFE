import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HOSGraph = () => {
    const data = {
        labels: ["M", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "N", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "M"],
        datasets: [
            {
                label: "HOS Status",
                data: [1, 1, 2, 2, 3, 1, 3, 3, 2, 1, 1, 3, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2],
                borderColor: "black",
                borderWidth: 2,
                stepped: true,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time (Hours)"
                }
            },
            y: {
                min: 0,
                max: 3,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        const status = ["OFF", "SB", "D", "ON"];
                        return status[value];
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">HOS Graph</Typography>
                <div style={{ height: 200 }}>
                    <Line data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

export default HOSGraph;
