import React from 'react';
import { Form, Button } from 'antd';
import LocationSearchInput from '../../../FormCustomFields/components/LocationSearchInput';
import { UberProducts } from './containers/Products';
import { UberRideEstimate } from './containers/RideEstimate';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19},
    },
};

const UberRequest = props => {
    const {form} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    //const {id:assessmentId} = object || {};
    // console.log(getFieldValue('location_from'));
    // console.log(getFieldValue('location_to'));
    // console.log(getFieldValue('location_from') !== '' && getFieldValue('location_to') !== '');
    // console.log(getFieldValue('product_id'));
    return <div>
        <FormItem
            {...formItemLayout}
            label={'From'}
        >
        {getFieldDecorator('location_from', {
            initialValue: ''
        })(
            <LocationSearchInput />
        )}
                    
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={'To'}
        >
        {getFieldDecorator('location_to', {
            initialValue: ''
        })(
            <LocationSearchInput />
        )}
                    
        </FormItem>

        {(getFieldValue('location_from') !== '' && getFieldValue('location_to') !== '') &&  <FormItem
            {...formItemLayout}
            label={'Ride'}
        >
        {getFieldDecorator('product_id', {
            initialValue: ''
        })(
            <UberProducts formItemLayout={formItemLayout} />
        )}
                    
        </FormItem>}

    
        {getFieldValue('product_id') && <><FormItem
            {...formItemLayout}
            label={'Ride Estimate'}
        >
            <UberRideEstimate />
        </FormItem>
        <div style={{textAlign:'right'}}><Button type={'primary'} onClick={props.onHide}>Request</Button></div>
        </>} 
    </div>
}

export default UberRequest;