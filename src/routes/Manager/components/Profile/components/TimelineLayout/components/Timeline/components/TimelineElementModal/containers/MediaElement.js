import {modalHOC} from '../modal';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';
import  MediaElementBuilder  from '../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/MediaElementBuilder';

const enhanceProps = compose(
//     withProps(props => {
//     const {details={}} = props;
//     let {options=[]} = details;
//     options = options.map(element => {
//                  return {...element, id:''};
//     });
//     // console.log(props);
//     // const{itemInfo={}} = element;
//     // let{elements=[]} = itemInfo;
//     //  elements = elements.map(element => {
//     //     return {...element, id:''};
//     // });
//     // console.log(elements);
//     // reset element
//     return {
//         details: {
//             ...details,
//             id: '',
//             options: options
//         },
//     }

// }),
    //enhance,
    modalHOC
)

export default enhanceProps(MediaElementBuilder);