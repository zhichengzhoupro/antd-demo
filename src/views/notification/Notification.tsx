import React, {Component} from 'react';
import {Card, List, Avatar, Badge, Button, Spin} from "antd";
import {connect} from "react-redux";
import ActionsCreator from "../../actions";

interface NotifcationProps {
    list?: any[],
    markNotificationAsReadById?: any
    markAllNotifications?: any
    isLoading?: boolean
}


class Notification extends Component<NotifcationProps> {

    constructor(props: NotifcationProps) {
        super(props);
    }

    render() {
        return (
            <Card
                title="Notifications Center"
                extra={<Button onClick={this.props.markAllNotifications} disabled={this.props.list!.every(i => i.isRed == true)} >Mark all Notifications</Button>}
            >
                <Spin spinning={this.props.isLoading}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                            <List.Item
                                extra={item.isRed ? null :
                                    <Button onClick={this.props.markNotificationAsReadById.bind(this, item.id)}>Mark As
                                        Read</Button>}
                            >
                                <List.Item.Meta
                                    title={<Badge dot={!item.isRed}>{item.title}</Badge>}
                                    description={item.body}
                                />
                            </List.Item>
                        )}
                    />
                </Spin>
            </Card>
        );
    }
}

const mapToProps: any = (state: any) => {

    const {
        isLoading = false,
        list = []
    } = state.Notification
    return ({
        isLoading,
        list
    })
}

const mapDispatch = {

    markNotificationAsReadById: ActionsCreator.notificationAction_markNotificationAsReadById,
    markAllNotifications: ActionsCreator.notificationAction_markAllNotifications

}

export default connect(mapToProps, mapDispatch)(Notification);