import React from 'react';
import { Form, message } from 'antd';
import PlanElementBuilderSelect from '../components/SelectElementType';
import PlanElementBuilderPure from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder';
import { compose, withProps, renderComponent, withState, branch, withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';
import { injectIntl } from 'react-intl';
import { prepareBrahmsInput } from '../../../../Brahms/components/Manager/containers/Field';
import { withCreateOrUpdatePlanElement } from '../mutations';
import { preparePlanElementChecklistInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/ChecklistElementBuilder';
import { preparePlanElementApInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/ApElementBuilder';
import { preparePlanElementClinicalNoteInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/ClinicalNoteElementBuilder';
import { preparePlanElementScaleInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/ScaleElementBuilder';
import { preparePlanElementTextInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/TextElementBuilder';
import { preparePlanElementTextInputInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/TextInputElementBuilder';
import { preparePlanElementTipboxInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/TipboxElementBuilder';
import { preparePlanElementTrackerInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/TrackerElementBuilder';
import { prepareTreatmentElementInput } from '../../../../../routes/Health/components/Forms/components/Treatment/containers/ElementManager';
import { preparePlanElementOptionsInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/OptionsElementBuilder';
import { preparePlanElementMediaInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/MediaElementBuilder';
import { preparePlanElementLinkInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/LinkElementBuilder';
import { preparePlanElementLineInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/LineElementBuilder';
import { preparePlanElementFileInputInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/FileInputElementBuilder';
import { preparePlanElementConditionInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/ConditionElementBuilder';
import { preparePlanElementCalculatorInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/CalculatorElementBuilder';
import { preparePlanElementAssessmentInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/AssessmentElementBuilder';
import { getPlanElementLabelFromElement } from '../../../utils';
import DefaultI18nEn from '../../../../../i18n/en';
import { prepareTreatmentInput } from '../../../../../routes/Health/components/Forms/containers/Treatment';
import PlanElementSchedule from '../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementManager/components/PlanElementSchedule';
import { formatPlanElementByTitle } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementSelect';


const enhance = compose(
    injectIntl,
    Form.create(),
    withState('type', 'setType', props => {
        const { element } = props;
        const { type } = element || {};
        return type
    }),
    branch(props => {
        const { type } = props;
        return !type;
    }, renderComponent(PlanElementBuilderSelect)),
    withCreateOrUpdatePlanElement,
    withHandlers({
        onSubmit: props => ({ callback }) => {
            // console.log(props, 'Props before input');
            let { type, order } = props;
            // console.log(props);
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    // prepare
                    switch(type) {
                        case 'image':
                        case 'video':
                        case 'audio':
                        case 'document':
                            // newProps.typeMedia = type;
                            type = 'media';
                            break;
                    }
                    let input = preparePlanElementInput({ values, order, type });

                    //input.extra = values.extra || null;
                    // add additional info

                    // if schedule - add schedule
                    // console.log(values, 'Element values');
                    // console.log(input, 'Element Input');
                    // console.log(props, 'props');
                    const hide = message.loading('Saving...');
                    if (props.addPathwayElement) {
                        props.addPathwayElement(input, type).then(({ data }) => {
                            hide();
                            if (props.onHide) {
                                props.onHide();
                            }
                            if (callback) {
                                callback(data.addPathwayElement);
                            }
                        });
                    } else if (props.addLessonElement) {
                        props.addLessonElement(input, type).then(({ data }) => {
                            hide();
                            if (props.onHide) {
                                props.onHide();
                            }
                            if (callback) {
                                callback(data.addLessonElement);
                            }
                        });
                    } else if (props.addActivityElement) {
                        props.addActivityElement(input, type).then(({ data }) => {
                            hide();
                            if (props.onHide) {
                                props.onHide();
                            }
                            if (callback) {
                                callback(data.addActivityElement);
                            }
                        });
                    } else if (props.addIntroElement) {
                        props.addIntroElement(input, type).then(({ data }) => {
                            hide();
                            if (props.onHide) {
                                props.onHide();
                            }
                            if (callback) {
                                callback(data.addIntroductionElement);
                            }
                        });
                    } else if (props.addChildElement) {
                        props.addChildElement(input, type).then(({ data }) => {
                            hide();
                            if (props.onHide) {
                                props.onHide();
                            }
                            if (callback) {
                                callback(data.addChildElement);
                            }
                        });
                    } else if (props.updateElement) {
                        props.updateElement(input).then(({ data }) => {
                            hide();
                            if (props.onHide) {
                                props.onHide();
                            }
                            if (callback) {
                                callback(data.updatePlanElement);
                            }
                        });
                    }
                }
            });
        },
        // formatGoToElement: props => element => {
        //     return 1;
        //     // return formatAssessmentGoToElement(element, props);
        // }
    }),
    withProps(props => {
        // console.log(props);
        const { intl, element, type } = props;
        const { id } = element || {};
        const elementTitle = id ? getPlanElementLabelFromElement(element) : formatPlanElementByTitle({type});
        const title = intl.formatMessage(DefaultI18nEn.addEditSomething, { edit: (id && id !== ''), title:elementTitle })
        return {
            modalTitle: title
        }
    }),
    withDrawer
);

// const enhance2 = compose(
//     withProps(props => {

//         return {
//             modalTitle: 'Edit'
//         }
//     }),
//     withDrawer
// );

 const managerDrawerHoc = WrappedComponent => {
     const aaaa = props => {
         return <>
         <WrappedComponent {...props} />
         <PlanElementSchedule {...props}   />
         </>
     }

     return enhance(aaaa);
 }

export const PlanElementBuilder = managerDrawerHoc(PlanElementBuilderPure);


const preparePlanElementInput = ({ order, values, type }) => {
    const { brahms, schedule, ...otherProps } = values;
    let input = { schedule, order };
    input.brahms = prepareBrahmsInput(brahms);
    console.log(type, 'type');
    console.log(otherProps, 'otherProps');
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
        case 'calculator':
            input.calculatorElement = preparePlanElementCalculatorInput(otherProps);
            break;
        case 'clinical_note':
            input.clinicalNoteElement = preparePlanElementClinicalNoteInput(otherProps);
            break;
        case 'condition':
        case 'decision':
            input.decisionElement = preparePlanElementConditionInput(otherProps);
            break;
        case 'fileInput':
            input.fileInputElement = preparePlanElementFileInputInput(otherProps);
            break;
        case 'line':
            input.lineElement = preparePlanElementLineInput(otherProps);
            break;
        case 'link':
            input.linkElement = preparePlanElementLinkInput(otherProps);
            break;
        case 'media':
            input.mediaElement = preparePlanElementMediaInput(otherProps);
            break;
        case 'options':
            input.optionsElement = preparePlanElementOptionsInput(otherProps);
            break;
        case 'scale':
            input.scaleElement = preparePlanElementScaleInput(otherProps);
            break;
        case 'text':
            input.textElement = preparePlanElementTextInput(otherProps);
            break;
        case 'textInput':
            input.textInputElement = preparePlanElementTextInputInput(otherProps);
            break;
        case 'tipbox':
            input.textElement = preparePlanElementTipboxInput(otherProps);
            break;
        case 'tracker':
            input.trackerElement = preparePlanElementTrackerInput(otherProps);
            break;
        case 'treatment':
            input.treatmentElement = prepareTreatmentInput(otherProps);
            break;
    }
    console.log(input, 'input');
    return input;
}
