import React from 'react'
import PropTypes from 'prop-types'

import {Card, Icon, Tooltip} from 'antd';
import { SideToSide } from '../../../../../../components/Layout/Flexbox';
import { formatFileName } from '../../../../../../components/FormCustomFields/components/Attachments';


export default class PlanMedia extends React.PureComponent {
    static propTypes = {
        reportValue: PropTypes.number
    };

    render() {
        const {item, showSize=true} = this.props;
        const {label, mediaType:type, url, embedHtml} = item;
        switch(type) {
            case 'image':
                return <>
                    <img alt={label} src={url} style={{maxWidth: '100%'}} />
                    {/* <div>{label}</div> */}
                </>;
            case 'import':
            case 'audio':
            case 'video':
                if (embedHtml === '') {
                    return <Card style={{maxWidth:'70%'}}
                        cover={<video controls>
                            <source src={url} />
                            Your browser does not support HTML5 video.
                        </video>}
                    ><Card.Meta
                        avatar={<Icon type="play-circle-o" />}
                        title={label}
                    /></Card>;
                }
                return <Card
                             cover={<div dangerouslySetInnerHTML={{__html: embedHtml}}></div>}
                ><Card.Meta
                    avatar={<Icon type="play-circle-o" />}
                    title={label}
                /></Card>;
            default:
                let icon = '';
                if (type === 'presentation') {
                    icon = <Icon type="file-ppt" />;
                } else {
                    icon = <Icon type="file-pdf" />;
                }
                const {label, filesize} = item || {};
                console.log(item);
                return <SideToSide>
                    <div style={{fontSize:'3em', paddingRight:10}}>{icon}</div>
                    <Card hoverable ><a href={item.url} target="_blank"><Card.Meta
                    title={<Tooltip title="Will be pened in a new tab">{label}</Tooltip>}
                    description={formatFileName(item)}
                /></a></Card>
                </SideToSide>
        }


    }
}