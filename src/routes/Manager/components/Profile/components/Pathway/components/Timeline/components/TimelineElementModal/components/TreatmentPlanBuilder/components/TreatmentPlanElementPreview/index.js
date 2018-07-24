import React from 'react';
import {Divider} from 'antd';
import { TumorboardElementCard } from '../TreatmentPlanBuilderSide/components/TreatmentPlanBodyBuilder/components/TreatmentPlanElements';
import { TumorboardNotesForm } from '../../../../../../../../../Tumorboard/components/TumorBoardPreview/components/TumorboardNotesForm';

const TreatmentPlanElementPreview = props => {
    const {element, userId, form} = props;
    return  <React.Fragment>
        <TumorboardElementCard element={element} key={element.id} userId={userId} />
        <Divider>Add Notes</Divider>
       <TumorboardNotesForm form={form} />
    </React.Fragment>;
}

export default TreatmentPlanElementPreview;