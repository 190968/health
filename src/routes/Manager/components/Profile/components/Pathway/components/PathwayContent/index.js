import React from 'react';
import { Select, Card, Icon, Menu, Dropdown, Tooltip } from 'antd';
import PathwayBody from '../../containers/PathwayBody';
import keydown from 'react-keydown';
import { compose, lifecycle, withState, withProps, branch } from 'recompose';
import { PathwayFlowButton } from '../../../../../Pathways/components/Table/components/Buttons';
import { PathwaySelect } from '../../../../../../../../components/Autosuggest/containers/PathwaySelect';
import { withUserPathwayQuery, withUserPathwayByIdQuery } from '../../containers/PathwayContent';
import { withSpinnerWhileLoading } from '../../../../../../../Health/components/modalManager';




class PathwayContent extends React.Component {


    constructor(props) {
        super(props);
        const { pathway = false } = props;
        this.state = {
            pathway,
            current: 0,
        }
    }

    setPathway = (pathway) => {
        // console.log(pathway);
        this.setState({ pathway });
    }
    selectPathway = (value) => {
        // console.log(this);
        // console.log(this.props);
        const { joinPathway, setUserPathway } = this.props;
        joinPathway(value).then(({ data }) => {
            // refetch();
            const userPathway = data.joinPathway || {};
            const { pathway } = userPathway;
            setUserPathway(userPathway);
            this.setPathway(pathway);
        });
    }

    setCurrent = (current) => {
        if (current === 'next') {
            this.setCurrent(this.state.current + 1);
        } else if (current === 'prev') {
            if (this.state.current > 0) {
                this.setCurrent(this.state.current - 1);
            }
        } else {
            this.checkOnScroll(current);
            //console.log(value);
            this.setState({ current });
            // scroll to
            //console.log(this.refs);
        }
    }

    checkOnScroll = (current) => {
        // check if we need to scroll
        //current
    }
    cancePathway = () => {
        this.setState({ pathway: false })
    }


    // getDerivedStateFromProps(nextProps) {
    //     if (!nextProps.loading) {
    //         const {pathway} = nextProps;
    //         console.log(nextProps, 'getDerivedStateFromProps');
    //         if (pathway.id) {
    //
    //             this.setPathway(pathway.id, pathway.title);
    //         }
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
            const { pathway } = nextProps;
            const { id } = pathway || {};
            //console.log(nextProps, 'willreceiveprops');
            if (id) {

                this.setPathway(pathway);
            }
        }
    }

    handleMenuClick = (e) => {
        if (e.key === 'leave') {
            this.props.leavePathway(this.state.pathway.id).then(() => {
                this.cancePathway();
            });
        }
    }



    render() {

        const { loading, userId, user, ...otherProps } = this.props;
        let { pathway, current } = this.state;
        const { id: pathwayId = '', title = "Pathway", version = '', cancer = {} } = pathway;
        //console.log(pathwayId);
        //console.log(pathway, 'pathway');
        if (pathway.id) {
            return (<PathwayBodyCardEnhanced
                {...otherProps}
                loading={loading} pathway={pathway} user={user} onAdd={this.props.onAdd} setCurrent={this.setCurrent} current={current} handleMenuClick={this.handleMenuClick}
            />);
            // <Card title={title} loading={loading} extra={pathwayId ? <React.Fragment><Tooltip title="Previous Element (Shift+Up)"><Icon type="left-circle-o" onClick={() => this.setCurrent('prev')} /></Tooltip> <Tooltip title="Next Element (Shift+Down)"><Icon type="right-circle-o" onClick={() => this.setCurrent('next')} /></Tooltip> <Dropdown overlay={menu} trigger={['click']}><Icon type="setting" /></Dropdown></React.Fragment> : <Icon type="setting" />} bodyStyle={{overflowY:'auto', height:'100vh'}}>
            //      <PathwayBody  userId={userId} onAdd={this.props.onAdd} id={pathwayId} currentInOrder={current} setCurrentInOrder={this.setCurrent} />
            // </Card>);
        }

        return (
            <Card title={title} loading={loading} extra={<Icon type="setting" />} bodyStyle={{ overflowY: 'auto', height: '100vh' }}>
                <PathwaySelect user={user} onChange={this.selectPathway} />
            </Card>);
    }
}

export default PathwayContent;

const PathwayBodyCard = props => {
    const menu = (
        <Menu onClick={props.handleMenuClick}>
            <Menu.Item key="leave">Leave Pathway</Menu.Item>
            <Menu.Item key="flow"><PathwayFlowButton pathway={props.pathway} /></Menu.Item>
        </Menu>
    );
    const { title, loading, pathway, user, onAdd, setCurrent, current, openElement, setOpenElement, ...otherProps } = props;
    return <Card title={title} loading={loading} type={'pure'} extra={pathway.id ? <React.Fragment><Tooltip title="Previous Element (Shift+Up)"><Icon type="left-circle-o" onClick={() => setCurrent('prev')} /></Tooltip> <Tooltip title="Next Element (Shift+Down)"><Icon type="right-circle-o" onClick={() => setCurrent('next')} style={{ marginRight: 5 }} /></Tooltip> <Dropdown overlay={menu} trigger={['click']}><Icon type="setting" /></Dropdown></React.Fragment> : <Icon type="setting" />} bodyStyle={{ overflowY: 'auto', height: '100vh', marginTop: 1 }}>
        <PathwayBody {...otherProps} user={user} onAdd={onAdd} pathway={pathway} currentInOrder={current} setCurrentInOrder={setCurrent} openElement={openElement} setOpenElement={setOpenElement} />
    </Card>
}


const KEYS = ['shift+up', 'shift+down', 'enter'];
const enhance = compose(
    withSpinnerWhileLoading,
    // branch(props => props.loading, ),
    // withUserPathwayByIdQuery,
    withProps(props => {
        // console.log(props, 'PPathway props');
        const { pathway } = props;
        const { title, version = '', cancer } = pathway;
        const { title: cancerTitle = '' } = cancer || {};
        return {
            title: title + ' - ' + cancerTitle + (version !== '' ? ' - v' + version : '')
        }
    }),
    keydown(KEYS),
    withState('openElement', 'setOpenElement', false),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            //console.log(nextProps);
            const { keydown: { event } } = nextProps;
            if (event) {
                if (event) {
                    const { type, key } = event;
                    //console.log(event);
                    if (type === 'keydown') {
                        if (key === 'ArrowDown') {
                            nextProps.setCurrent('next');
                        } else if (key === 'ArrowUp') {
                            nextProps.setCurrent('prev');
                        } else if (key === 'Enter') {
                            //console.log('add plan');
                            nextProps.setOpenElement(true);
                        }
                    }
                    //console.log(event);
                    //type
                }
                //this.setState( { key: event.which } );

                //
            }
        }

    }),
    //branch(props => props.openElement(), renderComponent(<TimelineElementModal userId={userId} pathway={pathway} {...element} onHide={this.onHide} />))
);
const PathwayBodyCardEnhanced = enhance(PathwayBodyCard);