import React from 'react';
import { Radio , Tabs ,Input,Col,Select,Form, DatePicker,Button, } from 'antd';
import FullNameForm from '../Full_name';
import BirthdayForm from '../Birthday';
import GenderForm from '../Gender';
import EmailForm from '../Email';
import AddressForm from '../Address';
import PhoneForm from '../Phone';
import TimeZoneForm from '../TimeZone';
import LanguageForm from '../Language';
import CohortsForm from '../Cohorts';
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
    tab1.push(<FullNameForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="birthday"){
    tab1.push(<BirthdayForm  getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="gender"){
    tab1.push(<GenderForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="email"){
    tab1.push(<EmailForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="address"){
    tab1.push(<AddressForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="phone"){
    tab1.push(<PhoneForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="tz"){
    tab1.push(<TimeZoneForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="language"){
    tab1.push(<LanguageForm getFieldDecorator={getFieldDecorator}/>)
   }
   if (data.type=="radio"){
    tab1.push(<p>radio</p>)
   }
   if (data.type=="cohorts"){
    tab1.push(<CohortsForm getFieldDecorator={getFieldDecorator}/>)
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