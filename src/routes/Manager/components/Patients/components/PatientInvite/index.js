import React from 'react';
import { Radio , Tabs ,Input,Col,Select,Form, DatePicker,Button, } from 'antd';
import FullNameForm from '../PatientForm/FullNameField';
import BirthdayForm from '../PatientForm/BirthdayField';
import GenderForm from '../PatientForm/GenderField';
import EmailForm from '../PatientForm/EmailField';
import AddressForm from '../PatientForm/AddressField';
import PhoneForm from '../PatientForm/PhoneField';
import TimeZoneForm from '../PatientForm/TimeZoneField';
import LanguageForm from '../PatientForm/LanguageField';
import CohortsForm from '../PatientForm/CohortsField';
import DropdownFormField from '../PatientForm/DropdownField';
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
let tab0=[],tab1=[],tab2=[],tab3=[],tab4=[];
getProfileForm.map((data,count) => {
    if(count == 0){
            data.fields.map(data => {
            if (data.type=="full_name"){
                tab0.push(<FullNameForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="birthday"){
                tab0.push(<BirthdayForm  getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="gender"){
                tab0.push(<GenderForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="email"){
                tab0.push(<EmailForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="address"){
                tab0.push(<AddressForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="phone"){
                tab0.push(<PhoneForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="tz"){
                tab0.push(<TimeZoneForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="language"){
                tab0.push(<LanguageForm getFieldDecorator={getFieldDecorator}/>)
            }
            if (data.type=="radio"){
                tab0.push(<p>radio</p>)
            }
            if (data.type=="cohorts"){
                tab0.push(<CohortsForm getFieldDecorator={getFieldDecorator}/>)
            }
            })
        }
        if(count == 1){
            data.fields.map(data => {
            if (data.type=="dropdown"){
                tab1.push(<DropdownFormField options={data.options} getFieldDecorator={getFieldDecorator} />)
            }
         
            })
        }
        if(count == 2){
            data.fields.map(data => {
            if (data.type=="dropdown"){
                tab2.push(<p>dropdown</p>)
            }
         
            })
        }
        if(count == 3){
            data.fields.map(data => {
            if (data.type=="dropdown"){
                tab3.push(<p>dropdown</p>)
            }
         
            })
        }
        if(count == 4){
            data.fields.map(data => {
            if (data.type=="dropdown"){
                tab4.push(<p>dropdown</p>)
            }
         
            })
        }
}
)


    return  <Form >
        <Tabs defaultActiveKey="1">
    <TabPane tab={getProfileForm[0].label} key="1">
        {tab0}
    </TabPane>
    <TabPane tab={getProfileForm[1].label} key="2">
        {tab1}
    </TabPane>
    <TabPane tab={getProfileForm[2].label} key="3">
        {tab2}
    </TabPane>
    <TabPane tab={getProfileForm[3].label} key="4">
        {tab3}
    </TabPane>
    <TabPane tab={getProfileForm[4].label} key="5">
        {tab4}
    </TabPane>
  </Tabs>

</Form>
}

export default PatientInvite;