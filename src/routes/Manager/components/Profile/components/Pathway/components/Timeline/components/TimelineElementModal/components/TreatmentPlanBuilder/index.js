import React from 'react';
import { Row, Col, Card } from 'antd';
import PanelGroup from 'react-panelgroup';
import moment from 'moment';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import TreatmentPlanBuilderSide from './components/TreatmentPlanBuilderSide/containers/TreatmentPlanBuilderSideContent';
import {compose, withHandlers, withState} from 'recompose';
import {withTreatmentPlanAddElementMutation} from './mutations';
import TreatmentPlanElementPreview from './containers/TreatmentPlanElementPreview';
//import PathwayContent from './containers/PathwayContent';
//import TimelineElementDetails from '../../components/Pathway/components/Timeline/containers/TimelineElementDetails'

const TreatmentPlanBuilder = props => {
    const {user, treatmentPlan, loading, viewNote=false, tmpElements=[], setTmpElements, onSubmit, onDrop, onHide, appendElement} = props;
    const span = 12;
    return <Row>
            <Col>
              <TreatmentPlanBuilderSide onDrop={onDrop} onHide={onHide} user={user} onSubmit={onSubmit} treatmentPlan={treatmentPlan} loading={loading} elements={tmpElements}  updateElements={setTmpElements} appendElement={appendElement} />
            </Col>
            {viewNote && <TreatmentPlanElementPreview element={viewNote} user={user} userId={user.id} onSave={props.saveElement} onCancel={props.onCancel} />}
        </Row>

}

const enhance = compose(
    withTreatmentPlanAddElementMutation,
    withState('viewNote', 'setViewNote', false),// 0 - means the first item
    withHandlers({
        onDrop: props => (element) => {
            const {item} = element;
            props.setViewNote(item);
            console.log('drop');
        },
        onCancel: props => () => {
            props.setViewNote(false);
        },
        /**
         * Save element when we drop the element and add notes
         * @param props
         */
        
        saveElement: props => (notes='') => {
            const {tmpElements=[], viewNote:item} = props;
            const{id} = item;
            const newTmpElement = {...item, id:'', timelineId:id, notes};
            const newTmpElements = [...tmpElements, newTmpElement];
            props.setTmpElements(newTmpElements);
            props.setViewNote(false);
        },
        appendElement: props => (element) => {
            const {tmpElements=[]} = props;
            const newTmpElement = {...element, id:''};
            const newTmpElements = [...tmpElements, newTmpElement];
            console.log(newTmpElements);
            props.setTmpElements(newTmpElements);
            props.setViewNote(false);
        },
    }),
)

export default enhance(TreatmentPlanBuilder);
