import React from 'react';
import Diagnoses from '../../../../../../../../../../Health/containers/Diagnoses';
import {modalHOC} from '../modal';
import {compose, withProps, withHandlers} from 'recompose';
import { TaskAssignWizzard } from '../../../../../../../../../../../components/Tasks/containers/TaskAssignWizzard';
 
const enhanceProps = compose(
    ////<TaskAssignWizzard asPlusIcon patient={user} mode={'simple'} assignObject={{type: 'ap'}} />
    withProps(props => {
        const {details, user} = props;
        console.log(props, ' AP PROPS');
        return {
            details: {
                ...details,
                // id: '',
            },
            showNotes:false,
            useTimeline:false,

            patient:user,
            mode: 'simple',
            assignObject:{type: 'ap', object: details}
            // ={{type: 'ap', object:plan}}
        }
    }),
    withHandlers({
        refetch: props => () => {
            const {refetchTimeline} = props;
            if (refetchTimeline) {
                refetchTimeline();
            }
        //    props.refetchTimeline();
        }
    }),
    //enhance,
    // withHandlers({
    //     onSubmit: props => callback => {
    //         //console.log(props);
    //         props.onHide();
    //         //
    //         // if (!props.id || props.form.isFieldsTouched()) {
    //         //     props.handleSave({prepareInput:()=>({}), callback:props.onHide} );
    //         // } else {
    //         //     props.onHide();
    //         // }
    //     },

    // }),
    //modalHOC
);

export default enhanceProps(TaskAssignWizzard);