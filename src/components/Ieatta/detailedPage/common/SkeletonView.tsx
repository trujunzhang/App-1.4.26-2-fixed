import React from 'react';
import {DetailedPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import {SkeletonViewType} from '@libs/FirebaseIeatta/list/constant';
import type {ISkeletonViewRow} from '@libs/FirebaseIeatta/list/types/rows/common';

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
