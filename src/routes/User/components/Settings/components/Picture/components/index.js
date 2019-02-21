
import React from 'react';
import {Button} from 'antd';
import Avatar from '../../../../../components/Avatar';
import './index.less';
import {compose, withState, withHandlers} from 'recompose';
import UploadImage from './uploadImage';

const  ChangePictureFormPure = props => {

    // // state = {
    // //     modalOpen: false,
    // //     avatar:''
    // // }

    // /**
    //  * Submit the password form
    //  * @param e
    //  */
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { onSubmit } = this.props;

    // }

    

    // // componentWillReceiveProps(nextProps) {

    // //     if (!nextProps.loading) {
    // //         const {thumbs={large:''}} = nextProps;
    // //         const {large} = thumbs;

    // //         this.setState({avatar:large});
    // //     }
    // // }



  
        const {avatar, letter = '', modalOpen, toggleModal, onComplete} = props;
        return(

            <center>
                <Avatar size="huge"  src={avatar}>{letter}</Avatar>
                <div style={{marginTop:10}}>  <Button type={'primary'} onClick={toggleModal}>Change avatar</Button>
                    {modalOpen && <UploadImage template='userpic' onComplete={onComplete} simpleResult />}
                </div>
            </center>

        );
}

const enhance = compose(
    withState('modalOpen', 'setModalOpen', false),
    withState('avatar', 'setAvatar', props => {
        const {currentUser} = props;
        const {thumbs} = currentUser || {};
        const {large} = thumbs || {};
        return large;
    }),
    withHandlers({
        toggleModal: props => () => {
            props.setModalOpen(!props.modalOpen);
             
        },
        onComplete: props => (results) => {
            //console.log(results);
            const {original, thumb25, thumb40, thumb80, thumb150} = results;
            props.updatePicture({original:original,large:thumb150, medium:thumb80, small:thumb25});
            props.setAvatar(thumb150);
            props.setModalOpen(false)
        }
    })
);
export default enhance(ChangePictureFormPure);
