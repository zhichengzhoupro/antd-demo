import React, {Component, Fragment} from 'react';
import {Button, Card, Table, Tag, Modal, Typography, Tooltip} from "antd";
import {ArticleService} from "../../services/service";
import moment from "moment";
import ButtonGroup from "antd/es/button/button-group";
import XLSX from 'xlsx';
import {RouteComponentProps, withRouter} from 'react-router-dom'

const {Text} = Typography;

interface ArticleProps extends RouteComponentProps {
}

interface ArticleState {
    dataSource?: any[];
    columns?: any[];
    total?: number;
    isLoading: boolean;
    offset: number;
    limited: number;
}

interface ArticleList {
    _isMounted?: boolean
}

class ArticleList extends Component<ArticleProps, Partial<ArticleState>> implements ArticleList {

    constructor(props: any) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            isLoading: true,
            offset: 0,
            limited: 10
        }

    }

    componentWillUnmount(): void {
        this._isMounted = false
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.getArticles();
    }

    private getArticles() {
        ArticleService.getArticles({
            offset: this.state.offset,
            limited: this.state.limited
        },).then((resp: any) => {
            if (resp.list && resp.list.length > 0) {
                const columnKeys = Object.keys(resp.list[0]);
                const columns = this.getColumns(columnKeys);

                if (this._isMounted) {
                    this.setState({
                        dataSource: resp.list,
                        columns: columns,
                        total: resp.total,
                        isLoading: false
                    })
                }
            }
        }).finally(() => {
            if (this._isMounted) {
                this.setState({
                    isLoading: false
                });
            }
        })
    }

    private getColumns(columnKeys: string[]) {
        const columns = columnKeys.map((ck: string) => {

            if (ck === 'amount') {
                return {
                    title: ck,
                    render: (text: string, record: any) => {
                        const {amount} = record;

                        return (
                            <Tooltip title="test" placement="top">
                                <Tag color={amount > 8 ? "red" : "green"}>{record.amount}
                                </Tag>
                            </Tooltip>
                        )
                    },
                    key: ck,
                }
            }

            if (ck === 'createAt') {
                return {
                    title: ck,
                    render: (text: string, record: any) => {
                        const {createAt} = record;

                        return <Tag>{moment(createAt).format('YYYY-MM-DD hh:mm:ss')}</Tag>
                    },
                    key: ck,
                }
            }
            return {
                title: ck,
                dataIndex: ck,
                key: ck,
            }
        });

        columns.push({
            title: "Action",
            key: "operation",
            render: (text: string, record: any) => {
                return (
                    <ButtonGroup size={"small"} style={{display: "inline-flex"}}>
                        <Button size={"small"} onClick={this.toEdit.bind(this, record)}>Edit</Button>
                        <Button size={"small"} type={"danger"}
                                onClick={this.deleteArticle.bind(this, record)}>delete</Button>
                    </ButtonGroup>
                )
            }
        })

        return columns;
    }

    onPageChange = (page: any, pageSize: any) => {
        this.setState({
            limited: pageSize,
            offset: pageSize * (page - 1)
            // 在setState之后做的行为 一个回调
        }, () => {
            this.getArticles()
        })
    };

    onShowSizeChange = (current: any, size: any) => {
        this.setState({
            limited: size,
            offset: 0
            // 在setState之后做的行为 一个回调
        }, () => {
            this.getArticles()
        })
    };


    render() {

        return (
            <Fragment>
                <Card
                    extra={<Button onClick={this.toExcel}>Export Excel</Button>}
                    title="Article List"
                    bordered={false}>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey='id' pagination={{
                        total: this.state.total,
                        onChange: this.onPageChange,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onShowSizeChange: this.onShowSizeChange
                    }} loading={this.state.isLoading}/>
                </Card>
            </Fragment>
        );
    }

    toExcel = () => {
        //实际项目中 这个功能是后台功能
        // 现在我们在前台简单实现一下
        //his.state.dataSource![0] 感叹号 可能唯恐 ？表示是optional
        const data = [Object.keys(this.state.dataSource![0])]
        this.state.dataSource!.forEach(ds => {
            data.push(Object.values(ds))
        });
        const ws = XLSX.utils.aoa_to_sheet(data);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `sheetjs-${moment().format('YYYYMMDDhhmmss')}.xlsx`)

    }

    private deleteArticle = (record: any) => {
        Modal.confirm({
            content: <Text>Are you sure to delete article <Text type="danger"> {record.title} </Text> </Text>,
            onOk: this.confirmDelete.bind(this, record)
        });
    }

    private confirmDelete = (arg: any) => {
        ArticleService.deleteArticle(arg.id).then(() => {
            this.getArticles();
        })
    }

    private toEdit = (record: any) => {
        this.props.history.push({
            pathname: `/admin/article/edit/${record.id}`,
            state: {
                title: record.title
            }
        })
    }
}

export default withRouter(ArticleList);


