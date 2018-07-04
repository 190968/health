import React from 'react';
import {compose, branch, renderComponent, withProps, withState} from 'recompose';

import TreatmentPlanBodyEditor from '../components/TreatmentPlanBodyEditor';
import TreatmentPlanBodyBuilder from './TreatmentPlanBodyBuilder';
import TreatmentPlanInvite from './TreatmentPlanInvite';
// import {TumorboardView} from "../../../../../../Tumorboard/components/TumorboardView";


const enhance = compose(
    withState('id', 'setId'),

    branch(props => props.step === 1, renderComponent(TreatmentPlanBodyBuilder)),
    branch(props => props.step === 2, renderComponent(TreatmentPlanInvite)),
    //branch(props => props.step === 3, renderComponent(TumorboardView))
);

export default enhance(TreatmentPlanBodyEditor);
