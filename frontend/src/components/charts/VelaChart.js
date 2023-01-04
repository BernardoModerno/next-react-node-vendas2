import { setupAPIClient } from '../../services/api'
import { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';

const VelaChart = () => {
    const [chartData, setChartData] = useState({
        labels: {
            categories: [],
        },
        series: [
            {
                data: [],
            },
        ],
    });

    useEffect(() => {
        const apiClient = setupAPIClient();
        apiClient.get(`/items/detail`).then(response => {

            const data = response.data;
            const dataVenda = data.map(x => x.created_at);
            const myVenda = data.map(x => (x.product.price) * x.amount);

            setChartData({
                labels: {
                    categories: dataVenda,
                },
                series: [
                    {
                        data: myVenda,
                    },
                ],
            });
        });
    }, []);

    const options = {
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <ApexChart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="candlestick"
            height={480}
            width={640}
        />
    );
};

export default VelaChart;