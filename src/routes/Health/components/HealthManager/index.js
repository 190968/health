import React from 'react';
import { SelectFromList } from '../../../../components/UI/SelectFromList';
import { HEALTH_ELEMENTS } from '../../utils';

// const tailFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 13,
//             offset: 8,
//         },
//     },
// };


const HealthManager = props => {
    return <SelectFromList items={HEALTH_ELEMENTS} rowKey={'type'} onSelect={props.setType} />;
}


 
export default HealthManager;
