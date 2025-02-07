import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import type {TextInput} from 'react-native';
import {InteractionManager} from 'react-native';
import CONST from '@src/CONST';
import * as Ieatta from '@src/Ieatta';

type UseAutoFocusInput = {
    inputCallbackRef: (ref: TextInput | null) => void;
};

export default function useAutoFocusInput(): UseAutoFocusInput {
    const [isInputInitialized, setIsInputInitialized] = useState(false);
    const [isScreenTransitionEnded, setIsScreenTransitionEnded] = useState(false);

    // @ts-expect-error TODO: Remove this when Ieatta.js is migrated.
    const {isSplashHidden} = useContext(Ieatta.SplashScreenHiddenContext);

    const inputRef = useRef<TextInput | null>(null);
    const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isScreenTransitionEnded || !isInputInitialized || !inputRef.current || !isSplashHidden) {
            return;
        }
        const focusTaskHandle = InteractionManager.runAfterInteractions(() => {
            inputRef.current?.focus();
            setIsScreenTransitionEnded(false);
        });

        return () => {
            focusTaskHandle.cancel();
        };
    }, [isScreenTransitionEnded, isInputInitialized, isSplashHidden]);

    useFocusEffect(
        useCallback(() => {
            focusTimeoutRef.current = setTimeout(() => {
                setIsScreenTransitionEnded(true);
            }, CONST.ANIMATED_TRANSITION);
            return () => {
                setIsScreenTransitionEnded(false);
                if (!focusTimeoutRef.current) {
                    return;
                }
                clearTimeout(focusTimeoutRef.current);
            };
        }, []),
    );

    const inputCallbackRef = (ref: TextInput | null) => {
        inputRef.current = ref;
        setIsInputInitialized(true);
    };

    return {inputCallbackRef};
}
