import React, { useState } from 'react';
import Header from '../components/Header';
import PhoneHeader from '../components/PhoneHeader';
import MenuIcon from '../components/MenuIcon';
import Menu from '../components/Menu';
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
                <PhoneHeader /> &&
                <MenuIcon click={menuToggle}/> 
                
            }
            
            <div className='main'>
                {menuOpen && [
                    <Menu />
                ]}
                {props.children}
            </div>
        </div>
    )
};

export default MainLayout;
