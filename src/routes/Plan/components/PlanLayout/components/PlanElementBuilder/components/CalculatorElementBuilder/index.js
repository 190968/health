import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Form, Input, Mention, Button} from 'antd';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import CalculatorTest from './components/CalculatorTest';
import Formula, {formatFormula} from './components/Formula';
import messages from './messages';
import { CustomOptionsList } from '../../../../../../../../components/FormCustomFields/containers/CustomOptionsList';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { toString, toContentState, Nav } = Mention;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

 class Tag extends React.Component {
     render() {
         const {data} = this.props;
         return (<span>
      111111
    </span>);

     }
};
Tag.propTypes = {
    data: PropTypes.object,
    children: PropTypes.any,
};

const getSuggestion = (tracker) => {
    //console.log(tracker);
    const tracker_code = tracker.label.split(' ').join('_');
    return <Nav
        value={tracker_code}
        data={tracker}
    >
        <span>{tracker.label} <span style={{color:'#ccc'}}>{tracker.units.name}</span> {tracker.isGlobal ? ' - Global' : ''}</span>
    </Nav>
}







const OptionItem = props => {
    const {value, onChange, updateFootnote} = props;
    const {label} = value || {} ;
    const onChange2 = e => {
        const {value} = props;
        const label = e.target.value;
        if (props.onChange) {
            props.onChange({...value, label});
        }
    }
    return <Input value={label} onChange={onChange2} />;
}


// const onSearchChange = (value) => {
//     const searchValue = value.toLowerCase();
//     const filtered = webFrameworks.filter(item =>
//         item.label.toLowerCase().indexOf(searchValue) !== -1
//     );
//     const suggestions = filtered.map(suggestion => getSuggestion(suggestion));
//     //this.setState({ suggestions });
// }

const CalculatorElementBuilder = (props) => {
    const {form, intl,  details={}, loading, trackers=[], onTest, showTest, validateFormula} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title, formulaString='', tokens:existingTrackers=[], calculatorCustomFields=[]} = details || {};
    // console.log(props);
    

    getFieldDecorator('trackers', {initialValue:existingTrackers});
    const formula = getFieldValue('formulaString');
    return (
        <React.Fragment>
            {showTest && <CalculatorTest title={title} form={form} formula={formula} trackers={trackers} onHide={props.onHideTest} />}
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue:title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Fields"
            >
             {getFieldDecorator('fields', {
                initialValue: calculatorCustomFields,
            })(
                <CustomOptionsList CustomComponent={OptionItem} blankItem={[]} buttonLabel={'Add Field'} />
            )}
            </FormItem> 

            {getFieldValue('title') &&
            <FormItem
                {...formItemLayout}
                label={'Formula'}
                extra="Use @ tag to select trackers. Use # tag to select custom fields. Please add a space before and after @ or #. \n You can use numbers, trackers, fields and +, -, (, ), * / ^"
            >
                {getFieldDecorator('formulaString', {
                        initialValue: formulaString,
                        rules: [{required: true, validator: validateFormula, message: "Enter Formula"}],
                    }
                )(
                    <Formula
                        loading={loading}
                        trackers={trackers}
                        fields={getFieldValue('fields')}
                        form={form}
                    />
                )}
            </FormItem>
            }



        </React.Fragment>
    );
}

const enhance = compose(
    injectIntl,

    withHandlers({

        // formatFormula: props => ( value) => {
        //     const formula = toString(value);
        //     const formulaString = formatFormula(formula);
        //     //
        //     // //console.log(formula);
        //     //
        //     //
        //
        //     //props.form.setFieldsValue({formulaString: toContentState(formulaString)})
        //     //console.log(props.form.getFieldsValue());
        // },
        validateFormula: props => (rule, value, callback) => {
            console.log(value);
            const formulaString = value;//toString(value);
            // const formulaString = formatFormula(formula);
            // replace all digits in formula

            //console.log(formulaString);
            // const { getFieldValue } = props.form
            if (formulaString && formulaString === '') {
                callback('Wrong formula')
            }
            callback();
        },
    })
);


export default enhance(CalculatorElementBuilder);