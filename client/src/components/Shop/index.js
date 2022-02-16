import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from '../../redux/Products/products.actions';
import Product from './Product';
import FormSelect from '../defaultComponents/Select';
import './styles.css';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
        //console.log(filterType)
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/shop/${nextFilter}`)
    };

    if (!Array.isArray(data)) return null;

    if (data.length < 1) {
        return (
            <div className='products'>
                <p>No results found.</p>
            </div>
        )
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Tinctures',
            value: 'tinctures'
        }, {
            name: 'Salves',
            value: 'salves'
        }],
        handleChange: handleFilter
    };


    return (
        <div className='products'>
            <h1 className='shop-title'>
                Affordability, Quality and Care
            </h1>

            {/*<FormSelect {...configFilters} /> */}

            <div className='products-container'>
                {data.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    //if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                    
                    const configProduct = {
                        ...product
                    }

                    return (
                        <Product key={pos} {...configProduct} />
                    )
                })}
            </div>
          
            
               
        </div>
    );
};

export default ProductResults;
