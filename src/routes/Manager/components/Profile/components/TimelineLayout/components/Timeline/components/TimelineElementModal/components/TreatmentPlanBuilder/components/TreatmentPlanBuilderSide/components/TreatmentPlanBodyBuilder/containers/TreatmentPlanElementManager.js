import { withPlanElementUnion } from '../../../../../../../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder';
import { compose, withState, withProps, withHandlers  } from 'recompose';
import { withModal } from '../../../../../../../../../../../../../../../../../components/Modal';
import {Form} from 'antd';

export const TreatmentPlanElementManager = props => {
    //console.log(props);
    return  null;//<div>1111</div>;//<PlanElementBuilder {...props} /*onHide={toggleEditElement}*/ />;
}

export const convertPlanElementFromInput  = ({input, type}) => {
    switch(type) {
        case 'instruction':
            const  textElement = input.textElement
            return {...textElement, id:'', type};
        break;
    }
}
const enhance = compose(
    //withProps(console.log),
    Form.create(),
    withHandlers({
        handleSave: props => ({prepareInput, callback}) => {
            //console.log(value);
            //console.log(props);
            props.form.validateFields((err, values) => {

                if (!err) {
                    let input = prepareInput(values);
                    //console.log(values);
                    //x console.log(input);
                    props.onCallback({activity: convertPlanElementFromInput({input, type: props.type}), activityInput: input, type: props.type});
                    props.onHide();
                    // props.onSubmit(input).then(({data})=> {

                    // });
                }
            });
        }
    }),
    withModal,
    withPlanElementUnion
);

export default enhance(TreatmentPlanElementManager);
