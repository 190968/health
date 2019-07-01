import React from 'react';
import {Form, Select,Card,  Button, Row, Col, Alert, Popover, Icon} from 'antd';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import {injectIntl} from 'react-intl';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import {ElementCalculatorFragment, ElementTrackerFragment, ElementTrackerReportFragment} from "../../fragments";
import TrackersReportModal from '../../../../components/Tracker/containers/TrackersReportModal.js'
import{replaceArray} from "../../../PlanLayout/components/PlanElementBuilder/components/CalculatorElementBuilder/components/CalculatorTest/index";
import CalculatorElementCustomFields from './components/CustomFields';
import { DragSource } from 'react-dnd';


export const prepareInput = (values) => {
    //const {t,n,m, stage} = values;
    return {
        calculatorElement: {
            values
        }
    }
}


const CalculatorElementResultLinePure = ({amid, userId, tracker, openReport, i, showNumbers=false}) => {
    return (<Row >
        <Col>{showNumbers && (i+1)+'. '}{tracker.label}</Col>
    </Row>);
}



const CalculatorElementResultPure = ({element, plan, date, userId, resultInfo: {value, formula, missingTrackers=[],  missingFields=[]}, openReport=false, toggleReport, onCalculate, loading}) => {
    if (value) {
        return (
            <Row gutter={16} style={{marginTop:10}}>
                <Col lg={12}>
                    <Alert
                        message={element.title}
                        description={value}
                        type="success"
                        showIcon
                    />
                </Col>
                <Col lg={12}>
                    <Alert
                        message="Formula"
                        description={element.title+'='+formula}
                        type="info"
                        showIcon
                    />
                </Col>
            </Row>
        )//'Calculated value:'+ + '('+formula+')';
    } else {
        if (openReport) {
            return <TrackersReportModal trackers={missingTrackers} date={date} userId={userId} plan={plan} onHide={toggleReport} />
        }
        let missingBlock = missingTrackers.map((tracker, i) => {
            return <CalculatorElementResultLinePure key={i} i={i} tracker={tracker} showNumbers={missingTrackers.length > 1} userId={userId} />;
        })

        let missingFieldsBlock = missingFields.map(field => {
            return <div>{field.label}</div>;
        })
        return <Alert

            message="Missing values for fields:"
    description={<div >{missingBlock} {missingFieldsBlock} {missingTrackers.length > 0 ? <div style={{marginTop:10}}><Button size="small" ghost type="primary" onClick={toggleReport}>Report on missing trackers</Button></div> : <Button type={'primary'} loading={loading} onClick={onCalculate}>Calculate</Button>}</div>}
            type="error"
            showIcon
        />;

    }
}




const draggableHoc = (ComponentBeingWrapped) => {

    function LayoutDraggable(props) {
        const {connectDragSource} = props;
        return connectDragSource(<div><ComponentBeingWrapped {...props} /></div>);
    }

    return LayoutDraggable
}


const boxSource = {
    beginDrag(props) {
        // console.log(props, 'beginDrag');
        const {element, resultInfo} = props;
        return {
            element:  {itemType:'calculator', details:{...element, resultInfo}}
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult();
        console.log(item, 'bebinDrop');
        if (dropResult) {
            props.onDrop(item);
        }
    },
}
const PlanElementDraggableHOC = DragSource('timelineElement', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}));

const CalculatorElementResult = compose(
    withState('openReport', 'setReport', false),
    withHandlers({
        toggleReport: props => value => {
            //console.log(props.openReport);
            props.setReport(!props.openReport);
            if (props.openReport) {
                console.log(props);
                props.onCalculate();
            }
        }
    }),
    branch(props => props.isDraggable, PlanElementDraggableHOC),
    branch(props => props.isDraggable, draggableHoc),
)(CalculatorElementResultPure);




