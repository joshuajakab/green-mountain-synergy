import React, { useState } from 'react';
import './styles.css'

const Modal = ({ hideModal, toggleModal, children, hideManageModal, toggleManageModal, hideBlogModal, toggleBlogModal, hideTestModal, toggleTestModal, hideSubscribeModal, toggleSubscribeModal, hideOrderModal, toggleOrderModal }) => {
    if (hideModal) return null;
    if (hideManageModal) return null;
    if (hideBlogModal) return null;
    if (hideTestModal) return null;
    if (hideSubscribeModal) return null;
    if (hideOrderModal) return null;

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
