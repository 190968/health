import Elements from '../components/Elements';
import {message} from 'antd';
import {compose, withHandlers, withStateHandlers} from 'recompose';

const enhance = compose(
    withHandlers({
        onChange: props => (elements) => {
            if (props.onChange) {
                props.onChange(elements);
            }
        }
    }),
    withStateHandlers(props => {
        const {value=[]} = props;
        return {elements:value};
    },{
        appendElements: (state, props) => (element) => {
            let {elements=[]} = state;
            elements = [...elements, element];
            //console.log(elements);
            // send elements for mutations(replace objects to objectID)
            props.onChange(elements);
            // save elements for internal display
            return {
                elements
            }
            //message.success('Added');
        },
        updateElement:  (state, props) => (element) => {
            let {elements=[]} = state;
            console.log(element);
            const elementIndex = elements.findIndex(newAttachment => newAttachment.id === element.id);
            console.log(elements[elementIndex],'PREV ELEM');
            elements[elementIndex] = element;
            console.log(elements);
            props.onChange(elements);
            message.success('Updated');
            return {
                elements
            }
        },
        deleteElement: (state, props) => (element) => {
            let {elements=[]} = state;
            elements = elements.filter(newAttachment => newAttachment !== element);
            props.onChange(elements);
            message.success('Deleted');
            return {
                elements
            }
        }
    }),
);
export const TreatmentFormElements = enhance(Elements);