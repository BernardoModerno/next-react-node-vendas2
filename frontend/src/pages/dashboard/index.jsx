import { canSSRAuth } from '../../utils/canSSRAuth'
import { Wrapper } from '../../components/wrapper'
import { Container } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import BarChart from '../../components/charts/BarChart'
import { setupAPIClient } from '../../services/api'
import Head from 'next/head';


export default function Dashboard({products}){

  
   return (
      <>   
          <Head>
            <title>Dashboard</title>
          </Head>
          <Wrapper>
              <Container className='container text-center mt-3'>
                <BarChart />
              </Container>
          </Wrapper>
      </> 
   )
  

}

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
