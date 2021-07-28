import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CKEditor} from 'ckeditor4-react';
import Button from '../defaultComponents/Button';
import Select from '../defaultComponents/Select';
import Input from '../defaultComponents/Input';
import Modal from '../defaultComponents/Modal';
import { fetchProductsStart, addProductStart, deleteProductStart } from '../../redux/Products/products.actions';
import './styles.css'

const mapState =({ productsData }) => ({
    products: productsData.products
});

const AdminPage = props => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [hideManageModal, setHideManageModal] = useState(true);
    const [productCategory, setProductCategory] = useState('tinctures');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productSize, setProductSize] = useState('fiveHundredPrice')
    const [fiveHundredPrice, setFiveHundredPrice] = useState(0);
    const [oneThousandPrice, setOneThousandPrice] = useState(0);
    const [twoThousandPrice, setTwoThousandPrice] = useState(0);
    const [productDesc, setProductDesc]= useState('');
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );
    }, []);

    const toggleModal = () => setHideModal(!hideModal);
    const toggleManageModal = () => setHideManageModal(!hideManageModal);

    const configManageModal = {
        hideManageModal,
        toggleManageModal
    };

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('tinctures');
        setProductName('');
        setProductThumbnail('');
        setFiveHundredPrice(0);
        setOneThousandPrice(0);
        setTwoThousandPrice(0);
        setProductDesc('');
    };

    const handleSubmit = e => {
        e.preventDefault();
    
        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productSize,
                fiveHundredPrice,
                oneThousandPrice,
                twoThousandPrice,
                productDesc
            })
        );
        resetForm();
    };

    return (
        <div className='admin-container'>
            <div className='actions'>

                
                    <Button onClick={() => toggleModal()}>
                        <h2>Add New Product</h2>
                    </Button>
                    <Button onClick={() => toggleManageModal()}>
                        <h2>Manage Products</h2>
                    </Button>

                
            </div>

            <Modal {...configModal}>
                <div className='add-new-product'>
                    <form onSubmit={handleSubmit}>
                        <h2>Add New Product</h2>
                        <Select
                            label='Category'
                            options={[{
                                value: 'tinctures',
                                name: 'Tinctures'
                            },
                            {
                                value: 'salves',
                                name: 'Salves'
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}>
                        </Select>

                        <Input
                            label='Name'
                            type='text'
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <Input 
                            label='Image URL'
                            type='url'
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <Select
                            label='Size'
                            options={[{
                                value: 'fiveHundredPrice',
                                name: '500 mg Price'
                            },
                            {
                                value: 'oneThousandPrice',
                                name: '1000 mg Price'
                            },
                            {
                                value: 'twoThousandPrice',
                                name: '2000 mg Price'
                            }]}
                            handleChange={e => setProductSize(e.target.value)}
                        />

                        {productSize === 'fiveHundredPrice' && 

                        <Input  
                            label='500 mg Price'
                            type='number'
                            min='0.00'
                            max='10000.00'
                            step='0.01'
                            value={fiveHundredPrice}
                            onChange={e => setFiveHundredPrice(e.target.value)}
                        />
                        }

                        {productSize === 'oneThousandPrice' && 

                        <Input  
                            label='1000 mg Price'
                            type='number'
                            min='0.00'
                            max='10000.00'
                            step='0.01'
                            value={oneThousandPrice}
                            onChange={e => setOneThousandPrice(e.target.value)}
                        />
                        }

                        {productSize === 'twoThousandPrice' && 

                        <Input  
                            label='2000 mg Price'
                            type='number'
                            min='0.00'
                            max='10000.00'
                            step='0.01'
                            value={twoThousandPrice}
                            onChange={e => setTwoThousandPrice(e.target.value)}
                        />
                        }

                        <CKEditor
                            onChange={evt => setProductDesc(evt.editor.getData())}
                        />

                        <Button type='submit'>
                            Add product
                        </Button>

                        <Button onClick={() => toggleModal()} >
                            Cancel
                        </Button>

                        
                    </form>
                </div>
            </Modal>

            <Modal {...configManageModal} >
                <h2>Manage Products</h2>
                <div className='manage-products-container'>
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
                        
                            <div key={index}>
                                <div>
                                    {productThumbnail}
                                </div>
                                <div>
                                    {productName}
                                </div>
                                <div>
                                    {productSize}
                                </div>
                                {productSize === 'fiveHundredPrice' &&
                                <div>
                                    {fiveHundredPrice}
                                </div>
                                }
                                {productSize === 'oneThousandPrice' &&
                                <div>
                                    {oneThousandPrice}
                                </div>    
                                }
                                {productSize === 'twoThousandPrice' &&
                                <div>
                                    {twoThousandPrice}
                                </div>    
                                }
                                <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                    Delete
                                </Button>

                            </div>
                        
                    )
                    })}
                    <Button onClick={() => toggleManageModal()}>
                        <h2>Exit</h2>
                    </Button>
                </div>
                                        
            </Modal>


        </div>
    )
};

export default AdminPage;
