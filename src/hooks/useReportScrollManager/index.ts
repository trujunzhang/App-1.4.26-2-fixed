import {ActionListContext} from '@expPages/home/ReportScreenContext';
import {useCallback, useContext} from 'react';
import type ReportScrollManagerData from './types';

function useReportScrollManager(): ReportScrollManagerData {
    const {flatListRef} = useContext(ActionListContext);

    /**
     * Scroll to the provided index. On non-native implementations we do not want to scroll when we are scrolling because
     */
    const scrollToIndex = useCallback(
        (index: number, isEditing?: boolean) => {
            if (!flatListRef?.current || isEditing) {
                return;
            }

            flatListRef.current.scrollToIndex({index, animated: true});
        },
        [flatListRef],
    );

    /**
     * Scroll to the bottom of the flatlist.
     */
    const scrollToBottom = useCallback(() => {
        if (!flatListRef?.current) {
            return;
        }

        flatListRef.current.scrollToOffset({animated: false, offset: 0});
    }, [flatListRef]);

    return {ref: flatListRef, scrollToIndex, scrollToBottom};
}

export default useReportScrollManager;
