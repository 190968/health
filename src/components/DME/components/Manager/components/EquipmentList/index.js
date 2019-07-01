import React from 'react';
import { ListWithMessage } from '../../../../../UI/List';
import DmeEquipmentsListItem from './containers/Item';
import { DmeEquipmentManagerButton } from '../EquipmentManagerButton';

const DmeEquipmentsList = props => {
    const { value: equipments = [], type, updateEquipments, deleteEquipment, editable=true, disabled=false, ...otherProps } = props;
    return <React.Fragment>
        <ListWithMessage
            emptyMessage={false}
            itemLayout="horizontal"
            pagination={false}
            size={'small'}
            dataSource={equipments}
            renderItem={(equipment, i) => {
                return <DmeEquipmentsListItem key={i} i={i} {...otherProps} equipment={equipment} editable={editable} type={type} deleteItem={deleteEquipment} onChange={updateEquipments} />
            }}
        />
        {(!disabled && editable) && <DmeEquipmentManagerButton attachments={equipments} type={type} {...otherProps} onChange={updateEquipments} />}
    </React.Fragment>
}

export default DmeEquipmentsList;
