import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Checkbox, Col, Form, Input, message, Row, Spin} from "antd";
import './SignUp.scss'
import {AuthService} from '../../services/service';
import {RouteComponentProps, withRouter} from "react-router-dom";

function mapStateToProps(state: any) {
    return {};
}

interface SignUpState {
    isSignUpLoading?: boolean
}

interface SignUpProps extends RouteComponentProps{
}

class SignUp extends Component<SignUpProps, SignUpState> {

    layout = {
        labelCol: {span: 3, offset: 4},
        wrapperCol: {span: 10},
    };
    tailLayout = {
        wrapperCol: {offset: 7, span: 4},
    };


    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            isSignUpLoading: false
        }
    }

    onFinish = (values: any) => {
        this.setState({
            isSignUpLoading: true
        });
        AuthService.signUp(values).then(() => {
            this.props.history.push("/login");
        }).catch((error: any) => {
           message.error(error.response.data.message, 1);
        }).finally(()=> {
            this.setState({
                isSignUpLoading: false
            });
        })
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div className={"qf-login-form-container"}>
                <Row>

                    <Col span={12} offset={6} className={"qf-login-form-col"}>
                        <Card
                            title={"Sign Up"}
                        >
                            <Spin spinning={this.state.isSignUpLoading}>
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

                                    <Form.Item {...this.tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
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

export default withRouter(connect(
    mapStateToProps,
)(SignUp));