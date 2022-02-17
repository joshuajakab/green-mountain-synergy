import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from 'ckeditor4-react';
import Button from '../defaultComponents/Button';
import Select from '../defaultComponents/Select';
import Input from '../defaultComponents/Input';
import Modal from '../defaultComponents/Modal';
import { fetchProductsStart, addProductStart, deleteProductStart } from '../../redux/Products/products.actions';
import { addBlogStart } from '../../redux/Blogs/blogs.actions';
import './styles.css'
import FormInput from '../defaultComponents/Input';
import { apiInstance } from '../../Utils';

const mapState = ({ productsData, blogsData }) => ({
    products: productsData.products,
    blogs: blogsData.blogs
});

const AdminPage = props => {
    const { products, blogs } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [hideManageModal, setHideManageModal] = useState(true);
    const [hideBlogModal, setHideBlogModal] = useState(true);
    const [productCategory, setProductCategory] = useState('tinctures');
    const [productName, setProductName] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productThumbnailTwo, setProductThumbnailTwo] = useState('');
    const [productThumbnailThree, setProductThumbnailThree] = useState('');
    const [productSize, setProductSize] = useState('fiveHundredPrice')
    const [fiveHundredPrice, setFiveHundredPrice] = useState(0);
    const [oneThousandPrice, setOneThousandPrice] = useState(0);
    const [twoThousandPrice, setTwoThousandPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [blogCategory, setBlogCategory] = useState('news');

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );
    }, []);

    const toggleModal = () => setHideModal(!hideModal);
    const toggleManageModal = () => setHideManageModal(!hideManageModal);
    const toggleBlogModal = () => setHideBlogModal(!hideBlogModal);
      
    

    const configBlogModal = {
        hideBlogModal,
        toggleBlogModal
    };

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

    const resetBlogForm = () => {
        setBlogCategory('news');
        setBlogTitle('');
        setBlogImage('');
        setBlogContent('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        apiInstance.post('/item', {productCategory: productCategory, abbreviation: abbreviation, productName: productName, productDesc: productDesc })
        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productThumbnailTwo,
                productThumbnailThree,
                productSize,
                price,
                productDesc
            })
        );
        resetForm();
    };

    const handleBlogSubmit = e => {
        e.preventDefault();
        //console.log('WRONG PLACE!')
        dispatch(
            addBlogStart({
                blogTitle,
                blogImage,
                blogContent,
                blogCategory
            })
        );
        resetBlogForm();
    }

    return (
        <div className='admin-container'>
            <div className='actions'>


                <Button onClick={() => toggleModal()}>
                    <h2>Add New Product</h2>
                </Button>
                <Button onClick={() => toggleManageModal()}>
                    <h2>Manage Products</h2>
                </Button>
                <Button onClick={() => toggleBlogModal()}>
                    <h2>Add Blog Post</h2>
                </Button>
                


            </div>

            <Modal {...configModal} className='modal'>
                <div className='add-new-product-container'>
                    <form onSubmit={handleSubmit} className='add-new-product-form'>
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
                            label='2 Letter Abbreviation'
                            type='text'
                            value={abbreviation}
                            handleChange={e => setAbbreviation(e.target.value)}
                        />

                        <Input
                            label='Image URL 1'
                            type='url'
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <Input
                            label='Image URL 2'
                            type='url'
                            value={productThumbnailTwo}
                            handleChange={e => setProductThumbnailTwo(e.target.value)}
                        />

                        <Input
                            label='Image URL 3'
                            type='url'
                            value={productThumbnailThree}
                            handleChange={e => setProductThumbnailThree(e.target.value)}
                        />

                     {/*    <Select
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
                        } */}
                        <Input 
                            label='Price'
                            type='number'
                            min='0.00'
                            max='10000'
                            step='.01'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />

                        <CKEditor
                            onChange={evt => setProductDesc(evt.editor.getData())}
                        />

                        <div className='button-container'>

                            <Button type='submit'>
                                Add Product
                            </Button>

                            <Button onClick={() => toggleModal()} >
                                Cancel
                            </Button>

                        </div>

                    </form>
                </div>
            </Modal>

          <Modal {...configManageModal} className='modal'>
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
                            price,
                            documentID
                        } = product;

                        return (

                            <div key={index}>
                                <div>
                                    <img src={productThumbnail} alt='thumb' />
                                </div>
                                <div>
                                    {productName}
                                </div>
                                {/*<div>
                                    {productSize}
                                </div>*/}
                               {/*} {productSize === 'fiveHundredPrice' &&
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
                                } */}
                                <div>
                                    {price}
                                </div>
                                <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                    <h3>Delete</h3>
                                </Button>

                            </div>

                        )
                    })}
                    <Button onClick={() => toggleManageModal()}>
                        <h2>Exit</h2>
                    </Button>
                </div>

                </Modal> 

              <Modal {...configBlogModal} className='modal'>
                <div className='add-new-post-container'>
                    <form onSubmit={handleBlogSubmit} className='add-new-post-form'>
                        <h2>Add a Post</h2>
                        <Select
                            label='Category'
                            options={[{
                                value: 'news',
                                name: 'News'
                            },
                            {
                                value: 'education',
                                name: 'Education'
                            },
                            {
                                value: 'fun',
                                name: 'Fun'
                            }]}
                            handleChange={e => setBlogCategory(e.target.value)}
                        />
                        <Input
                            label='Post Title'
                            type='text'
                            value={blogTitle}
                            handleChange={e => setBlogTitle(e.target.value)}
                        />
                        <Input
                            label='Image Url'
                            type='url'
                            value={blogImage}
                            handleChange={e => setBlogImage(e.target.value)}
                        />
                        <CKEditor
                            onChange={evt => setBlogContent(evt.editor.getData())}
                        />
                        
                        <div className='button-container'>
                            <Button type='submit'>
                                Add Post
                            </Button>
                            <Button type='button' onClick={() => toggleBlogModal()} >
                                Exit
                            </Button>
                            
                        </div>
                       
                    </form>

                    
                    
                </div>

            </Modal> 


        </div>
    )
};

export default AdminPage;
