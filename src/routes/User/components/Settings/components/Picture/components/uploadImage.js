import React from 'react';
import {Button} from 'antd';
import {DashboardModal} from 'uppy/lib/react';
import Uppy from 'uppy/lib/core';
import 'uppy/dist/uppy.min.css';

const Transloadit = require('uppy/lib/plugins/Transloadit')
const Webcam = require('uppy/lib/plugins/Webcam')
const Url = require('uppy/lib/plugins/Url')
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive')

const uppy = Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
})

//uppy.use(Tus, { endpoint: '/upload' })
uppy.use(Transloadit, {
    // Transloadit plugin options
    params: {
        auth: { key: 'f0ae93b755c346b4864e79e9ac3613ed' },
        template_id:  '80ee9b46f43f47969dea1599e77c7721'
    },
    waitForEncoding: true
}).on('transloadit:result', (assembly, fileIDs) => {
    console.log(assembly);
    console.log(fileIDs);


    if ( dashboard.isModalOpen() ) {
        dashboard.closeModal()
    }
    /*console.group('Created', assembly.assembly_id, 'for files:')
    console.log(assembly);
    console.log(fileIDs);
    for (const id of fileIDs) {
        console.log(uppy.getFile(id).name)
    }
    console.groupEnd()*/
}).use(Webcam)
/*
uppy.on('complete', (result) => {
    console.log(result);
    /*const url = result.successful[0].uploadURL
    store.dispatch({
        type: SET_USER_AVATAR_URL,
        payload: { url: url }
    })*/
//})*/

uppy.run();

const dashboard = uppy.getPlugin('Dashboard')

 class AvatarPicker extends React.Component {
     state = {
         modalOpen: false
     }

     handleOpen =  () => {
         this.setState({
             modalOpen: true
         })
     }

     handleClose = () => {
         this.setState({
             modalOpen: false
         })
     }

     render () {
         return (
             <div>

                 <Button onClick={this.handleOpen}>Change avatar</Button>
                 <DashboardModal
                     disableThumbnailGenerator
                     hideProgressAfterFinish
                     uppy={uppy}
                     closeModalOnClickOutside
                     open={this.state.modalOpen}
                     onRequestClose={this.handleClose}
                     plugins={['Webcam']}
                 />
             </div>
         )
     }
}
export default AvatarPicker;