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
  const {form, formItemLayout=formItemLayoutDefault} = props;
const {getFieldDecorator} = form;
    return <div>
      <FormItem
           {...formItemLayout}
          label='Title'
      >
          {getFieldDecorator('title', {
              rules: [{
                   required: true, message: 'Enter Title',
              }],
          })(
              <Input />
          )}
      </FormItem>
      <StartEndForm /*names={{startDate:"schedule[startDate]", endDate:"schedule[endDate]"}}*/ form={form} formItemLayout={formItemLayout} inline={false} />
        {/* <TumorboardManager {...props} /> */}
        <div style={{textAlign:'right'}}>
        <Button type="primary" onClick={props.onSubmit}>Next</Button>
        </div>
    </div>
}

const enhance = compose(
    withTreatmentPlanMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {

            props.form.validateFields((err, values) => {

                if (!err) {
                    let input = values;

                    props.onSubmit(input).then(({data})=> {
                        const {treatmentPlanCreate} = data;
                        const {id} = treatmentPlanCreate;
                        props.setId(id);
                        //const {}
                        // set
                        props.setStep(1);

                        // if (data.tumorboardCreate) {
                        //     props.setTumorboard(data.tumorboardCreate);
                        // }
                        //props.setTumorboard();
                        //props.onHide();
                    });
                }
            });
        }
    }),
);


export default enhance(TreatmentPlanBodyEditor);
