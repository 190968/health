import React from 'react'
import { Button, message } from 'antd';

export class MedicationCoin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
    };
    static propTypes = {
    };

    toggleCoin = () => {
        //console.log(this.state.isClicked);
        if (this.state.isClicked) {
            this.setState({isClicked:false});
            message.success('Untaken');
        } else {
            this.setState({isClicked:true});
            message.success('Taken');
        }

    }

    componentWillMount = () => {
        const {id, quantity, report} = this.props;
        const report_id = report.id || 0;
        if (report_id) {
            this.setState({isClicked: true});
        }
    }

    handleClick = (e) => {
        e.preventDefault();


        const { onClick, med_id, report } = this.props;
        return onClick(med_id, report, !this.state.isClicked, this.toggleCoin);

    }

    render() {

        const {quantity} = this.props;
        const hasReport = this.state.isClicked;
        //console.log(hasReport);
        if (hasReport) {
            return (<Button type="primary" shape="circle" onClick={this.handleClick}>
                {quantity}
            </Button>)
        }
        return (<Button  shape="circle" onClick={this.handleClick}>
            {quantity}
        </Button>)
    }
}



export default MedicationCoin
