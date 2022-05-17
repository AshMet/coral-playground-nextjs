/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { Component } from "react";
import { Text } from "@chakra-ui/react";
// import Chart from "react-apexcharts";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      // <Chart
      //   options={this.state.chartOptions}
      //   series={this.state.chartData}
      //   type='bar'
      //   width='100%'
      //   height='100%'
      // />
      <Text>Placeholder Text</Text>
    );
  }
}

export default ColumnChart;
