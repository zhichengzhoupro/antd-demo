import React, {Component} from 'react';
import {Button, Card, DatePicker, Form, Input, InputNumber, message, Spin} from "antd";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ArticleService} from "../../services/service";
import {FormProps} from "antd/es/form";
import {EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './Article.scss'
import {Article} from "./Article";
import moment from "moment";

type state = {
    title: string
}
type context = {}
type MatchParams = {
    id: string;
}


interface ArticleEditProps extends RouteComponentProps<MatchParams, context, state>, FormProps {
    articleForm?: any
}


interface ArticleState {
    titleHelp?: string
    validateStatus?: any
    editorState?: any
    article?: Article,
    isCharged?: boolean
}

const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 12},
};
const tailLayout = {
    wrapperCol: {offset: 2, span: 12},
};

const dateFormat = 'YYYY/MM/DD';



class ArticleEdit extends Component<ArticleEditProps, ArticleState> {

    formRef: any = React.createRef();

    constructor(articleEditProps: ArticleEditProps) {
        super(articleEditProps);
        this.state = {
            titleHelp: 'test',
            validateStatus: 'success',
            editorState: EditorState.createEmpty(),
            article: {
                title: '',
                id: '',
                author: '',
                amount: 0,
                body: '',
                createAt: ''
            },
            isCharged: false
        }

    }

    componentDidMount(): void {
        ArticleService.getArticleById(this.props.match.params.id).then((response:any) => {
            this.formRef.current!.setFieldsValue({
                title: response.title,
                author: response.author,
                amount: response.amount,
                createAt: moment(response.createAt)
            });

            const html = response.body;
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({
                    editorState: editorState
                })
            }

            this.setState({
                isCharged: true
            });

        });
    }

    private handleSubmit = () => {

    }

    private onFinish = (values: any) => {
        this.setState({
            isCharged: false
        });

        const newVArticle: Article = {
            amount: values.amount,
            author: values.author,
            body:   draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            createAt: values.createAt,
            id: this.props.match.params.id,
            title: values.title
        };

        ArticleService.updateArticle(newVArticle).then((resp:any)=>{
            message.success("Article saved", 0.5)

       }).finally(() => {
           this.setState({
               isCharged: true
           });
       });



    };

    private onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    private validateUserName = (_: any, value: string) => {
        if (value && value.indexOf('@') !== -1) {
            this.setState({
                titleHelp: 'Should not contain @',
                validateStatus: 'error'
            })
            return Promise.reject("Should not containt @")
        } else {
            this.setState({
                validateStatus: 'success'
            });
            return Promise.resolve();
        }

    }

    private onDateChange = () => {

    }

    private onEditorStateChange = (editorState: any) => {
        this.setState({
            editorState
        })
    }

   private goBack = () => {
        this.props.history.goBack();
    }

    render() {

        return (

            <Card
                title={this.props.location.state ? this.props.location.state.title : 'Edit Article'}
                extra={<Button type={"primary"} onClick={this.goBack}> EXIT </Button>}
            >
                <Spin spinning={!this.state.isCharged}>
                    <Form
                        ref={this.formRef}
                        name="basic"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        {...layout}

                    >
                        <Form.Item
                            label="title"
                            name="title"
                            validateStatus={this.state.validateStatus}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input Article title!'
                                    },

                                    {
                                        validator: this.validateUserName
                                    }

                                ]
                            }
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="author"
                            name="author"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input Article author!'
                                    }
                                ]
                            }
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="amount"
                            name="amount"
                            rules={
                                []
                            }
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item
                            label="Create At"
                            name="createAt"
                            rules={
                                []
                            }
                        >
                            <DatePicker showTime placeholder={"select time"} onChange={this.onDateChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Content"
                            name="content"
                            rules={
                                []
                            }
                        >
                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange.bind(this)}

                            ></Editor>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        );
    }
}

export default withRouter(ArticleEdit);