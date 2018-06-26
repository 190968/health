import React from 'react';
import {Card} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import TreatmentPlanBuilderSideContent from './containers/TreatmentPlanBuilderSideContent';
import {withSpinnerWhileLoading} from "../../../../../../../../../../../../../../components/Modal";

export const TreatmentPlanBuilderSidePure = props => {
    const {tumorboard={}, us} = props;
    const {id=''} = tumorboard;
    let title = id !== '' ? 'Treatment Plan' : 'New Treatment Plan';
    return <Card title={title}>
        <TreatmentPlanBuilderSideContent {...props} />
    </Card>;
}

const enhance = compose(
    withSpinnerWhileLoading,
    withState('step', 'setStep', 0),// 0 - means the first step/body
);

export const TreatmentPlanBuilderSide = enhance(TreatmentPlanBuilderSidePure);
export default TreatmentPlanBuilderSide;
