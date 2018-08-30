import React from 'react';
import { Radio, Tabs, Input, Col, Select, Form, DatePicker, Button, } from 'antd';

const TabPane = Tabs.TabPane;

const PatientInvite = props => {
    const { getProfileForm=[] } = props;
    const { getFieldDecorator } = props.form;
    let tab0 = [], tab1 = [], tab2 = [], tab3 = [], tab4 = [];
    console.log("PatientInvite ==> ",props.patients);

    getProfileForm.map((data, count) => {
        if (count == 0) {
            data.fields.map(data => {
                if (data.type == "full_name") {
                    tab0.push(<FullNameForm key={data.id} firstName={props.patients.firstName} lastName={props.patients.lastName} label={data.label} getChildren={data.getChildren}  getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "birthday") {
                    tab0.push(<BirthdayForm key={data.id} birthday={props.patients.birthday} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "gender") {
                    tab0.push(<GenderForm key={data.id} gender={props.patients.gender} options={data.options} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "email") {
                    tab0.push(<EmailForm key={data.id} email={props.patients.email} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "address") {
                    tab0.push(<AddressForm key={data.id} address={props.patients.address} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "phone") {
                    tab0.push(<PhoneForm key={data.id} phone={props.patients.phone} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "tz") {
                    tab0.push(<TimeZoneForm key={data.id} timezone={props.patients.timezone} label={data.label} />)
                }
                if (data.type == "language") {
                    tab0.push(<LanguageForm key={data.id} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "radio") {
                    tab0.push(<RadioFormField key={data.id} label={data.label} options={data.options} />)
                }
                if (data.type == "cohorts") {
                    tab0.push(<CohortsForm key={data.id} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
            })
        }
        if (count == 1) {
            data.fields.map(data => {
                if (data.type == "dropdown") {
                    tab1.push(<DropdownFormField key={data.id} label={data.label} options={data.options} />)
                }
                if (data.type == "plain") {
                    tab1.push(<PlainFormField key={data.id} label={data.label} />)
                }

            })
        }
        if (count == 2) {
            data.fields.map(data => {
                if (data.type == "dropdown") {
                    tab2.push(<DropdownFormField key={data.id} label={data.label} options={data.options} />)
                }
                if (data.type == "first_last_name") {
                    tab2.push(<FullNameForm key={data.id} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "phone") {
                    tab2.push(<PhoneForm key={data.id} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }
                if (data.type == "radio") {
                    tab2.push(<RadioFormField key={data.id} label={data.label} options={data.options} />)
                }
                if (data.type == "checkbox") {
                    tab2.push(<CohortsForm key={data.id} label={data.label} getFieldDecorator={getFieldDecorator} />)
                }

            })
        }
        if (count == 3) {
            data.fields.map(data => {
                if (data.type == "dropdown") {
                    tab3.push(<DropdownFormField key={data.id} label={data.label} options={data.options} />)
                }

            })
        }
        if (count == 4) {
            data.fields.map(data => {
                if (data.type == "radio") {
                    tab4.push(<RadioFormField key={data.id} label={data.label} options={data.options} />)
                }
                if (data.type == "plain") {
                    tab4.push(<PlainFormField key={data.id} label={data.label} />)
                }

            })
        }
    }
    )


    return <Form >
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