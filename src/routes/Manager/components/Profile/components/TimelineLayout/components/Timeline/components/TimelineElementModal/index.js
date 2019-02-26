import React from 'react';
import PropTypes from 'prop-types';
import {Modal, message, Form, Input, Divider, Switch} from 'antd';
import { compose, branch, renderComponent, withProps, withHandlers, withState, mapProps} from 'recompose';
import moment from 'moment';
import {getTimelineElementTitle} from "../TimelineElementSelect/index";

//import {PlanElementWithQuery} from "../../components/PlanElement/containers/PlanElementManager";
//import {withMutation, withAddMutation } from '../../components/PlanElementBuilder/mutations';
import TreatmentElement from './containers/TreatmentElement';
import ClinicalNoteElement from './containers/ClinicalNoteElement';
import ClinicalTrialElement from './containers/ClinicalTrialElement';
import LinkElement from './containers/LinkElement';
import ChecklistElement from './containers/ChecklistElement';
import CancerStageElement from './containers/CancerStageElement';
import DiagnosisElement from './containers/DiagnosisElement';
import ApElement from './containers/ApElement';

import TreatmentPlanBuilder from './containers/TreatmentPlanBuilder';
import BlankElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/BlankElementBuilder";
// import ApElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ApElementBuilder";
import MediaElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/MediaElementBuilder";
import { TransitionManager } from '../../../../../Transitions/containers/TransitionManager';
import { HealthManager } from '../../../../../../../../../Health/containers/HealthManager';




// const createFormField = Form.createFormField;
//
// const formItemLayout = {
//     labelCol: {span: 6},
//     wrapperCol: {span: 18},
// };
// const formTailLayout = {
//     labelCol: {span: 6},
//     wrapperCol: {span: 20, offset: 4},
// };


const debug = withProps(console.log);

const conditionalRender = (states) =>
    compose(...states.map(state =>
        branch(state.when, renderComponent(state.then))
    ));

const enhance = compose(
    debug, // print out the props here

    //branch(props => props.id !== '', PlanElementWithQuery),
    //branch(props => props.id !== '', withMutation, withAddMutation),
    mapProps(props => {

        if (props.element) {
            const details = props.element.itemInfo;
            return {...props, details, type:props.element.itemType, resetInitInfo:true};
        } else if (props.item) {
            const {item} = props;
            const details = item.activity;
            return {...props, details, type:item.type, element: item};
        }
        return props;
    }),
    Form.create(),
    withHandlers({
        handleSave: props => ({prepareInput, input, callback}) => {
            //
            //console.log(input);
            props.form.validateFields((err, values) => {

                if (!err) {
                    const {element = {}} = props;
                    const {id:elementId=''} = element;

                    const {timeline={}, ...otherValues} = values;
                    const {notes='', date, isCritical=false} = timeline;

                    console.log(otherValues, 'values');
                    //const datetime = moment(values.date).format('L');
                    const inputFromElement = prepareInput(otherValues);
                    //console.log(values);
                    console.log(inputFromElement, 'inputFromElement');
                    let sourceInfo = {};
                    if (props.pathway) {
                        //console.log(props);
                        sourceInfo['type'] = 'pathway';
                        sourceInfo['id'] = props.pathway.id;
                        sourceInfo['elementId'] = elementId;
                    }
                    const input = {...inputFromElement, notes, sourceInfo, isCritical, date: moment(date).format('YYYY-MM-DD')}
                    //console.log(input);
                    props.submitTimelineElement(input).then(() => {
                        if (elementId !== '') {
                            message.success('Updated');
                        } else {
                            message.success('Added');
                        }

                        props.onHide();
                    });
                }
            });
        },
        modalTitle: props => () => {
            //console.log(props);
            const {type, element={}} = props;
            const {id} = element;
            if (id) {
                return 'Edit '+getTimelineElementTitle(type);
            }
            //console.log(element);
            return 'Add '+getTimelineElementTitle(type);
        }
    }),
    branch(props => {
        const {element={}} = props;
        const {activity=false} = element;
        return activity;
    }, withProps(
        props => {
            //console.log(props);

            const {element} = props;
            const {activity} = element;

            return {
                element: {
                    ...element,
                    itemInfo: {
                        ...activity,
                    }
                }
            }

        }
    )),

    conditionalRender([
        {when: ({type}) => type === 'treatment', then: TreatmentElement},
        {when: ({type}) => type === 'checklist', then: ChecklistElement},
        {when: ({type}) => type === 'diagnosis', then: DiagnosisElement},
        {when: ({type}) => type === 'cancer_stage', then: CancerStageElement},
        {when: ({type}) => type === 'link', then: LinkElement},
        {when: ({type}) => type === 'clinical_note', then: ClinicalNoteElement},
        {when: ({type}) => type === 'clinical_trial', then: ClinicalTrialElement},
        {when: ({type}) => type === 'health', then: HealthManager},
        {when: ({type}) => type === 'ap', then: ApElement},
        {when: ({type}) => type === 'treatment_plan', then: TreatmentPlanBuilder},
        {when: ({type}) => type === 'media', then: MediaElementBuilder },
        {when: ({type}) => type === 'new_transition', then: TransitionManager },

    ]),

);


export default enhance(BlankElementBuilder);
