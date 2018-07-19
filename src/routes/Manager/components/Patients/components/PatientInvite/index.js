import React from 'react';
import { Radio , Tabs ,Input,Col,Select,Form, DatePicker,Button, } from 'antd';
import AddressForm from '../../../../../../components/AddressForm';
import PhoneForm from '../../../../../../components/PhoneForm';
const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
const dateFormat = 'YYYY/MM/DD';
const PatientInvite = props => {    
      const {getProfileForm} = props;
     const {getFieldDecorator} = props.form;
let tab1=[];
getProfileForm.map(data => data.fields.map(data => {
   if (data.type=="full_name"){
    tab1.push(<p>full_name</p>)
   }
   if (data.type=="birthday"){
    tab1.push(<p>birthday</p>)
   }
   if (data.type=="gender"){
    tab1.push(<p>gender</p>)
   }
   if (data.type=="email"){
    tab1.push(<p>email</p>)
   }
   if (data.type=="address"){
    tab1.push(<p>address</p>)
   }
   if (data.type=="phone"){
    tab1.push(<p>phone</p>)
   }
   if (data.type=="tz"){
    tab1.push(<p>timezone</p>)
   }
   if (data.type=="language"){
    tab1.push(<p>language</p>)
   }
   if (data.type=="radio"){
    tab1.push(<p>radio</p>)
   }
   if (data.type=="cohorts"){
    tab1.push(<p>cohorts</p>)
   }
})
)


    return  <Form >
        <Tabs defaultActiveKey="1">
    <TabPane tab={getProfileForm[0].label} key="1">
    {tab1}
    </TabPane>
    <TabPane tab={getProfileForm[1].label} key="2"></TabPane>
    <TabPane tab={getProfileForm[2].label} key="3"></TabPane>
    <TabPane tab={getProfileForm[3].label} key="4"></TabPane>
    <TabPane tab={getProfileForm[4].label} key="5"></TabPane>
  </Tabs>

</Form>
}

export default PatientInvite;