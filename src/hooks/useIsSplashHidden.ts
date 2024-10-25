import {useContext} from 'react';
import {SplashScreenHiddenContext} from '@src/Ieatta';

type SplashScreenHiddenContextType = {isSplashHidden: boolean};

export default function useIsSplashHidden() {
    const {isSplashHidden} = useContext(SplashScreenHiddenContext) as SplashScreenHiddenContextType;
    return isSplashHidden;
}

export type {SplashScreenHiddenContextType};
