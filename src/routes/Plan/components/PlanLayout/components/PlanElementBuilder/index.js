import React from 'react';
import {Select} from 'antd';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';
import ConditionElementBuilder from './containers/ConditionElementBuilder';
import TreatmentElementBuilder from './containers/TreatmentElementBuilder';
import AliasElementBuilder from './containers/AliasElementBuilder';
import {PlanElementWithQuery} from "../../components/PlanElement/containers/PlanElementManager";
import {withMutation, withAddMutation } from '../../components/PlanElementBuilder/mutations';
import ChecklistElementBuilder from "./containers/ChecklistElementBuilder";
import BlankElementBuilder from "./containers/BlankElementBuilder";
import LinkElementBuilder from "./containers/LinkElementBuilder";
import ClinicalNoteElementBuilder from "./containers/ClinicalNoteElementBuilder";
import ApElementBuilder from "./containers/ApElementBuilder";
import CalculatorElementBuilder from "./containers/CalculatorElementBuilder";
import AssessmentElementBuilder from "./containers/AssessmentElementBuilder";
import ScaleElementBuilder from "./containers/ScaleElementBuilder";
import FileInputElementBuilder from "./containers/FileInputElementBuilder";
import TextInputElementBuilder from "./containers/TextInputElementBuilder";
import OptionsElementBuilder from "./containers/OptionsElementBuilder";
import TextElementBuilder from "./containers/TextElementBuilder";
import LineElementBuilder from "./containers/LineElementBuilder";
import TipboxElementBuilder from "./containers/TipboxElementBuilder";
import EmbedElementBuilder from "./containers/EmbedElementBuilder";
import TrackerElementBuilder from "./containers/TrackerElementBuilder";
import MediaElementBuilder from "./containers/MediaElementBuilder";
import { conditionalWhenThen } from '../../../../../../utils/main';
import { prepareBrahmsInput } from '../../../../../../components/Brahms/components/Manager/containers/Field';
import { valueFromNode } from 'apollo-utilities';
import PlanBuilderElementSelect from '../../../../../../components/Plan/components/Builder/components/ElementSelect';
import { getPlanElementLabelFromElement } from '../../../../../../components/Plan/utils';



export const withPlanElementUnion = conditionalWhenThen([
        { when: ({type}) => type === 'condition', then: ConditionElementBuilder },
        { when: ({type}) => type === 'decision', then: ConditionElementBuilder },
        { when: ({type}) => type === 'treatment', then: TreatmentElementBuilder },
        { when: ({type}) => type === 'alias', then: AliasElementBuilder },
        { when: ({type}) => type === 'checklist', then: ChecklistElementBuilder  },
        { when: ({type}) => type === 'diagnosis', then: BlankElementBuilder  },
        { when: ({type}) => type === 'cancer_stage', then: BlankElementBuilder },
        { when: ({type}) => type === 'link', then: LinkElementBuilder },
        { when: ({type}) => type === 'clinical_note', then: ClinicalNoteElementBuilder },
        { when: ({type}) => type === 'ap', then: ApElementBuilder },
        { when: ({type}) => type === 'calculator', then: CalculatorElementBuilder },
        { when: ({type}) => type === 'assessment', then: AssessmentElementBuilder },
        { when: ({type}) => type === 'scale', then: ScaleElementBuilder },
        { when: ({type}) => type === 'textInput', then: TextInputElementBuilder },
        { when: ({type}) => type === 'fileInput', then: FileInputElementBuilder },
        { when: ({type}) => type === 'options', then: OptionsElementBuilder },
        { when: ({type}) => type === 'instruction', then: TextElementBuilder },
        { when: ({type}) => type === 'text', then: TextElementBuilder },
        { when: ({type}) => type === 'line', then: LineElementBuilder },
        { when: ({type}) => type === 'tipbox', then: TipboxElementBuilder },
        { when: ({type}) => type === 'embed', then: EmbedElementBuilder },
        { when: ({type}) => type === 'tracker', then: TrackerElementBuilder },
        { when: ({type}) => type === 'media', then: MediaElementBuilder },
        // { when: ({type}) => type === 'video', then: MediaElementBuilder },
        // { when: ({type}) => type === 'audio', then: MediaElementBuilder },
        // { when: ({type}) => type === 'ppt', then: MediaElementBuilder },
        // { when: ({type}) => type === 'pdf', then: MediaElementBuilder },
    ]);

const enhance = compose(
    // branch(props => props.element, PlanElementWithQuery),
    // branch(props => props.element, withMutation, withAddMutation),
    // mapProps(props => {
    //     let newProps = {...props};

    //     const type = props.type;

    //     switch(type) {
    //         case 'image':
    //         case 'video':
    //         case 'audio':
    //         case 'document':
    //             newProps.typeMedia = type;
    //             newProps.type = 'media';

    //             break;
    //     }
    //     const {element=null} = props;
    //     //console.log(props);
    //     //console.log(element);
    //     if (element) {
    //         const {itemInfo = null} = element;
    //         //console.log(itemInfo);
    //         if (itemInfo) {
    //             newProps = {...newProps, details:itemInfo, element: props.element};
    //         }
    //     }
    //     return newProps;
    // }),
    // Form.create(),
    withHandlers({
        formatGoToElement: props => elementId => {
            const {plan} = props;
            const {elements} = plan || {};
            const element = elements.find(q => q.id === elementId);
            
            return getPlanElementLabelFromElement(element);
        },
        GoToComponent: props => (propsFromComponent) => {
            const {onChange} = propsFromComponent;
            const {plan} = props;
            return <PlanBuilderElementSelect plan={plan} onChange={onChange} />;//1111</div>;
        }
    }),
    withPlanElementUnion,
);



export default enhance(BlankElementBuilder);


export const possiblePlanElementOptionsFormatter = props => {
    // console.log(1111);
    // console.log(props);
    const {id, label} = props || {};
    return {id, label};//<Select.Option key={value} value={value}>{label}</Select.Option>
}


export const possiblePlanElementOptionsSelectFormatter = props => {
    const {value, label} = props || {};
    console.log(props, 'propspropspropsprops');
    return <Select.Option key={value} value={value}>{label}</Select.Option>
}