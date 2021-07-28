import React, { useState } from 'react';
import './styles.css'

const Modal = ({ hideModal, toggleModal, children, hideManageModal, toggleManageModal }) => {
    if (hideModal) return null;
    if (hideManageModal) return null;

    return [
        <div className='modalOverlay' >
            <div className='modalWrap'>
                <div className='modal'>
                    {children}
                </div>
            </div>
        </div>
    ];
}

export default Modal;
