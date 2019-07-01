import DmeEquipmentManagerPure from '../components/EquipmentManager';
import {compose, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';
import { withDrawer } from '../../../../Modal';

const enhance = compose(
    Form.create(),
    withProps(props => {
        const {equipment} = props;
        return {modalTitle: equipment ? 'Update Equipment' : 'Add Equipment'};
    }),
    withHandlers({
        onSubmit: props => () => { 
            const {form, onChange, i, equipment} = props;
            const {id} = equipment || {};
            form.validateFields((err, values) => {
                if (!err) {
                    if (onChange) {
                        const input = {id, ...values};
                        if (equipment) {
                            onChange(input, i);
                        } else {
                            onChange(input);
                        }
                        
                    }
                    props.onHide();
                    // props.addAttachment({...medication, setup:otherValues});
                }
            });
        }
    }),
    withDrawer
);

export const DmeEquipmentManager = enhance (DmeEquipmentManagerPure);

export const prepareEquipmentInput = values => {
    // console.log(values);
    const {id, procedureCode, equipmentCategory, quantity, modifier, provider} = values || {};
    let {customCategory} = values || {};
    const {id:procedureCodeId} = procedureCode || {}; 
    const {id:providerId} = provider || {}; 
    const {key:categoryId, label:categoryLabel} = equipmentCategory || {}; 
    if (categoryId === '0' && !customCategory) {
        customCategory = categoryLabel;
    }
    return {id, procedureCodeId, categoryId, customCategory, quantity, modifier, providerId};
}

export const prepareEquipmentsForForm = equipments => {
    if (!equipments) {
        return undefined;
    }

    return equipments;//.map(e => );
}