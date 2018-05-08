import React from 'react';
import {compose, withHandlers} from 'recompose';
import MediaElementBuilderPure, {prepareInput} from '../components/MediaElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {getMediaTypeInfo} from "../components/MediaElementBuilder/index";


export const MediaElementBuilder = MediaElementBuilderPure;

export const enhance = compose(
    withSpinnerWhileLoading,
    withHandlers({
        onSubmit: props => callback => {
            console.log(props);
            if (1===1 || !props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },

    }),
);

const enhanceWithModal = compose(
    enhance,
    withHandlers({
        modalTitle: props => values => {
            // get media type
            //console.log(props);
            const {typeMedia} = props;
            let {name} = getMediaTypeInfo(typeMedia);
            return props.id ? 'Edit '+name : 'Add '+name;
        },
    }),
    modalHOC,
);

export default enhanceWithModal(MediaElementBuilderPure);