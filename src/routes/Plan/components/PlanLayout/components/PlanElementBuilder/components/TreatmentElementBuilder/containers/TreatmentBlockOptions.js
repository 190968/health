import React from 'react';
import TreatmentElementBlock from './TreatmentBlockOption';
import { List, Button } from 'antd';
import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';
import { withToggleModal } from '../../../../../../../../../components/Modal';
import TreatmentItemManager from './TreatmentBlockManageOptionModal';

const TreatmentBlockOptions = (props) => {
    console.log(props);
    const { elements, ...otherProps } = props;
    return <React.Fragment>

        {elements.length > 0 && <List
            style={{ marginTop: 3 }}
            size="small"
            itemLayout="horizontal"
            dataSource={elements}
            renderItem={(option, k) => {
                return <TreatmentElementBlock key={k} i={k}   {...otherProps} option={option} />;
            }}
        />}

        <AddButton {...otherProps} />
    </React.Fragment>
};

const enhance = compose(
    withHandlers({
        onChange: props => (elements) => {
            const onChange = props.onChange;
            if (onChange) {
                const allElements = elements.map(el => {
                    const { element, ...otherProps } = el;
                    const { type } = otherProps;
                    return { ...otherProps, [type]: element };
                });
                onChange(allElements);
            }
        }
    }),
    withStateHandlers(props => {
        const { value = [] } = props;
        return { elements: value };
    }, {
            onDeleteElement: (state, props) => (elementToDelete) => {
                const { elements } = state;
                const newElements = elements.filter(element => element.id !== elementToDelete.id);
                props.onChange(newElements);
                return {
                    elements: newElements
                }
            },
            onElementAdd: (state, props) => (elementToAppend) => {
                const { elements } = state;
                const newElements = [...elements, elementToAppend];
                console.log(elementToAppend);
                console.log(newElements);
                props.onChange(newElements);
                return {
                    elements: newElements
                }
            }
        })
    // withProps(props => {
    //     const {value=[]} = props;
    //     console.log(value, 'ELE<ENTS');
    //     return {elements:value};
    // }),

)

export default enhance(TreatmentBlockOptions);


const AddButtonPure = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    return <React.Fragment>
        {showModal && <TreatmentItemManager {...otherProps} onHide={toggleModal} />}
        <Button icon={'plus'} type="dashed" onClick={props.toggleModal} style={{ width: '60%' }}>
            Add Treatment
        </Button>
    </React.Fragment>
}
const AddButton = withToggleModal(AddButtonPure);
