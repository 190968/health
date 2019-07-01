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
import MediaElement from './containers/MediaElement';
import CancerStageElement from './containers/CancerStageElement';
import DiagnosisElement from './containers/DiagnosisElement';
import ApElement from './containers/ApElement';

import TreatmentPlanBuilder from './containers/TreatmentPlanBuilder';
import BlankElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/BlankElementBuilder";
// import ApElementBuilder from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ApElementBuilder";
import { preparePlanElementMediaInput } from "../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/MediaElementBuilder";
import { TransitionManager } from '../../../../../Transitions/containers/TransitionManager';
import { HealthManager } from '../../../../../../../../../Health/containers/HealthManager';
import { preparePlanElementChecklistInput } from '../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ChecklistElementBuilder';
import { preparePlanElementApInput } from '../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ApElementBuilder';
import { preparePlanElementAssessmentInput } from '../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/AssessmentElementBuilder';
import { preparePlanElementClinicalNoteInput } from '../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ClinicalNoteElementBuilder';
import { preparePlanElementLinkInput } from '../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/LinkElementBuilder';
import { prepareTreatmentInput } from '../../../../../../../../../Health/components/Forms/containers/Treatment';
import { prepareDateInput } from '../../../../../../../../../../utils/datetime';
import { DischargePlanManager } from '../../../../../../../../../../components/Plan/components/DischargePlan/containers/Manager';
import CalculatorElementBuilder, { prepareTimelineCalculatorInput } from './containers/CalculatorElement';




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
    // debug, // print out the props here

    //branch(props => props.id !== '', PlanElementWithQuery),
    //branch(props => props.id !== '', withMutation, withAddMutation),
    mapProps(props => {
        console.log(props, 'droppable elmeennt');
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
        onSubmit: props => ({callback}) => {
            //
            const {type, form} = props;
            console.log(type, 'typetype');
            form.validateFields((err, values) => {

                if (!err) {
                    const {element = {}} = props;
                    const {id:elementId=''} = element;

                  
                    // console.log(otherValues, 'values');
                    //const datetime = moment(values.date).format('L');
                    const inputFromElement = prepareTimelineInput({values, type});
                    //console.log(values);
                    console.log(inputFromElement, 'inputFromElement');
                    let sourceInfo = {};
                    if (props.pathway) {
                        //console.log(props);
                        sourceInfo['type'] = 'pathway';
                        sourceInfo['id'] = props.pathway.id;
                        sourceInfo['elementId'] = elementId;
                    }
                    const input = {...inputFromElement, sourceInfo}
                    //console.log(input);
                    props.submitTimelineElement(input, type).then(() => {
                        // if (elementId !== '') {
                        //     message.success('Updated');
                        // } else {
                            message.success('Added to the Timeline');
                        // }

                        props.onHide();
                    });
                }
            });
        },
        modalTitle: props => () => {
            //console.log(props);
            const {type, element} = props;
            const {id} = element || {};
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
    withProps(props => {
        let {type} = props;
        switch(type) {
            case 'image':
            case 'video':
            case 'audio':
            case 'document':
                // newProps.typeMedia = type;
                type = 'media';
                break;
        }
        console.log(props, 'propstype');
        console.log(type);
        return {type}
    }),
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
        {when: ({type}) => type === 'discharge_plan', then: DischargePlanManager},
        {when: ({type}) => type === 'media', then: MediaElement },
        {when: ({type}) => type === 'new_transition', then: TransitionManager },
        {when: ({type}) => type === 'calculator', then: CalculatorElementBuilder },

    ]),

);


export default enhance(BlankElementBuilder);

const prepareTimelineInput = ({values, type}) => {
    const { timeline, ...otherProps } = values;
    const {notes, date, isCritical=false} = timeline || {};

    let input = {  notes, isCritical, date: prepareDateInput(date) };
    // input.brahms = prepareBrahmsInput(brahms);
    // console.log(type, 'type');
    // console.log(otherProps, 'otherProps');
    switch (type) {
        case 'checklist':
            input.optionsElement = preparePlanElementChecklistInput(otherProps);
            break;
        case 'ap':
            input.apElement = preparePlanElementApInput(otherProps);
            break;
        case 'assessment':
            input.assessmentElement = preparePlanElementAssessmentInput(otherProps);
            break;
        case 'clinical_note':
            input.clinicalNoteElement = preparePlanElementClinicalNoteInput(otherProps);
            break;
        case 'link':
            input.linkElement = preparePlanElementLinkInput(otherProps);
            break;
        case 'media':
            input.mediaElement = preparePlanElementMediaInput(otherProps);
            break;
        case 'treatment':
            input.treatmentElement = prepareTreatmentInput(otherProps);
            break;
        case 'calculator':
            input.calculatorElement = prepareTimelineCalculatorInput(otherProps);
            break;
    }
    // console.log(input, 'input');
    return input;
}

