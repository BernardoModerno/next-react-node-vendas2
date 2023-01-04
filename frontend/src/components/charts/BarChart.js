import { setupAPIClient } from '../../services/api'
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
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
    plotOptions: {
      bar: {
        vertical: true,
        columnWidth: '45%',
        distributed: true,
      },
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="380"
    />
  );
};

export default BarChart;