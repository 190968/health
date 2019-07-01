import React from 'react'
import { PlanElementsList } from '../../../../../../components/Plan/components/Body/containers/ElementsList';
import { LoadingPageSpinner } from '../../../../../../components/Loading';
import { filterSkippedPlanElements } from '../../../../../../components/Plan/utils';


const PathwayBody = (props) => {
    const {elements=[], loading, ...otherProps} = props;
    
    if (loading) {
        return <LoadingPageSpinner />;
    }
    // console.log(props, 'pathway body props');
    const {skippedElementsByRef} = otherProps;
    const filteredElements = filterSkippedPlanElements(elements, skippedElementsByRef);
    // console.log(filteredElements, 'filteredElementsfilteredElements');
    return <PlanElementsList {...props} mode="pathway" elements={filteredElements} />
}

export default PathwayBody;
