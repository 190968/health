import React from 'react';
import { Row, Col, Card } from 'antd';
import PanelGroup from 'react-panelgroup';
import moment from 'moment';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from '../../components/Pathway/containers/Timeline';
import TumorboardSide from './containers/TumorboardSide';
import {compose, withHandlers} from 'recompose';
//import PathwayContent from './containers/PathwayContent';
//import TimelineElementDetails from '../../components/Pathway/components/Timeline/containers/TimelineElementDetails'

const Tumorboard = props => {
    const {user, tumorboard, loading} = props;
    const span = 12;
    return <DragDropContextProvider backend={HTML5Backend}>
        <Row>
            <Col span={span} style={{marginRight:'-1px'}}>
                <Timeline userId={user.id} draggable onDrop={props.onDrop} filters={['tumorboard']} /*togglePathway={this.togglePathway} showPathway={showPathway}   showElement={this.toggleElementView} activeElement={activeElement}*/ />
            </Col>
            <Col span={span}>
                <TumorboardSide userId={user.id} tumorboard={tumorboard} loading={loading} /*pathway={this.state.pathway} setPathway={this.setPathway}*/ />
            </Col>
        </Row>
    </DragDropContextProvider>
}



const enhance = compose(
    withHandlers({
        onDrop: props => (element) => {
            console.log(props, 'Drop');
            console.log(element, 'Drop');
            const {item} = element;
            const {id} = item;
            // add element to the list of tumorboard elements

            props.onAndElement(props.tumorboard.id,id);
            // props.setOpenTimelineModal(true);
            // props.setTimelineElementToAdd(element);
            //
            // let currentInOrder = parseInt(props.currentInOrder);
            // props.setCurrentInOrder(currentInOrder+1);
        }
    }),
)

export default enhance(Tumorboard);