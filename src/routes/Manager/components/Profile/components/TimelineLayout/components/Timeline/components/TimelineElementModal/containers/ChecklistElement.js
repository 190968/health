import { ChecklistElementBuilder } from '../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/ChecklistElementBuilder';
import { modalHOC } from '../modal';
import { compose, withProps } from 'recompose';

const enhanceProps = compose(
    withProps(props => {
        //console.log(props, 'timeline props');
        const { details, item   } = props;
        // console.log(item, 'itemitemitemitemitem');
        if (!item) {
            let { options = [], footnote } = details || {};
            options = options.map(element => {
                let {footnote} = element;
                if (footnote) {
                    // reset footnote id
                    footnote = {...footnote, id: ''};
                }
                return { ...element, id: '', footnote };
            });

            if (footnote) {
                // reset footnote id
                footnote = {...footnote, id: ''};
            }
            
            return {
                details: {
                    ...details,
                    id: '',
                    options,
                    footnote
                },
            }
        }

    }),
    modalHOC
)

export default enhanceProps(ChecklistElementBuilder);