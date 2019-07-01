import React from 'react';
import { Form, Button } from 'antd';
import { AttachmentsModules } from '../../../../../FormCustomFields/containers/AttachmentsModules';
import LocationSearchInput from '../../../../../FormCustomFields/components/LocationSearchInput';
import { DrawerFooter } from '../../../../../Modal';
import { prepareTaskAttachmentFromType } from '../../../../../FormCustomFields/components/AttachmentsModules';

const FormItem = Form.Item;
const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const DischargePlanManager = props => {
    const {formItemLayout=formItemLayoutDefault, dischargePlan, user} = props;
    const {getAttachments=[]} = dischargePlan || {};
    // if we pass additional props
    //const {id:assessmentId} = object || {};
    return <div>
        <AttachmentsModules value={getAttachments} template={'discharge'} buttonLabel={'Add Element'} emptyMessage={'Lovely message about discharge plan or actions'} patient={user} editable={false} /*  date={getFieldValue('endDate')} /*task={task}*/ />
    </div>
}

export default DischargePlanManager;