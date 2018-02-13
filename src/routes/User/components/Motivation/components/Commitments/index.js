/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Progress ,Tooltip,Button, Icon,Card } from 'antd';
import ModalMakeCommitment from './components/ModalMakeCommitments/containers/ModalMakeCommitments'
class Commitments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }
    showModal = () => {
        this.setState({visible: true});
    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card loading >
                Loading</Card>;
        }
     console.log(info);

        return  (
            <Card
                title="My Commitments"
                extra={<Tooltip title='Add Commitments'><Button size={"small"} onClick={this.showModal} ><Icon type="plus"/></Button></Tooltip>}
            >
                { this.state.visible && <ModalMakeCommitment/>}

            </Card>

        );
    }
}
export default Commitments;