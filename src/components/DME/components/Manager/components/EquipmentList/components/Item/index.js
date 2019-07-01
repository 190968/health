import React from 'react';
import { DmeEquipmentManagerButton } from '../../../EquipmentManagerButton';
import { formatProcedureTitle } from '../../../../../../../Autosuggest/components/ProcedureSelect';
import { Popconfirm, Icon, List } from 'antd';

const DmeEquipmentsListItem = props => {
  let actions = [];
  const { equipment, editable, onChange, i, type, managerProps } = props;
  const { id, procedureCode, quantity, modifier, provider } = equipment || {};
  const { title: providerName } = provider || {};
  // can remove only upon creation
  if (!id && props.onDelete && editable) {
    actions.push(<Popconfirm title="Are you sure you want to delete this equipment?" onConfirm={props.onDelete} okText="Yes" cancelText="No"><Icon type="close-circle" theme="outlined" /></Popconfirm>);
  }
  if (editable) {
    actions.push(<DmeEquipmentManagerButton equipment={equipment} managerProps={managerProps} type={type} i={i} onChange={onChange} icon={'edit'} button={false} />);
  }

  return <List.Item actions={actions} >
    <List.Item.Meta
      title={formatDMEItem(equipment, { onlyCode: true })}
      description={formatDMEItem(equipment, { useCode: false })}
    />
  </List.Item>
}


export default DmeEquipmentsListItem;

export const formatDMEItem = (equipment, props) => {
  console.log(equipment, 'DME props');
  const { onlyCode = false, useCode = true } = props || {};
  const { procedureCode, equipmentCategory, customCategory, quantity, modifier, provider } = equipment || {};
  const { title: providerName } = provider || {};

  let text = [];
  if (useCode) {
    if (procedureCode) {
      const code = formatProcedureTitle(procedureCode);
      text.push(code);
    // } else if (category) {
    //   const { id: categoryId, label } = category || {};
    //   if (categoryId === '0') {
    //     text.push(customCategory);
    //   } else {
    //     text.push(label);
    //   }
    } else if (equipmentCategory) {
      const {key, label} = equipmentCategory || {};
      if (key === '0' && customCategory) {
        text.push(customCategory);
      } else {
        text.push(label);
      }
    } 
    text.push(<div key='qnt'>Qnt: {quantity}</div>);
  }
  if (onlyCode) {
    return text;
  }
  if (modifier) {
    text.push(<div key='modifier'>{modifier}</div>);
  }
  if (providerName) {
    text.push(<div key='providerName'>{providerName}</div>);
  }

  return text;
}