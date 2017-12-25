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
        //console.log(this.state.isClicked);
        if (this.state.isClicked) {
            this.setState({isClicked:false});
        } else {
            this.setState({isClicked:true});
        }
        //console.log(this.state.isClicked);
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
<<<<<<< HEAD
console.log("qwerty");
        const { onClick } = this.props;
        return onClick(this.props, !this.state.isClicked, this.toggleCoin);
=======

        const { onClick, med_id, report } = this.props;
        return onClick(med_id, report, !this.state.isClicked, this.toggleCoin);
>>>>>>> 41d945334a85435f309e63fac1cc28d1a01f5623
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
