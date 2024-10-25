import React from 'react';
import Toast from 'react-native-toast-message';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWindowDimensions from '@hooks/useWindowDimensions';

function AppNotify() {
    const {isSmallScreenWidth} = useWindowDimensions();

    return isSmallScreenWidth ? <Toast /> : <ToastContainer />;
}

export default AppNotify;
