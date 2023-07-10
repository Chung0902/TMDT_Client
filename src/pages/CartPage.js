import React from 'react'
import Layout from './../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import DropIn from "braintree-web-drop-in-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// const { Option } = Select;
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };


const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance]= useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //payment
    // const formRef = React.useRef(null);
    // const onGenderChange = (value) => {
    //     switch (value) {
    //     case 'male':
    //         formRef.current?.setFieldsValue({
    //         note: 'Thanh toán khi nhân hàng',
    //         });
    //         break;
    //     case 'female':
    //         formRef.current?.setFieldsValue({
    //         note: 'Thanh toán bằng ví ShopCNPay',
    //         });
    //         break;
    //     case 'other':
    //         formRef.current?.setFieldsValue({
    //         note: 'Liên kết tài khoản ngân hàng',
    //         });
    //         break;
    //     default:
    //         break;
    //     }
    // };
    // const onFinish = (values) => {
    //     console.log(values);
    // };

    //handle Payments
    const handlePayment=async() =>{
        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod()
            const {data} = await axios.post('/api/v1/product/braintree/payment', {
                nonce,cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment Completed Successfully ')
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("vi-VN", {
                style:"currency",
                currency: "VND",
            });
        } catch (error) {
            console.log(error)
        }
    }

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index =myCart.findIndex((item) => item._id === pid );
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error)
        }
    };

    const getToken = async() => {
        try {
            const {data} = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        getToken()
    },[auth?.token]);

  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length
                            ? `You Have ${cart.length} items in your cart ${
                                auth?.token ? "" : "please login to checkout"
                            }`
                            : "You Cart is empty"}
                    </h4>
                </div>
            </div>
            <div className='row '>
                <div className='col-md-8'>
                    {cart?.map((p) => (
                        <div className='row md-2 p-3 card flex-row mb-3'>
                            <div className='col-md-4'>
                            <img src={`/api/v1/product/product-photo/${p._id}`} 
                                className="card-img-top" 
                                alt={p.name}
                                width="100px"
                                height={"auto"}
                            />
                            </div>
                            <div className='col-md-8'>
                                <p>Name : {p.name}</p>
                                <p>Description : {p.description.substring(0,30)}</p>
                                <p>Price : {p.price} VND</p>
                                <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-md-4 text-center'>
                    <h1 class="text-info">Cart Summary</h1>
                    <p>Total | Checkout | Payment</p>
                    <hr/>
                    <h3 class="text-danger">Total: {totalPrice()}</h3>
                    {auth?.user?.address ? (
                        <>
                            <div className='mb-3'>
                                <h4 class="text-warning">Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>
                                    Update Address
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='mb-3'>
                            {
                                auth?.token ? (
                                    <button className='btn btn-outline-warning' 
                                            onClick={() => navigate('/dashboard/user/profile')}>
                                        Update Address
                                    </button>
                                ) : (
                                    <button className='btn btn-outline-warning' 
                                            onClick={() => 
                                                navigate('/login',{
                                                    state: "/cart",
                                                }
                                                )}>
                                        Please Login to checkout
                                    </button>
                                )
                            } 
                        </div>
                    )}
                    <div className='mt-2'>
                        {
                            !clientToken || !cart?.length ? (""):(
                                <>
                                     <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal:{
                                                flow:'vault',
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button className='btn btn-primary' 
                                        onClick={handlePayment}
                                        disabled={!loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ..." : "Make Payment"}
                                        </button>
                                </>
                            )
                        }
                    </div>
                    <button type="button" class="btn btn-danger mt-3 " onClick={()=>{
                        toast.success("Đặt hàng thành công!")}
                    }>Order</button>
                      {/* <div className='mb-3'>
                      <h4 class="text-warning">Payment methods</h4>
                      <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        // initialValues="male"
                        style={{
                            maxWidth: 600,
                        }}
                        >
                        <Form.Item
                            name="note"
                            label="Note"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                            <Select
                            // placeholder="Chọn phương thức thanh toán"
                            onChange={onGenderChange}
                            defaultValue="male"
                            allowClear
                            >
                            <Option value="male" selected>Thanh toán khi nhận hàng</Option>
                            <Option value="female">Thanh toán bằng ví ShopCNPay</Option>
                            <Option value="other">Liên kết tài khoản ngân hàng</Option>
                            </Select>
                        </Form.Item>
                        </Form> */}
                    
                </div>
              
            </div>
        </div>
    </Layout>
  )
}

export default CartPage