const CalculatorElement = (props) => {
    const { userId, plan, date, loading, intl, element, onCalculate, resultView, resultInfo={}, isBuilderMode=false, onDrop, isDraggable, connectDragSource} = props;

    const {title = '', formulaString, tokens=[], calculatorCustomFields} = element;
    // console.log(element, 'elementelementelementelement');

    let find = [];
    let replace = [];
    let replaceValue = [];
    const trackersSource = tokens.map((tracker, i) => {
        //console.log(tracker);
        const {label=''} = tracker;
        const code = label.split(' ').join('_');
        find.push('@'+code);
        replace.push(tracker.label);
        return null;//
        //return {...tracker, key:tracker.id, i};
    });
    // console.log(find);
    // console.log(calculatorCustomFields);
    if (calculatorCustomFields) {
        calculatorCustomFields.map(field => {

            const {label=''} = field;
            const code = label.split(' ').join('_');
            // console.log(field);
            find.push('#'+code);
            replace.push(field.label);
            return null;
        });
    }
    // console.log(find);
    // console.log(replace);
    const content = (
        <div>
            {tokens.map(tracker => {
                const {getLastReport={}} = tracker;
                const value = getLastReport && getLastReport.value || 'N/A';
                return <Row key={tracker.id}>
                    <Col sm={12}>{tracker.label}</Col>
                    <Col sm={12}>{value}</Col>
                </Row>;
            })}
        </div>
    );

    const formulaFormatted = replaceArray(formulaString, find, replace);
    return (
        <Card title={title+'='+formulaFormatted}   bordered={false} extra={!isBuilderMode && <Popover content={content} title="Trackers" trigger="hover">
            <Icon type="info-circle-o" /></Popover>} >

                <CalculatorElementCustomFields fields={calculatorCustomFields} onChange={props.setCustomFieldValues} />
                {resultView ?
                <CalculatorElementResult userId={userId} date={date} plan={plan} element={element} resultInfo={resultInfo} onCalculate={onCalculate} loading={loading} onDrop={onDrop} isDraggable={isDraggable} connectDragSource={connectDragSource} />
                :
                <div style={{textAlign:'center', marginTop:10}}><Button type="primary" loading={loading} disabled={isBuilderMode} onClick={onCalculate}>{loading ? 'Calculating' : 'Calculate'}</Button></div>
            }
        </Card>
    );
}


const CalculateQuery = gql`
    query GET_CALCULATOR_RESULT ($planId: UID!, $id: UID!, $date: Date, $values: [IdValueInput]) {
        plan (id:$planId) {
            id
            getElement (id: $id) {
                id
                itemInfo {
                    ... on PlanElementCalculator {
                        ...CalculatorElement
                        getCalculation (date:$date, values: $values) {
                            value
                            formula
                            missingTrackers {
                                ...TrackerElement 
                                getLastReport {
                                    ...TrackerReportFields
                                }
                            }
                            missingFields {
                                id
                                label
                            }
                        }
                    }
                }
            }
        }
    }
    
    ${ElementTrackerFragment}
    ${ElementTrackerReportFragment}
    ${ElementCalculatorFragment}
`;

const calculateQueryOptions = {
    query: CalculateQuery,
    fetchPolicy: 'network-only'
}
const enhance = compose(
    injectIntl,
    withApollo,
    Form.create(),
    withState('customFieldValues', 'setCustomFieldValues', []),
    withState('loading', 'setLoading', false),
    withState('resultView', 'openResult', false),
    withState('resultInfo', 'setResultInfo', false),
    withHandlers({
        onCalculate: props => value => {
            // calculate
            //props.openResult(true);
            //console.log(props);
            const {customFieldValues} = props;

            calculateQueryOptions.variables = {
                planId:props.plan.id,
                id:props.actFieldId,
                date:props.date,
                values: customFieldValues
                //id: targetOption.value
            };
            props.setLoading(true);
            props.client.query(calculateQueryOptions).then(({loading, data}) => {
                if (!loading) {
                    props.setLoading(false);
                    const {plan: {getElement: {itemInfo: {getCalculation}}}} = data;
                    // do smth
                    props.setResultInfo(getCalculation);
                    props.openResult(true);
                }
            });
        }
    })
)



export default enhance(CalculatorElement);

