import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
// import Moment from 'react-moment';
const Orders = () => {
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const {data} = await axios.get('/api/v1/auth/orders')
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(auth?.token) getOrders();
    }, [auth?.token]);

  return (
    <Layout title={"Your orders"}>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {
                        orders?.map((o,i) => {
                            return(
                                <div className='border shadow'>
                                    <table className='table'>
                                        {/* <thead>
                                            <tr>
                                                <td scope='col'>#</td>
                                                <td scope='col'>Status</td>
                                                <td scope='col'>Buyer</td>
                                                <td scope='col'>Orders</td>
                                                <td scope='col'>Payment</td>
                                                <td scope='col'>Quantity</td>
                                            </tr>
                                        </thead> */}
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Orders</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>{i+1}</th>
                                                <td>{o?.products}</td>
                                                <td>{o?.buyer?.name}</td>
                                                {/* <td>{Moment(o?.createAt).fromNow()}</td> */}
                                                <td>{o?.payment.Success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders