import React, {Component} from "react";
import {Avatar, Badge, Breadcrumb, Dropdown, Layout, Menu, Spin} from 'antd';
import './Frame.scss';
import {Route} from '../../routers/Router'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {DownOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import Action from '../../actions'


const {Header, Content, Sider} = Layout;


interface FrameProps extends RouteComponentProps {
    menus: any
    notificationsUnreadCount?: any
    notificationLoading?: boolean,
    getNotifications?: any
    signOut?: any,
    avatarUrl?: string,
    displayName?: string
}

interface FrameState {
    iconComponents: any[],
    defaultSelectedMenuRoute: string
}


class Frame extends Component<FrameProps, FrameState> {

    onDropDown = (key: any) => {
        this.props.history.push(key.key);
    };

    disconnect = () => {
        this.props.signOut();
    }

    menu = () => (
        <Menu onClick={this.onDropDown}>
            <Menu.Item
                key={"/admin/notification"}
            >
                <Badge dot={this.props.notificationsUnreadCount !== 0}>
                    Notification Center
                </Badge>
            </Menu.Item>
            <Menu.Item
                key={"/admin/profile"}
            >
                Profile
            </Menu.Item>
            <Menu.Item onClick={this.disconnect}
                key={"/login"}
            >
                Disconnect
            </Menu.Item>
        </Menu>
    );

    constructor(props: FrameProps) {
        super(props);
        this.state = {
            iconComponents: [],
            /*
             为按钮设置默认的高亮
             defaultSelectedKeys
            * */
            defaultSelectedMenuRoute: props.location.pathname.split('/').slice(0, 3).join('/')

        }
    }


    /*
        这里是用来跳转
    */
    navigate = (e: any) => {
        this.props.history.push(e.key);
    };

    componentDidMount(): void {
        this.props.menus.map((r: Route) => {
            const {iconComponent} = r;
            iconComponent().then((resp: any) => {
                this.setState(state => {
                    const iconComponents = state.iconComponents.concat({
                        pathname: r.pathName,
                        component: resp.default
                    });
                    return {
                        iconComponents
                    };
                })
            })
        });

        // get all notifications
        this.props.getNotifications();

    }

    componentDidUpdate(prevProps: Readonly<FrameProps>, prevState: Readonly<FrameState>, snapshot?: any): void {

        if (this.props.location !== prevProps.location) {
            this.setState({
                defaultSelectedMenuRoute: this.props.location.pathname
            });
        }
    }


    render() {
        return (


            <Layout>
                <Header className="header qf-header">
                    <div className="qf-logo">
                        <img src='/images/logo.png'/>
                    </div>
                    <div className={"weclome-menu-container"}>
                        <Spin spinning={this.props.notificationLoading}>
                            <Dropdown overlay={this.menu} trigger={["click", "hover"]}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <Avatar src={this.props.avatarUrl}/>
                                    <span>Welcome {this.props.displayName} </span>
                                    <Badge showZero={false} count={this.props.notificationsUnreadCount} offset={[10, -10]}>
                                        <DownOutlined/>
                                    </Badge>
                                </a>
                            </Dropdown>
                        </Spin>
                    </div>
                </Header>


                <Sider width={200} className="side-bar site-layout-background">
                    <Menu
                        mode="inline"
                        selectedKeys={[this.state.defaultSelectedMenuRoute]}
                        style={{height: '100%', borderRight: 0}}
                    >
                        {
                            this.props.menus.map((r: Route) => {
                                    return (
                                        <Menu.Item key={r.pathName} onClick={this.navigate}>
                                            {/*
                                                    这里是导入那些icon
                                                */}

                                            {
                                                this.state.iconComponents.find(ic => ic.pathname === r.pathName) ?
                                                    this.state.iconComponents.find(ic => ic.pathname === r.pathName).component.render() : ''
                                            }
                                            {r.title}
                                        </Menu.Item>
                                    )
                                }
                            )
                        }

                    </Menu>
                </Sider>
                <Content
                    className="qf-content site-layout-background"
                >

                    {this.props.children}
                </Content>

            </Layout>



        );
    }
}

const mapToProps: any = (store: any) => {
    return {
        notificationsUnreadCount: store.Notification.list.filter((n: any) => n.isRed === false).length,
        notificationLoading: store.Notification.isLoading,
        avatarUrl : store.Authentification.get('avatarUrl'),
        displayName : store.Authentification.get('displayName')
    }
}

const mapDispatch = {
    getNotifications: Action.notificationAction_getNotifications,
    signOut: Action.authAction_signOut
}

export default withRouter(connect(mapToProps, mapDispatch)(Frame));