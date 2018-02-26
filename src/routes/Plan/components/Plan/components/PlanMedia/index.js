import React from 'react'
import PropTypes from 'prop-types'

import {Card, Icon, Tooltip} from 'antd';


export default class PlanMedia extends React.PureComponent {
    static propTypes = {
        reportValue: PropTypes.number
    };

    render() {
        const {item} = this.props;
        const {label, type, url, embedHtml} = item;
        switch(type) {
            case 'image':
                return <Card
                             cover={<img alt={label} src={url} />}
                ><Card.Meta
                    avatar={<Icon type="picture" />}
                    title={label}

                /></Card>;
            case 'import':
            case 'audio':
                return <Card
                             cover={<div dangerouslySetInnerHTML={{__html: embedHtml}}></div>}
                ><Card.Meta
                    avatar={<Icon type="play-circle-o" />}
                    title={label}
                /></Card>;
            default:
                let icon = '';
                if (type == 'presentation') {
                    icon = <Icon type="file-ppt" />;
                } else {
                    icon = <Icon type="file-pdf" />;
                }
                return <Card hoverable ><a href={item.url} target="_blank"><Card.Meta
                    avatar={icon}
                    title={<Tooltip title="Will be pened in a new tab">{item.label}</Tooltip>}
                    description="Will be opened in a new tab"
                /></a></Card>;//<Slider marks={marks}    />
        }


    }
}