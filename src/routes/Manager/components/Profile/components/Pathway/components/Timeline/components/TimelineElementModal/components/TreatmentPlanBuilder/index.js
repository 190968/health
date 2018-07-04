import React from 'react';
import { Row, Col, Card } from 'antd';
import PanelGroup from 'react-panelgroup';
import moment from 'moment';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from '../../../../../../containers/Timeline';
import TreatmentPlanBuilderSide from './containers/TreatmentPlanBuilderSide';
import TumorBoardPreview from './containers/TumorBoardPreview';
import {compose, withHandlers, withState} from 'recompose';
import {withTreatmentPlanAddElementMutation} from './mutations';
//import PathwayContent from './containers/PathwayContent';
//import TimelineElementDetails from '../../components/Pathway/components/Timeline/containers/TimelineElementDetails'

const TreatmentPlanBuilder = props => {
    const {user, treatmentPlan, loading, viewNote=false, tmpElements=[], setTmpElements, onSubmit} = props;
    console.log(props);
    const span = 12;
    return <Row>
            <Col span={span} style={{marginRight:'-1px'}}>
                <Timeline userId={user.id} draggable onDrop={props.onDrop} onlyFilters /*togglePathway={this.togglePathway} showPathway={showPathway}   showElement={this.toggleElementView} activeElement={activeElement}*/ />
            </Col>
            <Col span={span}>
              <TreatmentPlanBuilderSide user={user} onSubmit={onSubmit} treatmentPlan={treatmentPlan} loading={loading} elements={tmpElements}  updateElements={setTmpElements} />
            </Col>
            {viewNote && <TumorBoardPreview element={viewNote}  userId={user.id} onSave={props.saveElement} onCancel={props.onCancel} />}
        </Row>

}

const enhance = compose(
    withTreatmentPlanAddElementMutation,
    withState('viewNote', 'setViewNote', false),// 0 - means the first item
    withHandlers({
        onDrop: props => (element) => {
            const {item} = element;
            props.setViewNote(item);
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
    }),
)

export default enhance(TreatmentPlanBuilder);
