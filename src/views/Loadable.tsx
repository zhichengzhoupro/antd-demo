// 用于解释高级组件 loadable的原理
import React, {Component} from "react";

interface lo {
    Loader: any;
    Loading: any
}

interface StateLc {
    LoadedComponent: any
}

const Loadable =  ({
    Loader,
    Loading: Loading,

}: lo ) => {

    // 返回一个高级组件
    return class LoadableComponent extends Component {
        state: StateLc = {
            LoadedComponent: null
        }

        componentDidMount(): void {
            // import 的结果 所以是一个then
            Loader().then(
                (resp: any) => {
                    this.setState({
                        LoadedComponent : resp.default
                    })
                }
            )
        }

        render() {

            const LoadedComponent = this.state.LoadedComponent;
            return (

                <div>
                    {
                        LoadedComponent ?
                            <LoadedComponent></LoadedComponent> :
                            <Loading></Loading>
                    }
                </div>
            )
        }
    }
}

export default Loadable;


