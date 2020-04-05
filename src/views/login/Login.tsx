import React, {Component} from 'react';
import {Button, Card, Checkbox, Col, Form, Input, Row, Spin} from "antd";
import './login.scss'
import ActionsDispatcher from "../../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface LoginProps extends RouteComponentProps{
    isSignIn: boolean,
    signInDispatch: any,
    isSignInLoading?: boolean
}

class Login extends Component<LoginProps> {

    layout = {
        labelCol: {span: 3, offset: 4},
        wrapperCol: {span: 10},
    };
    tailLayout = {
        wrapperCol: {offset: 7, span: 8},
    };

    onFinish = (values: any) => {
        this.props.signInDispatch(values)
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    toSignUp = () => {
        this.props.history.push("/signup");
    }

    render() {
        return (
            this.props.isSignIn ?
                <Redirect to={"/"}></Redirect> :


                <div className={"qf-login-form-container"}>
                    <Row>

                        <Col span={12} offset={6} className={"qf-login-form-col"}>
                            <Card
                                title={"Login"}
                            >
                                <Spin spinning={this.props.isSignInLoading}>
                                    <Form
                                        {...this.layout}
                                        name="basic"
                                        initialValues={{remember: true}}
                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}
                                        className={"login-form"}
                                    >
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[{required: true, message: 'Please input your username!'}]}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{required: true, message: 'Please input your password!'}]}
                                        >
                                            <Input.Password/>
                                        </Form.Item>

                                        <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <Form.Item {...this.tailLayout}>
                                            <Button type="primary" htmlType="submit">
                                                Sign In
                                            </Button>
                                            <Button htmlType="button" onClick={this.toSignUp}>
                                                Sign Up
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Spin>
                            </Card>
                        </Col>
                    </Row>
                </div>

        );
    }
}

const mapToProps: any = (store: any) => {
    return {
        isSignIn: store.Authentification.get('isSignIn'),
        isSignInLoading: store.Authentification.get('isSignInLoading')
    }
}

const mapDispatchProps = {
    signInDispatch: ActionsDispatcher.authAction_signIn,

}


export default withRouter(connect(mapToProps, mapDispatchProps)(Login));