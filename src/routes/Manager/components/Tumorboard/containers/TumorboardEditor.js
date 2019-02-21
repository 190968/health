import React from 'react';
import {withModal, withSpinnerWhileLoading, withDrawer} from "../../../../../components/Modal/index";
import TumorboardEditor from "../components/TumorboardEditor";
import {compose, branch, withState, withProps, withHandlers} from 'recompose';
import {withTumorboardQuery} from "../queries";


const enhance = compose(

    withProps(props=> {
        return {
            modalTitle: props.tumorboard ? 'Edit Tumor Board - '+props.tumorboard.title : 'New Tumor Board',
            modalFooter:false
        }
    }),
    branch(props => props.asModal, withModal),
    withState('step','setStep',0),
    branch(props => !props.tumorboard, withState('tumorboard','setTumorboard'), withTumorboardQuery),
    // withSpinnerWhileLoading,


    withHandlers({
        goNext: props => () => {
            props.setStep(props.step+1);
        },
        goPrev: props => () => {
            if (props.step > 0) {
                props.setStep(props.step - 1);
            }
        }
    }),
    withDrawer
)


export default enhance(TumorboardEditor);