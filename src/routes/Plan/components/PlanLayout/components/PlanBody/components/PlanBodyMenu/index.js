import React from 'react'
import PropTypes from 'prop-types'

// add placeholders
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'


export class PlanBodyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:''
        };
    };
    static propTypes = {
    };

    setTab(tab) {
        this.setState({tab: tab})
    }




    render() {
       //console.log(this.props);
        const {body, setTab, tab} = this.props;
        const {lessons, intro, activities} = body;
            //console.log(tab);
        return (<div>
            {intro.length > 0 && <div onClick={() => this.setTab('intro')}>Intro {tab == 'intro' && '(Selected)'}</div>}
            {lessons.length > 0 && <div onClick={() => this.setTab('lessons')}>Lessons {tab == 'lessons' && '(Selected)'}</div>}
            {activities.length > 0 && <div onClick={() => this.setTab('activities')}>Activities {tab == 'activities' && '(Selected)'}</div>}
            </div>)
    }
}



export default PlanBodyMenu
