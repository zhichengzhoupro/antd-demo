import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Button, Card, Col, Form, Input, Row, Spin, Upload} from "antd";
import './profile.scss'
import ActionCreators from '../../actions'

interface ProfileProps {
    id?: any
    username?: any,
    role?: any,
    uploadAvatar?: any,
    displayName?: any,
    avatarUrl?: any,
    avatarUploading?: any,
    avatarUploadError?: any
    avatarChanged?: boolean,
    updateUserInfo?: any
    userInfoLoading?: boolean
}

interface ProfileStates {
    isUploading?: boolean,
    avatarUrl?: any
}

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 4, span: 12},
};

class UserInfo {
    id?: string;
    username?: string;
    avatarUrl?: string;
    role?: string;
    displayName?: string;
    password?: string;
}

class Profile extends Component<ProfileProps, ProfileStates> {

    formRef: any = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            isUploading: false
        }
    }

    upload = (e: any) => {
        const {file} = e
        this.props.uploadAvatar(file);
    }

    componentDidMount(): void {
        this.formRef.current!.setFieldsValue({
            username: this.props.username,
            avatar: this.props.avatarUrl,
            role: this.props.role,
            displayName: this.props.displayName
        });
    }

    onFinish = (e: any) => {
        const {username, role, displayName, password} = e;
        const userInfo: UserInfo = new UserInfo();
        userInfo.id = this.props.id;
        userInfo.username = username;
        userInfo.role = role;
        userInfo.displayName = displayName;
        userInfo.password = password;
        userInfo.avatarUrl= this.props.avatarUrl;

        this.props.updateUserInfo(userInfo);
    }

    onFinishFailed = () => {

    }

    render() {
        return (
            <Card
                title={"Profile"}
            >
                <Row>
                    <Col span={4} style={{overflow: "hidden"}}>

                        <Upload className={"qf-upload"} showUploadList={false} customRequest={this.upload}>
                            <Spin spinning={this.props.avatarUploading}>
                                {
                                    this.props.avatarUrl ?
                                        <Badge dot={this.props.avatarChanged} offset={[1,2]}>
                                            <img src={this.props.avatarUrl} className={'qf-avatar-img'}/>
                                        </Badge> :
                                        <span>Click</span>

                                }
                            </Spin>
                        </Upload>

                    </Col>
                    <Col span={12}>
                        <Spin spinning={this.props.userInfoLoading}>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            style={{marginLeft: "5%"}}
                            {...layout}
                        >
                            <Form.Item
                                label="User Name"
                                name="username"
                                validateStatus={this.props.username}
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input user name'
                                        }

                                    ]
                                }
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Role"
                                name="role"
                                validateStatus={this.props.role}
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input role'
                                        }

                                    ]
                                }
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Display Name"
                                name="displayName"
                                validateStatus={this.props.role}
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input role'
                                        }

                                    ]
                                }
                            >
                                <Input/>
                            </Form.Item>


                            <Form.Item
                                label="Password"
                                name="password"
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        </Spin>
                    </Col>
                </Row>
            </Card>
        );
    }
}


function mapStateToProps(store: any) {
    return {
        id: store.Authentification.get('id'),
        username: store.Authentification.get('username'),
        role: store.Authentification.get('role'),
        avatarUrl: store.Authentification.get('avatarUrl'),
        displayName: store.Authentification.get('displayName'),
        avatarUploading: store.Authentification.get('avatarUploading'),
        avatarUploadError: store.Authentification.get('avatarUploadError'),
        avatarChanged: store.Authentification.get('avatarChanged'),
        userInfoLoading: store.Authentification.get('userInfoLoading'),
    };
}

const mapActionCreatorToProps = {
    uploadAvatar: ActionCreators.profilAction_uploadAvatar,
    updateUserInfo: ActionCreators.profilAction_updateUserInfo,
}

export default connect(
    mapStateToProps, mapActionCreatorToProps
)(Profile);