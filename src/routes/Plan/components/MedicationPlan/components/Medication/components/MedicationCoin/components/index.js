import React from 'react'
import { Button } from 'antd';

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
        if (this.state.isClicked) {
            this.setState({isClicked:false});
        } else {
            this.setState({isClicked:true});
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

        const { onClick } = this.props;
        return onClick(this.props, !this.state.isClicked, this.toggleCoin);
    }

    render() {

        const {id, quantity, report} = this.props;
        const hasReport = report.id || this.state.isClicked;
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
