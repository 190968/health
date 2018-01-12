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
        console.log(report_id);
        if (report_id) {
            this.setState({isClicked: true});
        } else {
            this.setState({isClicked: false});
        }
    }
    componentWillReceiveProps = (nextProps) => {
        const {report} = this.props;

        const {id} = report;
        console.log(this.props);
        console.log(report);
        console.log(id);
        /*this.setState({
            likesIncreasing: nextProps.likeCount > this.props.likeCount
        });*/
        if (id) {
            this.setState({isClicked: true});
        } else {
            this.setState({isClicked: false});
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
        //console.log(this.props);
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
