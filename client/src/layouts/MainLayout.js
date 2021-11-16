import React, { useState } from 'react';
import Header from '../components/Header';
import PhoneHeader from '../components/PhoneHeader';
import MenuIcon from '../components/MenuIcon';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { useWindowWidthAndHeight } from '../hooks';

const MainLayout = props => {

    const [width, height] = useWindowWidthAndHeight();
    const [menuOpen, setMenuOpen] = useState(false);

    const menuToggle = () => {
        setMenuOpen(menuOpen => !menuOpen)
    }
    

    return (
        <div className='fullHeight'>
            {width > 1000 ?
                <Header />
                :
                <div className='phone-header-container'>
                <PhoneHeader click={() => menuOpen && menuToggle()}/> 
                <MenuIcon click={menuToggle}/> 
                </div>
                
            }
            
            <div className='main'>
                {menuOpen && [
                    <Menu click={menuToggle}/>
                ]}
                {props.children}
            </div>

            <Footer/>

        </div>
    )
};

export default MainLayout;
