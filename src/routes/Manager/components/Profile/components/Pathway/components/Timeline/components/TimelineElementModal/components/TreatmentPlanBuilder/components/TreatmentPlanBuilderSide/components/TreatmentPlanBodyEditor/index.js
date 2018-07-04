import React from 'react';
import {Form, Button, Input} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import {withTreatmentPlanMutation} from '../../../../mutations';
import {StartEndForm} from '../../../../../../../../../../../../../../../../components/FormCustomFields';
//import {TumorboardManager} from "../../../../../../../../../../../../../Tumorboard/components/TumorboardManager";
//import {tumorboardMutation} from "../../../../../../../../../../../../../Tumorboard/containers/TumorboardManager";

const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const TreatmentPlanBodyEditor = props => {
  const {form, formItemLayout=formItemLayoutDefault, treatmentPlan={}} = props;
const {getFieldDecorator} = form;
const {title='', startDate, endDate} = treatmentPlan;
    return <div>
      <FormItem
           {...formItemLayout}
          label='Title'
      >
          {getFieldDecorator('title', {
            initialValue:title,
              rules: [{
                   required: true, message: 'Enter Title',
              }],
          })(
              <Input />
          )}
      </FormItem>
      <StartEndForm startDate={startDate} endDate={endDate} /*names={{startDate:"schedule[startDate]", endDate:"schedule[endDate]"}}*/ form={form} formItemLayout={formItemLayout} inline={false} />
        {/* <TumorboardManager {...props} /> */}
        <div style={{textAlign:'right'}}>
        <Button type="primary" onClick={props.onSubmit}>Next</Button>
        </div>
    </div>
}

const enhance = compose(
    Form.create(),
    withHandlers({
        onSubmit: props => () => {

            props.form.validateFields((err, values) => {

                if (!err) {
                    let input = values;

                    props.onSubmit(input).then(({data})=> {
                        const {treatmentPlanCreate:{id}={}} = data;
                        const {treatmentPlanUpdate:{id:treatmentPlanId=id}={}} = data;
                        props.setId(treatmentPlanId);
                        // to to next step
                        props.setStep(1);
                    });
                }
            });
        }
    }),
);


export default enhance(TreatmentPlanBodyEditor);
