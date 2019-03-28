import React from 'react';
import {Form, Input, Radio } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const TrackerTargetManager = props => {
    const {form} = props;
    const {getFieldDecorator} = form;

    return <>

    <FormItem
                {...formItemLayout}
                label="Text before"
            >
                {getFieldDecorator('type', {
                        // initialValue:textBefore,
                    }
                )(
                    <RadioGroup onChange={onChange} defaultValue="1">
                        <RadioButton value={1}>Value Target</RadioButton>
                        <RadioButton value={2}>Reporting Target</RadioButton>
                    </RadioGroup>
                )}
            </FormItem>

        
            <FormItem
                {...formItemLayout}
                // label="Text before"
            >
                {getFieldDecorator('type', {
                        // initialValue:textBefore,
                    }
                )(
                    <>
                    <Input />
                    <RadioGroup onChange={onChange} defaultValue="day">
                        <RadioButton value={'day'}>Day</RadioButton>
                        <RadioButton value={'week'}>Week</RadioButton>
                        <RadioButton value={'month'}>Month</RadioButton>
                        <RadioButton value={'overall'}>Overall</RadioButton>
                    </RadioGroup>
                    </>
                )}
            </FormItem>  



            <FormItem
                {...formItemLayout}
                // label="Text before"
            >
                {getFieldDecorator('type', {
                        // initialValue:textBefore,
                    }
                )(
                    <>
                    <RadioGroup onChange={onChange} defaultValue="day">
                        <RadioButton value={'day'}>Dayly</RadioButton>
                        <RadioButton value={'week'}>Total Weely</RadioButton>
                        {/* <RadioButton value={'month'}>Monthly</RadioButton> */}
                        <RadioButton value={'overall'}>Overall</RadioButton>
                    </RadioGroup>
                    </>
                )}
            </FormItem>  
    </>
}

export default TrackerTargetManager;