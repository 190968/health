import React from 'react'
import Select from '../Select';
import { compose, withHandlers, branch, withProps, defaultProps } from 'recompose';
import { UserName } from '../../../../routes/User/components/AvatarWithName';

const formatLabel = item => {
    //const {user} = item;
    const { id, fullName, memberId, genderText, age } = item;
    return  fullName;// + ' – ' + genderText + ' | ' + age + (memberId !== '' ? ' (#' + memberId + ')' : '');
}

const formatValue = item => {
    const {user} = item;
    const { id } = user;
    return user;// id;//fullName;// + ' – ' + genderText + ' | ' + age + (memberId !== '' ? ' (#' + memberId + ')' : '');
}
 

const PatientTeamMemberSelect = (props) => {
    const { loading, items = [], disableSelect, doSearch, onChange, value = undefined, mode = null, allowClear = true, ...otherProps } = props;

    const itemsFormatted = items.map(item => {
        const {user} = item;
        return user;
    });

    return <Select value={value}
        allowClear={allowClear} 
        getFullInfo={true} 
        labelInValue={true} 
        //labelInValueFormat={formatLabel} 
        i18n={{ placeholder: "Select Person" }} 
        loading={loading} 
        mode={mode}
        items={itemsFormatted} 
        labelFormat={formatLabel}
        //valueFormat={formatValue}
        doSearch={doSearch} 
        onChange={onChange}
        disableSelect={disableSelect}
        />;
};


const enhance = compose(
    // defaultProps({
    //     getFullInfo:true,
    //     labelInValue:true
    // }),
    withProps(props => {
        // format value
        const {  mode, items=[] } = props;


        if (mode === 'multiple') {
            let { value = [] } = props;

            const values = value.map(val => {
                const { id, fullName = '' } = val || {};
                return { key: id, label: fullName };
            })
            //console.log(values);
            return {value: values};
        }
        let { value = {} } = props;
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

export default enhance(PatientTeamMemberSelect);