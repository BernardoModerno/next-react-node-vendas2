import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from 'chart.js'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { Bar } from 'react-chartjs-2';
import { setupAPIClient } from '../../services/api'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, )



const BarChart = () => {
  const [chart, setChart] = useState({})
  const [chart2, setChart2] = useState({})

  useEffect(() => {
    async function loadProducts() {
        const apiClient = setupAPIClient();
  
        const response = await apiClient.get('/product');

        setChart(response.data)
    }
      
    loadProducts()
  }, [])

  useEffect(() => {
    async function loadCategories() {
        const apiClient = setupAPIClient();
  
        const response = await apiClient.get('/category');

        setChart2(response.data)
    }
      
    loadCategories()
  }, [])

  console.log("chart", chart);
  var data = {
    labels: "Produtos",
    datasets: [
    {
      label: `${chart?.length} Produtos`,
      data: `${chart?.length}`,
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    },
    {
        label: `${chart2?.length} Categorias`,
        data: `${chart2?.length}`,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }
],
    
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
              color: 'rgba(153, 102, 255, 1)',
              display: true,
              text: 'Número de Categorias e Produtos Cadastrados'
            }
          }
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        width={300}
        options={options}

      />
    </div>
  )
}

export default BarChart

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
  
    const response = await apiClient.get('/product');
    console.log(response.data);
  
  
    return {
      props: {
        products: response.data
      }
    }
  })