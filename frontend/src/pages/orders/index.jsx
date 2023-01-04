import { Wrapper } from '../../components/wrapper'
import React, { useEffect, useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import mascaraData from "../../utils/data";
import { useRouter } from "next/router";
import Router from 'next/router';
import Link from 'next/link'
import Head from "next/head"
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { setupAPIClient } from '../../services/api'

export default function Orders({ orders }) {

    const router = useRouter();
    const [termoBusca, setTermoBusca] = useState('');
    const [ordersList, setOrdersList] = useState([orders]);
    const [ordersSemItemsList, setOrdersSemItemsList] = useState([]);
    
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(0)
    const [precoTotalItem, setPrecoTotalItem] = useState(0)

    useEffect(() => {
        async function loadOrders() {
            const apiClient = setupAPIClient();

            const response = await apiClient.get('/items/detail');

            // const jsonData = 

            // console.log(data) 
            setPrice(response.data.items?.product?.price)

            setAmount(response.data.items?.amount)

            setPrecoTotalItem(parseFloat(amount) * parseFloat(price))
            setOrdersList(response.data)
        }

        loadOrders()
    }, [])

    useEffect(() => {
        async function loadOrdersSemItems() {
            const apiClient = setupAPIClient();

            const response = await apiClient.get('/orders/semitems');

            setOrdersSemItemsList(response.data)
        }

        loadOrdersSemItems()
    }, [])

    async function openOrder() {
        const apiClient = setupAPIClient();
        const response = await apiClient.post('/order')

        Router.push(`/orders/editOrder/${response.data.id}`)

    }


    return (
        <>
            <Head>
                <title>Ordens</title>
            </Head>
            <Wrapper>
                    <Button variant='outline-success mt-4' onClick={openOrder} >
                        Nova Ordem de Compra
                    </Button>
                <InputGroup className='mt-3 mb-3'>
                    <InputGroup.Text>Buscar:</InputGroup.Text>
                    <FormControl
                        onChange={(e) => { setTermoBusca(e.target.value) }}
                        placeholder='Buscar por nome do produto'
                    />
                </InputGroup>
                <table className='table table-striped table-hover'>
                    <thead className='table-dark mt-3'>
                        <tr>
                            <th scope='col'>Ordem de Compra sem Items</th>
                            <th scope='col'>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersSemItemsList.length === 0 ? (
                            <tr>
                                <td style={{ textAlign: 'center' }} >Nenhuma Ordem sem Itens Encontrada</td>
                            </tr>
                        ) : (
                            ordersSemItemsList.map(ordem => (
                                <tr key={ordem.id}>
                                    <td>{ordem.id}</td>
                                    <td>
                                        <div>
                                            <Button
                                                variant='btn btn-sm btn-outline-primary me-2'
                                                onClick={() => router.push("/orders/editOrder/" + ordem.id)}
                                            >
                                                Adicionar Items
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            )
                        }      
                    </tbody>
                </table>
                <table className='table table-striped table-hover'>
                    <thead className='table-dark mt-3'>
                        <tr>
                            <th scope='col'>Ordem de Compra</th>
                            <th scope='col'>Data H:mm:ss</th>
                            <th scope='col'>Produto</th>
                            <th scope='col'>Quantidade</th>
                            <th scope='col'>Preço</th>
                            <th scope='col'>Total</th>
                            <th scope='col'>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersList.filter((ordem) => {
                            if (termoBusca == '') {
                                return ordem
                            } else if (ordem.product.name.toLowerCase().includes(termoBusca.toLowerCase())) {
                                return ordem
                            }
                        })
                            .map(ordem => (
                                <tr key={ordem.id}>
                                    <td>{ordem.order_id}</td>
                                    <td>{mascaraData.aplicarMascaraDataHoraEmDataIso(ordem.created_at)}</td>
                                    <td>{ordem.product?.name}</td>
                                    <td>{ordem.amount}</td>
                                    <td><span>R$ </span>{ordem.product?.price}</td>
                                    <td><span>R$ </span>{parseFloat(parseFloat(ordem.product?.price) * parseFloat(ordem.amount))}</td>
                                    <td>
                                        <div>
                                            <Button
                                                variant='btn btn-sm btn-outline-primary me-2'
                                                onClick={() => router.push("/orders/editOrder/" + ordem.order_id)}
                                            >
                                                Adicionar Items
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Wrapper>
        </>
    )


}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/items/detail');
    console.log(response.data);


    return {
        props: {
            orders: response.data
        }
    }
})
