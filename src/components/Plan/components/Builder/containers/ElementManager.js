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
import { preparePlanElementAliasInput } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElementBuilder/containers/AliasElementBuilder';
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
import PlanElementSchedule from '../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementManager/containers/PlanElementSchedule';
import { formatPlanElementByTitle } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementSelect';
import { withLoadingButton } from '../../../../Loading';


const enhance = compose(
    injectIntl,
    Form.create(),
    withState('type', 'setType', props => {
        const { element, type:typeElement } = props;
        const { type=typeElement } = element || {};
        return type
    }),
    branch(props => {
        const { type } = props;
        return !type;
    }, renderComponent(PlanElementBuilderSelect)),
    withCreateOrUpdatePlanElement,
    withLoadingButton,
    withHandlers({
        onSubmit: props => ({ callback:callbackInput }) => {
            // console.log(props, 'Props before input');
            let { type, order } = props;
            // console.log(props);
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                // console.log(props);
                // console.log(type);
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
                    // console.log(type);
                    let input = preparePlanElementInput({ values, order, type });

                    const callback = () => {
                        if (props.updateCurrentElement) {
                            props.updateCurrentElement(order);
                        }
                        if (callbackInput) {
                            callbackInput();
                        }
                    }
                     
                    const hide = message.loading('Saving...');
                    props.setLoadingButton(true);
                    if (props.addPathwayElement) {
                        props.addPathwayElement(input, type).then(({ data }) => {
                            hide();
                            props.setLoadingButton(false);
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
                            props.setLoadingButton(false);
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
                            props.setLoadingButton(false);
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
                            props.setLoadingButton(false);
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
                            props.setLoadingButton(false);
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
                            props.setLoadingButton(false);
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
    }),
    withProps(props => {
        // console.log(props);
        const { intl, element, type } = props;
        const { id } = element || {};
        const elementTitle =   formatPlanElementByTitle({type});
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
     const PlanElementManagerHOC = props => {
        //  console.log(props);
         return <>
         <WrappedComponent {...props} />
         <PlanElementSchedule {...props}   />
         {/* <PlanElementSchedule {...this.props} formItemLayout={formItemLayout} /> */}
         </>
     }

     return enhance(PlanElementManagerHOC);
 }

export const PlanElementBuilder = managerDrawerHoc(PlanElementBuilderPure);


const preparePlanElementInput = ({ order, values, type }) => {
    const { brahms, schedule, ...otherProps } = values;
    let input = { schedule, order };
    input.brahms = prepareBrahmsInput(brahms);
    // console.log(type, 'type');
    // console.log(otherProps, 'otherProps');
    switch (type) {
        case 'checklist':
            input.optionsElement = preparePlanElementChecklistInput(otherProps);
            break;
        case 'alias':
            input.aliasElement = preparePlanElementAliasInput(otherProps);
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
        case 'dropdown':
        case 'radio_input':
        case 'choice_input':
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
    // console.log(input, 'input');
    return input;
}
