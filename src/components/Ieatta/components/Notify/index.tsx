import React from 'react';
import Toast from 'react-native-toast-message';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useResponsiveLayout from '@hooks/useResponsiveLayout';

function AppNotify() {
    const {isSmallScreenWidth} = useResponsiveLayout();

    return isSmallScreenWidth ? <Toast /> : <ToastContainer />;
}

export default AppNotify;
