import React from 'react'
import Select from '../Select';
import {compose, withHandlers, branch, withProps} from 'recompose';
import {UserName} from '../../../../routes/User/components/AvatarWithName';

const formatPatient = item => {
    return <UserName user={item} widget={false} useLink={false} />;
}
const PeopleSelect = ({loading, idOnly=false, defaultOptions=[], items=[], doSearch, onChange, group, value=undefined, mode=null, ...otherProps}) => {
//     let people = items.map(item => {
//         const {id} = item;
//         return {id, key:id, title:<UserName user={item} widget={false} useLink={false} />};
//     });
//    // let selectedValue = value; 
//     if (items.length === 0) {
//         // if (mode === 'multiple') {
//         //     selectedValue = [];
//         // }
//         people = defaultOptions.map(user => {
//             const {id} = user;
//             //selectedValue.push(id);
//             return {id, key:id, title:<UserName user={user} widget={false} useLink={false} />};
//         });
//     }
    return <Select {...otherProps} value={value}  getFullInfo={!idOnly} 
    labelInValue={!idOnly} 
    labelFormat={formatPatient}
    i18n={{placeholder:"Select Person"}} group={group} loading={loading} mode={mode} items={items} doSearch={doSearch} onChange={onChange} />;
};


const fullValue = compose(
    withProps(props => {
        // format value
        const { mode} = props;


        if (mode === 'multiple') {
            let { value = [] } = props;

            const values = value.map(val => {
                const { id, fullName = '' } = val || {};
                return { key: id, label: fullName };
            })
            console.log(values);
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
    //         if(option.length > 0) {
    //             option = option[0];
    //         }
    //         //console.log(option);
    //         props.onChange(option);
    //     }
    // })
)
const enhance =  compose(
    branch(({idOnly=false}) => !idOnly,
        fullValue
    )
);

export default enhance(PeopleSelect);