import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/Users/users.actions';
//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import './default.css';
import MainLayout from './layouts/MainLayout';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import About from './components/About';
import Register from './components/Register';
import Shop from './components/Shop';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import ProductCard from './components/ProductCard';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Testing from './components/Testing';
import PaymentDetails from './components/PaymentDetails';
import MailchimpFormContainer from './components/MailchimpFormContainer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <MainLayout >
            <Home />
          </MainLayout>
        )} />
        <Route exact path='/shop' render={() => (
          <MainLayout>
            <Shop />
          </MainLayout>
        )} />
        <Route path='/shop/:filterType' render={() => (
          <MainLayout>
            <Shop />
          </MainLayout>
        )} />
        <Route path='/product/:productID' render={() => (
          <MainLayout>
            <ProductCard />
          </MainLayout>
        )} />
        <Route path='/about' render={() => (
          <MainLayout>
            <About />
          </MainLayout>
        )} />
        <Route path='/contact' render={() => (
          <MainLayout>

          </MainLayout>
        )} />
        <Route path='/signin' render={() => (
          <MainLayout >
            <SignIn />
          </MainLayout>
        )} />
        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <MainLayout >
              <AdminPage />
            </MainLayout>
          </WithAdminAuth>
        )} />
        <Route path='/register' render={() => (
          <MainLayout >
            <Register />
          </MainLayout>
        )} />
        <Route path='/cart' render={() => (
          <MainLayout >
            <Cart />
          </MainLayout>
        )} />
        <Route exact path='/blog' render={() => (
          <MainLayout>
            <Blog />
          </MainLayout>
        )} />
        <Route path='/blog/:filterType' render={() => (
          <MainLayout>
            <Blog />
          </MainLayout>
        )} />
        <Route path='/faq' render={() => (
          <MainLayout>
            <FAQ />
          </MainLayout>
        )} />
        <Route path='/terms-conditions' render={() => (
          <MainLayout>
            <Terms />
          </MainLayout>
        )} />
        <Route path='/privacy-policy' render={() => (
          <MainLayout>
            <Privacy />
          </MainLayout>
        )} />
        <Route path='/testing' render={() => (
          <MainLayout>
            <Testing />
          </MainLayout>
        )} />
        <Route path='/payment' render={() => (
          <MainLayout>
            <PaymentDetails />
          </MainLayout>
        )} />
        <Route path='/subscribe' render={() => (
          <MainLayout>
            <MailchimpFormContainer />
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}

export default App;
