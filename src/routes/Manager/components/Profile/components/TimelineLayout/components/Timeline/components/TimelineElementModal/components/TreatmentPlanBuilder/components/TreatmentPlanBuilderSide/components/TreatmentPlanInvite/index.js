import React from 'react';
import {Form,Button, Radio, Input, message} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import {PeopleSelect} from '../../../../../../../../../../../../../../../../components/Autosuggest/containers/PeopleSelect';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayoutDefault = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const TreatmentPlanInvite = props => {
    const {form, formItemLayout=formItemLayoutDefault, tumorboard={}, user} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const isOpen = getFieldValue('isOpen');
    let {participants=[], isOpen:visibilityOpen} = tumorboard;
    participants = participants.map(participant => {
        return participant.id;
    });
    return <div>
        <Form>
            <FormItem
                {...formItemLayout}
                label="Invite People"
            >
                {getFieldDecorator('participants', {
                    //initialValue: participants,
                    rules: [{
                        required: true,
                        message: "Please Select People you want to invite",
                        //whitespace: true
                    }],
                })(
                    <PeopleSelect mode="multiple" role={'careteam'} user={user} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Message"
            >
                {getFieldDecorator('message', {
                    //initialValue: participants,
                })(
                    <Input.TextArea />
                )}
            </FormItem>
        </Form>
        <div style={{textAlign:'right'}}>
        <Button type="primary" onClick={props.doFinish}>Invite and Finish</Button>
        </div>
    </div>;
}

const enhance = compose(
    Form.create(),
    withHandlers({
        doFinish: props => () => {
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    const {participants, ...otherValues} = values;
                    let input = {...otherValues, participants: participants.map(participant=>participant.id)};

                    props.onSubmit({...input}).then(({data})=> {
                        props.onHide();
                        message.success('Done');
                    });
                }
            });
        }
    }),
);


export default enhance(TreatmentPlanInvite);
