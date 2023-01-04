import { canSSRAuth } from '../../utils/canSSRAuth'
import { Wrapper } from '../../components/wrapper'
import { Container } from 'react-bootstrap'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import BarChart from '../../components/charts/BarChart'
import { setupAPIClient } from '../../services/api'
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import Dash from '../../components/Dashboard'
//import foo from '../foo.js';
const Dash = dynamic(import('../../components/Dashboard/index.jsx'), { ssr: false });

export default function Dashboard() {

  return <Dash />
  
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   const apiClient = setupAPIClient(ctx);

//   const response = await apiClient.get('/product');
//   console.log(response.data);


//   return {
//     props: {
//       products: response.data
//     }
//   }
// })

