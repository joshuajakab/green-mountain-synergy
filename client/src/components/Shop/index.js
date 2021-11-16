import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Shop = props => {

  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState('tinctures');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productSize, setProductSize] = useState('fiveHundredPrice')
  const [fiveHundredPrice, setFiveHundredPrice] = useState(0);
  const [oneThousandPrice, setOneThousandPrice] = useState(0);
  const [twoThousandPrice, setTwoThousandPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const { data, queryDoc, isLastPage } = products;

  return (
    <div>
      <div className='products-container'>
        {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
          const {
            productName,
            productThumbnail,
            productSize,
            fiveHundredPrice,
            oneThousandPrice,
            twoThousandPrice,
            documentID
          } = product;

          return (

            <div key={index} className='product'>
              <div>
                <img src={productThumbnail} alt='product' />
              </div>
              <div>
                <h3>{productName}</h3>
              </div>
              {productSize === 'fiveHundredPrice' &&
                <div>
                  <h3>${fiveHundredPrice}</h3>
                </div>
              }
              {productSize === 'oneThousandPrice' &&
                <div>
                  <h3>${oneThousandPrice}</h3>
                </div>
              }
              {productSize === 'twoThousandPrice' &&
                <div>
                  <h3>${twoThousandPrice}</h3>
                </div>
              }
              

            </div>

          )
        })}
        
      </div>
    </div>
  )
};

export default Shop;
