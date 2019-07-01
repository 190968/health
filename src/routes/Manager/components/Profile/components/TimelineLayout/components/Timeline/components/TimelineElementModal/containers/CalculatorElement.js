import CalculatorElementBuilderPure from '../components/CalculatorElement';
import { modalHOC } from '../modal';
import { compose, withProps } from 'recompose';
// const enhanceProps = compose(
//     withProps(props => {
//         //console.log(props, 'timeline props');
//         const { details, item   } = props;
//         // console.log(item, 'itemitemitemitemitem');
//         if (!item) {
//             let { options = [], footnote } = details || {};
//             options = options.map(element => {
//                 let {footnote} = element;
//                 if (footnote) {
//                     // reset footnote id
//                     footnote = {...footnote, id: ''};
//                 }
//                 return { ...element, id: '', footnote };
//             });

//             if (footnote) {
//                 // reset footnote id
//                 footnote = {...footnote, id: ''};
//             }
            
//             return {
//                 details: {
//                     ...details,
//                     id: '',
//                     options,
//                     footnote
//                 },
//             }
//         }

//     }),
//     modalHOC
// )

// export default enhanceProps(CalculatorElementBuilder);


export const CalculatorElementBuilder = modalHOC(CalculatorElementBuilderPure);

export default CalculatorElementBuilder;



export const prepareTimelineCalculatorInput = (values) => {
    const {title, value} = values;
    return {
            title,
            value
    }
}