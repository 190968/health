import React from 'react';
import {withHandlers, withState, compose} from 'recompose';
import { Row, Col, Card } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TumorBoardPreview from '../../../../components/Profile/components/Tumorboard/containers/TumorBoardPreview';
import {TumorboardCaseBodyBuilder} from "./containers/TumorboardCaseBodyBuilder";
import { Timeline } from '../../../Profile/components/TimelineLayout/containers/Timeline';

export const TumorboardCaseEditor = props => {
    const {user, tumorboard, loading, viewNote=false, caseElements=[], setCaseElements} = props;
    const span = 12;
    return <Row>
            <Col span={span} style={{marginRight:'-1px'}}>
                <Timeline user={user} draggable onDrop={props.onDrop} onlyFilters />
            </Col>
            <Col span={span}>
                <TumorboardCaseBodyBuilder elements={caseElements} tumorboard={tumorboard} updateElements={setCaseElements} />
            </Col>
            {viewNote && <TumorBoardPreview element={viewNote} editable={true}  userId={user.id} onSave={props.saveElement} onCancel={props.onCancel} />}
        </Row>;
}



const enhance = compose(
    DragDropContext(HTML5Backend),
    withState('viewNote', 'setViewNote', false),
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
            const {caseElements=[], viewNote:item} = props;
            const{id} = item;
            const newCaseElement = {...item, id:'', timelineId:id, notes};
            // // add element to the list of tumorboard elements
            // const tumorboardId = getTumorboardId(props);
            // props.onAndElement(tumorboard.id,id, notes);


            const newCaseElements = [...caseElements, newCaseElement];
            props.setCaseElements(newCaseElements);
            props.setViewNote(false);
        },
    }),
    
)

export default enhance(TumorboardCaseEditor);