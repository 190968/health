import React from 'react'
import { PlanElementsList } from '../../../../../../components/Plan/components/Body/containers/ElementsList';
import { LoadingPageSpinner } from '../../../../../../components/Loading';
import { filterSkippedPlanElements } from '../../../../../../components/Plan/utils';


const PathwayBody = (props) => {
    const {elements=[], loading, ...otherProps} = props;
    
    if (loading) {
        return <LoadingPageSpinner />;
    }
    const {skippedElementsByRef} = otherProps;
    const filteredElements = filterSkippedPlanElements(elements, skippedElementsByRef);
    return <PlanElementsList {...props} elements={filteredElements} />
}

export default PathwayBody;
