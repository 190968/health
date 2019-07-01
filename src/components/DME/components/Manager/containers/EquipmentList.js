import DmeEquipmentsListPure from '../components/EquipmentList';
import {compose, withHandlers} from 'recompose';
import {message} from 'antd';

const enhance = compose(
    withHandlers({
        updateEquipments: (props) => (equipment, index) => {
            if (props.disabled) {
                return true;
            }
            let {value:newEquipments=[]} = props;
            const {id} = equipment || {};

            if (id) {
                // console.log(1);
                // find answer
                const itemExisted = newEquipments.find(a => a.id ===id);
                const itemIndex = newEquipments.findIndex(a => a.id ===id);
                newEquipments[itemIndex] = {...itemExisted, ...equipment};
            } else if (index >= 0) {
                newEquipments[index] = equipment;
            } else {
                newEquipments = [...newEquipments, equipment];
            }
            // 
            props.onChange(newEquipments);
        },
        deleteEquipment: (props) => (equipment, index) => {
            if (props.disabled) {
                return true;
            }
            let {value:newEquipments=[]} = props;
            const {id} = equipment || {};

            if (id) {
                newEquipments = newEquipments.filter(a => a.id !== id);
            } else if (index >= 0) {
                newEquipments = newEquipments.filter((a,i) => i !== index);
            }

            props.onChange(newEquipments);
            message.success('Deleted');
        }
    }),
);
export const DmeEquipmentsList = enhance(DmeEquipmentsListPure);