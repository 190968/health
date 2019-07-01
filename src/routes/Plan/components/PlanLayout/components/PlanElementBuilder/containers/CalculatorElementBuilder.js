import React from 'react';
import { compose, withHandlers, withState} from 'recompose';
import CalculatorElementBuilderPure from '../components/CalculatorElementBuilder';
import {Button} from 'antd';
import { withDrawer } from '../../../../../../../components/Modal';

export const CalculatorElementBuilder = CalculatorElementBuilderPure;

const enhance = compose(
    withState('showTest', 'openTest', false),
    withHandlers({
        // onSubmit: props => callback => {
        //     if (!props.id || props.form.isFieldsTouched()) {
        //         props.handleSave({prepareInput, callback:props.onHide} );
        //     } else {
        //         props.onHide();
        //     }
        // },
        onTest: props => value => {
            props.openTest(true);
        },
        onHideTest: props => value => {
            props.openTest(false);
        },
    }),
)


const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            return props.id ? 'Edit Calculator' : 'Add Calculator';
        },
        modalFooter: props => values => {
            return [
                <Button key="cancel" onClick={props.onHide}>Cancel</Button>,
                <Button key="test" type="primary" ghost onClick={props.onTest}>Test</Button>,
                <Button key="next" type="primary" onClick={props.onSubmit}>Save</Button>
            ]

        },
    }),
    // withDrawer
    // modalHOC,
)

export default enhanceWithModal(CalculatorElementBuilder);



export const preparePlanElementCalculatorInput = (values) => {
    const {title, formulaString, fields, trackers=[]} = values;
    // console.log(values, 'calculator values');
    return {
            title,
            formulaString:formulaString,
            calculatorCustomFields:fields,
            trackers:trackers.map(t=>t.id)
    }
}