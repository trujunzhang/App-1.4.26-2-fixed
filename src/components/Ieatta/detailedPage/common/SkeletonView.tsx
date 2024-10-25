import React from 'react';
import {DetailedPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import {SkeletonViewType} from '@libs/Firebase/list/constant';
import type {ISkeletonViewRow} from '@libs/Firebase/list/types/rows/common';

type SkeletonViewProps = {
    rowData: ISkeletonViewRow;
};

function SkeletonView({rowData}: SkeletonViewProps) {
    const {skeletonViewType} = rowData;
    switch (skeletonViewType) {
        case SkeletonViewType.EVENTS_IN_RESTAURANT: {
            return <DetailedPageSkeletonView possibleVisibleContentItems={3} />;
        }
        default: {
            return null;
        }
    }
}

export default React.memo(SkeletonView);
