import React, { Component } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import { countSpecies } from "../Helpers/Shared.js"
import './Chart.scss'

class Chart extends Component {
  state = {
    treesData: [],
    chartData: [],
    chart: null,
  }
  componentDidMount = () => {
    let chart = am4core.create("chartdiv", am4charts.XYChart)
    // let series = chart.series.push(new am4charts.PieSeries())

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = "species"
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;




    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    // valueAxis.max = this.props.maxValue || 10
    valueAxis.min = 0
    // valueAxis.renderer.grid.template.disabled = true;
    // valueAxis.renderer.labels.template.disabled = true;
    // valueAxis.tooltip.disabled = true;



    let series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.categoryX = "species"
    series.dataFields.valueY = "amount"
    // series.columns.template.fill = am4core.color("red")






    series.dataFields.value = "amount"
    series.dataFields.category = "species"
    //  series.labels.template.wrap = true
     
    console.log(this.state.chartData)
    // this.setState({
    //     treesData: this.props.speciesCount,
    //     treesDataArray: dataArray
    //   })
    this.setState((prevState) => ({
      chart,
    }))
    chart.data = this.state.chartData
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState, this.props)
    if (
      this.props.speciesCount.length &&
      prevState.chartData !== prevProps.speciesCount
    ) {
      let dataArray = []
      this.props.speciesCount.forEach((d, i) => {
        let dataObj = {}
        dataObj.species = d[0]
        dataObj.amount = d[1]
        dataArray.push(dataObj)
      })
      let dataChart = this.state.chart
      dataChart.data = dataArray
      dataChart.fontSize = '7'
      dataChart.radius = am4core.percent(20);
    }
  }
  render() {
    return (
      <div className='chart-wrapper'>
       <div id="chartdiv"></div>
      </div>
    )
  }
}
export default Chart
