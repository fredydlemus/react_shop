import React from 'react';
import '../styles/components/Products.css';
import Product from './Product';

const Products = ({products}) => {
    return (
        <div className="Products">
            <div className="Products-items">
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Products;