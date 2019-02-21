import React from 'react'
import Select from '../Select';
import { compose, withHandlers, branch, withProps } from 'recompose';
import { UserName } from '../../../../routes/User/components/AvatarWithName';

const formatPatient = item => {
    const { id, fullName, memberId, genderText, age } = item;
    return  fullName;// + ' – ' + genderText + ' | ' + age + (memberId !== '' ? ' (#' + memberId + ')' : '');
}

const DoctorSelect = ({ loading, items = [], disableSelect, doSearch, onChange, value = undefined, mode = null, allowClear = true, ...otherProps }) => {

    // let people = items.map(item => {
    //     return formatPatient(item);//
    // });

    // if (user) {
    //     //people = [formatPatient(user)];
    //     if (items.length === 0) {
    //         people = [formatPatient(user)];
    //     } else {
    //         // check if we have such person
    //     }
    // }

    //people = [];
    return <Select 
        {...otherProps}
        value={value}
        allowClear={allowClear} 
        getFullInfo={true} 
        labelInValue={true} 
        i18n={{ placeholder: "Select Doctor" }} 
        loading={loading} 
        mode={mode}
        items={items} 
        labelFormat={formatPatient}
        doSearch={doSearch} 
        onChange={onChange}
        disableSelect={disableSelect}
        />;
};


const enhance = compose(
    withProps(props => {
        // format value
        const { value = {} } = props;
        //return value;
        const { id, fullName = '' } = value || {};
        return { value: { key: id, label: fullName } };
    }),
    // withHandlers({
    //     onChange: props => value => {
    //         let option = props.items.filter(item => item.id === value);
    //         if (option.length > 0) {
    //             option = option[0];
    //         } else {
    //             option = undefined;
    //         }
    //         props.onChange(option);
    //     }
    // })
)
// const enhance = branch(({ getFullInfo = false }) => getFullInfo,
//     fullValue
// );

export default enhance(DoctorSelect);