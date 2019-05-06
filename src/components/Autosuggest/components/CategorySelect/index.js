import React from 'react'
import {Select} from 'antd';
import {compose, withProps} from 'recompose';
import Cascader from './components/Cascader';


// const renameKeys = (obj, newKeys)=> {
//     const keyValues = Object.keys(obj).map(key => {
//         const newKey = newKeys[key] || key;
//         return { [newKey]: obj[key] };
//     });
//     return Object.assign({isLeaf: false}, ...keyValues);

// }
const CategorySelect = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    console.log(items, 'items');
    console.log(value, 'value');
    if (loading) {
        return <Select loading={true} />;
    }

    // const newKeys = { name: "label", id: "value" };
    let renamedObj = items.map((item)=> {
        const {children} = item;
        return {label:item.name, value:item.id, isLeaf:false, children};
    })
    // console.log(renamedObj, 'renamedObj');
    return <Cascader items={renamedObj} value={value} onChange={onChange}/>
    //return <Cascader options={items} defaultValue={value} onChange={onChange} placeholder="Please select" />;
    // <Select value={value} i18n={{placeholder:"Select Category"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        // console.log(props);
        const { value, items  } = props;
        const {id, name, parentCategory} = value;
        const {id:level2, name:level2name, parentCategory:mainCategory} = parentCategory || {};
        const {id:level1} = mainCategory || {};
        let updatedValues = items;
        if (mainCategory && items) {
            // find index
            const mainIndex = items.findIndex(c=> c.id === level1);
            // now add subItem
            updatedValues[mainIndex].children = [{label:level2name, value:level2, isLeaf:true, children: [{label:name, value:id, isLeaf:true}] }];
        }
        return {value:[level1, level2, id], items:updatedValues};

        
    }),
)
export default enhance(CategorySelect);
