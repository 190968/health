import {TreatmentElementBuilder, enhance} from '../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/TreatmentElementBuilder';
import {modalHOC} from '../modal';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

const enhanceProps = compose(
    withProps(props => {

        const {element={}, details, resetInitInfo=false} = props;
        if (resetInitInfo) {
            console.log(props);
            //const {itemInfo = {}} = element;
            let {elements = []} = details;
            elements = elements.map(element => {
                return {...element, id: '',  };
            });
            //console.log(elements);
            // reset element
            return {
                details: {
                    ...details,
                    id: '',
                    elements: elements
                },
                element: {
                    ...element,
                    id: '',
                    itemId: '',
                    itemInfo: details
                },
                elements:elements
            }
        }

    }),
    enhance,
    modalHOC
)

export default enhanceProps(TreatmentElementBuilder);