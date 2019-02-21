import React from 'react';
import {Select, Input} from 'antd';
import { DateField } from '../../../../../../../../../../components/FormCustomFields';
import { TrackerInput } from '../../../../../../../../../Plan/components/Tracker';
import { bloodPressureMeasurement, hemoglobinMeasurement } from '../../../../../../../../../Plan/components/Tracker/static_trackers';


const QualityMeasuresField = props => {
    let html = null;
    const {field, getFieldDecorator} = props;
    const {type} = field || {};
    console.log(field, 'QM field');
    switch (type) {
        case 'date':
            html = <DateField />
            break;
    //     case 'bmi':
    //         //DB::debugNoCache();
    //         if ($value == '') {
    //             $weight = intval(ActivityMeasurement::getLastReportByCode('weight', $user_id, true));
    //             $height = intval(ActivityMeasurement::getLastReportByCode('height', $user_id, true));
    //             if ($weight && $height) {
    //                 $height = $height / 100;
    //                 $metric = ($weight / ($height * $height));
    //                 $imperial = (($weight * 703) / ($height * $height));
    //                 $value = EGOR ? $metric : $imperial;
    //                 $value = round($value);
    //             }
    //         }

    //         // calculate BMI
    //         $html = FitForm::printInputNumberWrapperST($name_info, $value,[],['style' => 'width: 80px']);
    //         break;
        case 'yesno':
            html = <Select style={{width:'100%'}}>
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                </Select>
            //FitForm::printSelectboxST($name_info, ['1'=>'Yes', '0'=>'No'], $value, ['style'=> 'width:80px']);
            break;
        case 'posneg':
            html = <Select style={{width:'100%'}}>
                    <Select.Option value={true}>Positive</Select.Option>
                    <Select.Option value={false}>Negative</Select.Option>
                </Select>
            break;
        case 'bp':
            html = <TrackerInput measurement={bloodPressureMeasurement} />;
            break;
        case 'hemoglobin':
            // get the latest hemoglobin
            html = <TrackerInput measurement={hemoglobinMeasurement} />;
            break;
        // case 'medadh':
        //     html = <Input />
        //break;
    //         if ($value == '') {
    //             $u_obj = new UserV3();
    //             $u_obj->setUid($user_id);
    //             list($value) = $u_obj->getUserMedAdherenceLevel();
    //         }

    //         $html = FitForm::printInputNumberWrapperST($name_info, $value, [], ['style' => 'width: 80px']);
    //         break;
    //     case 'bp':
    //         //DB::debugNoCache();
    //         if ($value == '') {
    //             $bp_obj = ActivityMeasurement::getLastReportByCode('bp', $user_id);
    //             //var_dump($bp_obj);
    //             if ($bp_obj->isExists()) {
    //                 $value = $bp_obj->getReportValue();
    //             }
    //         }
    //         // get the latest blood pressure
    //         $html = FitForm::printBloodPressureST($name_info, $value);
    //         break;
    //     case 'hemoglobin':
    //         // get the latest hemoglobin
    //         $html = FitForm::printInputNumberWrapperST($name_info, $value, [], ['style' => 'width: 80px']);
    //         break;
        default:
            html = <Input />;//FitForm::printInputNumberWrapperST($name_info, $value, [], ['style' => 'width: 80px']);
            break;
    }

    return  getFieldDecorator('field['+field.id+']', {
        //initialValue: subject,
        // rules: [{required: true, message: "Select"}],
    })(html);
}

export default QualityMeasuresField;