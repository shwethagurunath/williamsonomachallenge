import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsComponent from "../components/products.component";

const HomePage = () => {
    const productUrl = "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json";
    const [products, setProducts] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const [showErrorComponent, setShowErrorComponent] = useState(false);
    useEffect(() => {
        fetch(productUrl,  {mode: 'cors'}).then((response) => response.json()).then(responseJson => {
            setProducts(responseJson.groups);
        }).catch((err) => {
            setShowErrorComponent(true);
            console.error("Error in fetching data: ", err);
        }).finally(() => {
            setShowSpinner(false);
        });
        
    }, []);
    // Show spinner when data is loading
    return (
        <div>
            <h1>William Sonoma Coding Challenge</h1>
            {!showSpinner && !showErrorComponent && <ProductsComponent productList = {products}></ProductsComponent>}
        </div>
        // <SpinnerComponent></SpinnerComponent>
       

        // Pass the array data to card component
    )
};

export default HomePage;