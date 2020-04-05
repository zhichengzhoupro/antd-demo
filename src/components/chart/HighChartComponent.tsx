import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

export const HighChartComponent = (props: HighchartsReact.Props) => <div>
    <HighchartsReact
        highcharts={Highcharts}
        {...props}
    />
</div>