import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { Toast, toast } from "react-hot-toast";
import Swiper from "swiper";
import ProductGallery from "../components/ProductGallery";
import { FaRocketchat, FaCommentDollar, FaCommentDots } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



   //get all cat
   const getAllCategory = async () => {
    try {
        const {data} = await axios.get("/api/v1/category/get-category");
        if(data.success){
            setCategories(data.category);
        }
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getAllCategory();
    getTotal();
},[]);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  //getTotal Count
  const getTotal = async () => {
    try {
      const {data} = await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if(page === 1) return;
    loadMore();
  },[page]);

  //get more
  const loadMore = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const {data} = await axios.post('/api/v1/product/product-filters', {checked, radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={'All Products - Best offers'}>
      <ProductGallery/>
      <div className="section-two d-flex">
        <div className="info-box">
            <div className="icon_4">
              <FaRocketchat/>
            </div>
            <div className="info-content">
                <h4>FREE SHIPPING & RETURN</h4>
                <p>Free shipping on all orders over $99.</p>
            </div>
        </div>
        <div className="info-box">
            <div className="icon_4">
              <FaCommentDollar/>
            </div>
            <div className="info-content">
                <h4>MONEY BACK GUARANTEE</h4>
                <p>100% money back guarantee</p>
            </div>
        </div>
        <div className="info-box">
            <div className="icon_4">
              <FaCommentDots/>
            </div>
            <div className="info-content">
                <h4>ONLINE SUPPORT 24/7</h4>
                <p>orem ipsum dolor sit amet..</p>
            </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-2 filter_1 filter_2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

        {/* price filter */}

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={ e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
            {/* reset filter */}
          <div className="d-flex flex-column">
            <button className="btn btn-primary bt_filter" 
                    onClick={() => window.location.reload()}>RESET FILTER</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((p) => (
              <div className="card m-2" style={{width: '18rem'}} >
                <img src={`/api/v1/product/product-photo/${p._id}`} 
                    className="card-img-top "
                    width={"100px"}
                    height={"300px"}  
                    alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text"> {p.price} VND</p>
                  <button className="btn btn-primary ms-1 bt_md"
                  onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button 
                    className="btn btn-secondary ms-1 bt_add"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Item Added to cart")
                    }}
                    >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button 
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
