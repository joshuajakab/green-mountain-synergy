import React from 'react';
import 'styles.css';

const Shop = props => {

    const fetchProducts = () => {

    try {
        const response = await client.catalogApi.retrieveCatalogObject('QZEQSRNMTCXWXQD2QLEVCSRA',
        1598396203556);
      
        console.log(response.result);
      } catch(error) {
        console.log(error);
      }
    }

    return (
        <div></div>
    )
};

export default Shop;
