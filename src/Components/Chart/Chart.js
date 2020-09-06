import React, { Component } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import "./Chart.scss"
class Chart extends Component {
  state = {
    treesData: [],
    chartData: [],
    chart: null,
  }
  componentDidMount = () => {
    let isMobile = this.props
    console.log(isMobile)
    let chart
    let series
    if (true) {
      // chart = am4core.create("chartdiv", am4charts.PieChart)
      // chart.radius = am4core.percent(5)
      // series = chart.series.push(new am4charts.PieSeries())
      // series.labels.template.fontSize = 10;
      // series.showTooltopOne="always"

      chart = am4core.create(
        "chartdiv",
        am4plugins_forceDirected.ForceDirectedTree
      )
      // chart.fontSize = "70"
      // chart.radius = am4core.percent(90)
      series = chart.series.push(
        new am4plugins_forceDirected.ForceDirectedSeries()
      )
      series.dataFields.value = "value"
      series.dataFields.name = "species"
      series.nodes.template.label.text = "[black]{name}[/]";
      // series.nodes.template.label.fontFamily = "Anonymous Pro";
      
  
      series.fontSize = 12;
      series.minRadius = 15;
      series.maxRadius = 65;
      // series.dataFields.children = "children";
    } else {
      chart = am4core.create("chartdiv", am4charts.XYChart)
      // let series = chart.series.push(new am4charts.PieSeries())
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = "species"
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.minGridDistance = 10
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      // valueAxis.max = this.props.maxValue || 10
      valueAxis.min = 0
      // valueAxis.renderer.grid.template.disabled = true;
      // valueAxis.renderer.labels.template.disabled = true;
      // valueAxis.tooltip.disabled = true;
      series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.categoryX = "species"
      series.dataFields.valueY = "value"
      // series.columns.template.fill = am4core.color("red")
      //  series.labels.template.wrap = true
    }
    series.dataFields.value = "value"
    series.dataFields.category = "species"
    
    let gradient = new am4core.LinearGradient()
    gradient.addColor(am4core.color("#3f87a6"))
    gradient.addColor(am4core.color('white'))
    gradient.addColor(am4core.color("#f69d3c"))
    gradient.rotation = 90
    chart.background.fill = gradient
    chart.background.opacity = 0.99
    
    
   
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
        dataObj.value = d[1]
        dataArray.push(dataObj)
      })
      console.log(dataArray)
      let dataChart = this.state.chart
      dataChart.data = dataArray
     
    }
  }
  render() {
    return (
      <div className="chart-wrapper">
        <div id="chartdiv" />
      </div>
    )
  }
}
export default Chart
