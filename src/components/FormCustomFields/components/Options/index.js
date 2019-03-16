import React from 'react';
import {withHandlers, withState, defaultProps, compose, withStateHandlers} from 'recompose';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import './index.less';
import {OptionsList} from './containers/List';
const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};

export const DragHandle = SortableHandle(({style}) => <Tooltip title="Sort"><span className="sorter-handler" style={{...style, verticalAlign:'baseline'}}></span></Tooltip>);


 
const OptionsPure = (props) => {
    const {required=true, options=[], formItemLayout=formItemLayoutDefault, form} = props;
    // console.log(props);
        return <FormItem
                //optionsErrors
            {...formItemLayout}
            label={props.title}
            required={required}
            >
                {form.getFieldDecorator(`options`, {
                    initialValue: options
                })(
                    <OptionsList {...props} />
                )}
            </FormItem>;
}

const enhance = compose(
    defaultProps({
        minOptions:1,
        useDragHandle:true,
        title:'Options',
        // options: []
    }),



    


    /*withState('options', 'setOption', props => props.options),
    withState('uuid', 'setUUID', props => props.options.length),
    withState('keys', 'setKeys',  props => {
        return Object.keys(props.options);// save keys
    }),

    withHandlers({
        add: props => event => {
            const keys = props.keys;
            let uuid = props.uuid;
            const nextKeys = keys.concat(uuid);
            uuid++;
            props.setUUID(uuid);
            props.setKeys(nextKeys);
        },
        remove: props => k => {
            const {keys, form} = props;
            //const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length <= props.minOptions) {
                return;
            }
            const keysfiltered = keys.filter(key => key !== k);
            //console.log(keysfiltered);
            props.setKeys(keysfiltered);
            //props.form.setFieldsValue({keys});
            // update keys
            // remove
            //console.log(keysfiltered);
            // form.setFieldsValue({
            //     keys: []
            // });
        }
    }),*/
    // withHandlers({
        
    // })
)

export const Options = enhance(OptionsPure);
export default Options;