import React from 'react';
import {TumorboardElementCard} from "../../../../../Tumorboard/components/TumorboardView/components/TumorboardElements/index";
import {TumorboardNotesForm} from './components/TumorboardNotesForm';
export const TumorBoardPreview = props => {
    const {element, userId, form} = props;
    return  <React.Fragment>
        <TumorboardElementCard element={element} key={element.id} userId={userId} />
        <div style={{marginTop:10}}><TumorboardNotesForm form={form} /></div>
    </React.Fragment>;
}