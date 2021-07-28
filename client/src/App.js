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
import Home from './components/Home';
import AdminPage from './components/AdminPage';

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
        <Route path='/shop' render={() => (
          <MainLayout>

          </MainLayout>
        )} />
        <Route path='/about' render={() => (
          <MainLayout>

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
      </Switch>
    </div>
  );
}

export default App;
