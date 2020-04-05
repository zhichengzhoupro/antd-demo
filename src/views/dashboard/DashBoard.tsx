import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Row, Spin} from "antd";
import './Dashboard.scss';
import Highcharts from 'highcharts'
import {HighChartComponent} from "../../components/chart/HighChartComponent";
import {ArticleService} from "../../services/service";
import {TwitterOutlined, AlipayOutlined, WechatOutlined, YoutubeOutlined} from '@ant-design/icons'

const  overViewColors = ['#8002EE', '#ee02e6', '#ee8002', '#70ee02', '#FF0266', '#4DB6AC', '#81C784', '#A1887F', '#BDBDBD', '#4FC3F7', '#4DD0E1'];


interface DashBoardState {
    options: Highcharts.Options
    isLoading: boolean
    firstNumbers?: any[]
}

interface DashBoardProps {

}

function getRandomInt() {
    const random =  Math.floor(Math.random() * Math.floor(overViewColors.length));
    return overViewColors[random];
}
class DashBoard extends Component<DashBoardProps, DashBoardState> {

    constructor(props: DashBoardProps) {
        super(props);
        this.state = {
            options : {
                title: {
                    text: 'My chart'
                },
                series: [{
                    type: 'line',
                    data: [1, 2, 3]
                }]
            },
            isLoading: true
        }
    }

    componentDidMount(): void {
        ArticleService.getKpiArticleAmountByMonthYear().then(
            (data: any) => {
                const cloneData = [...data];
                this.setState({
                    firstNumbers : cloneData.sort((r1:any, r2:any)=> parseInt(r1.amount) - parseInt(r2.amount)).reverse().slice(0, 4),
                    options: {
                        title: {
                            text: 'My chart'
                        },
                        series: [{
                            type: 'line',
                            data: data.map((d: any) => parseInt(d.amount)),
                            allowPointSelect: true
                        }],

                        xAxis: {
                            categories: data.map((d: any) => d.month)
                        },
                        yAxis: {
                            title: {
                                text: 'Sum of Amounts'
                            }
                        },

                    },
                    isLoading: false
                });
                console.log('this.state.firstNumbers', this.state.firstNumbers)
            }
        )
    }

    render() {
        const style = { background: '#0092ff', padding: '8px 0' };
        return (
            <Fragment>
                <Card
                    title={'DashBoard'}
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className='qf-col-box' style={{backgroundColor: getRandomInt()}}>

                                { this.state.firstNumbers &&  this.state.firstNumbers.length > 0 ?
                                    <Fragment>
                                        <TwitterOutlined  style={{ fontSize: '36px' }}/>
                                        {this.state.firstNumbers ? this.state.firstNumbers[0].amount:''}

                                    </Fragment>:
                                    ''
                                }

                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className='qf-col-box' style={{backgroundColor: getRandomInt()}}>

                                { this.state.firstNumbers &&  this.state.firstNumbers.length > 0?
                                    <Fragment>
                                        <AlipayOutlined style={{ fontSize: '36px' }} />
                                        {this.state.firstNumbers ? this.state.firstNumbers[1].amount:''}
                                    </Fragment>:
                                    ''
                                }

                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className='qf-col-box' style={{backgroundColor: getRandomInt()}}>

                                { this.state.firstNumbers &&  this.state.firstNumbers.length > 0 ?
                                    <Fragment>
                                        <WechatOutlined style={{ fontSize: '36px' }}/>
                                        {this.state.firstNumbers ? this.state.firstNumbers[2].amount:''}
                                    </Fragment>:
                                    ''
                                }

                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className='qf-col-box' style={{backgroundColor: getRandomInt()}}>
                                { this.state.firstNumbers &&  this.state.firstNumbers.length > 0 ?
                                    <Fragment>
                                        <YoutubeOutlined style={{ fontSize: '36px' }}/>
                                        {this.state.firstNumbers ? this.state.firstNumbers[3].amount:''}
                                    </Fragment>:
                                    ''
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Spin spinning={this.state.isLoading}>
                        <div>
                            <HighChartComponent options={this.state.options}></HighChartComponent>
                        </div>
                    </Spin>
                </Card>
            </Fragment>
        );
    }
}




export default DashBoard;