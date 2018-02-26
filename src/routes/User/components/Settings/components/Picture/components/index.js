/**
 * Created by Pavel on 08.12.2017.
 */
import React from 'react';
import { Input,message,Form, Button } from 'antd';


import { withApollo } from 'react-apollo'
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';


const Uppy = require('uppy/lib/core')
const Tus = require('uppy/lib/plugins/Tus')
const Transloadit = require('uppy/lib/plugins/Transloadit')
const DragDrop = require('uppy/lib/react/DragDrop')
const uppy = Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
})

uppy.use(Tus, { resume: false})
uppy.use(Transloadit, {
    // Transloadit plugin options
    params: {
        auth: { key: 'f0ae93b755c346b4864e79e9ac3613ed' },
        template_id:  '80ee9b46f43f47969dea1599e77c7721'
    }
})
uppy.on('complete', (result) => {

   // const url = result.successful[0].uploadURL
    /*store.dispatch({
        type: SET_USER_AVATAR_URL,
        payload: { url: url }
    })*/
})
uppy.run()

class PictureForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    /**
     * Submit the password form
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;

    }

    render(){



        return(

            <div>
                <DragDrop
                    uppy={uppy}
                    locale={{
                        strings: {
                            chooseFile: 'Pick a new avatar'
                        }
                    }}
                />
            </div>

        );
    }

}

const WrappedPasswordForm = Form.create()(PictureForm);
export default withApollo(WrappedPasswordForm);
