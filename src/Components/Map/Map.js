import React, { Component } from "react"
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl"
// import TreePin from "./tree-pin.js";
import TreeInfo from "../TreesList/TreeInfo.js"
// import ControlPanel from "./control-panel.js";
import "./Map.scss"
import TreesList from "../TreesList/TreesList"
import Chart from "../Chart/Chart.js"
import { countSpecies } from "../Helpers/Shared.js"
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
}
class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilters: false,
      // trees: [],
      // boroname: "&boroname=Manhattan",
      // zipcode: "",
      // spc_common: "",
      // status: "&status=Alive",
      // health: "",
      viewport: {
        width: 1200,
        height: 600,
        latitude: 0,
        longitude: 0,
        zoom: 14,
      },
      // lat: 0,
      // long: 0,
      // info: null,
      // popupInfo: null,
      // tree: null
    }
  }
  componentDidMount() {
    this.resizeMap()
    window.addEventListener("resize", () => this.resizeMap())
    this.resizeMap()
  }
  resizeMap = () => {
    const mapDims = document.querySelector(".map-wrapper")
    // console.log('mapDims', mapDims.offsetHeight,mapDims.offsetWidth)
    this.onViewportChange({
      width: mapDims.offsetWidth,
      height: mapDims.offsetHeight,
    })
  }
  componentDidUpdate(prevProps, prevState) {
    let { treesData, searchString } = this.props
    if (treesData !== prevProps.treesData) {
      this.changeLongLat(treesData, searchString)
    }
  }
  changeLongLat = (treesData, searchString) => {
    let index =
      treesData.length > 99 && searchString === "00083"
        ? treesData.length - 100
        : treesData.length - 1
    let len = treesData.length
    let zoom = len < 10 ? 17 : len < 100 ? 14 : 13
    let iconSize = len < 10 ? "20" : len < 100 ? "10" : "4"
    let style = {
      height: iconSize + "px",
      width: iconSize + "px",
      transform: `translate('${80}px','${80}px')`,
      background: `green`,
    }
    // console.log(treesData[0], index)
    treesData[0] &&
      this.onViewportChange(
        {
          longitude: parseFloat(treesData[index].longitude),
          latitude: parseFloat(treesData[index].latitude),
          zoom: zoom,
        },
        style
      )
  }
  resizeIcon = (viewport) => {
    let zoom = viewport.zoom
    let iconSize =
      zoom < 10
        ? "2"
        : zoom < 13
        ? "3"
        : zoom < 16
        ? "5"
        : zoom < 18
        ? "15"
        : "20"
    let style = {
      height: iconSize + "px",
      width: iconSize + "px",
      // transform: `translate(${iconSize^2}px,${iconSize^2}px)`,
      background: `green`,
    }
    this.onViewportChange(viewport, style)
    // let iconSize = zoom < 12 ? '20px' : zoom < 17 ? '10px' : '5px'
  }
  onViewportChange = (viewport, style) => {
    this.setState((prevState) => ({
      viewport: {
        ...prevState.viewport,
        ...viewport,
      },
      style: style,
    }))
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.treesData !== prevState.treesData) {
  //     return { treesData: nextProps.treesData }
  //   } else return null
  // }
  _renderMarker = (tree, index) => {
    // let markers = ReactDOM.findDOMNode(this)
    return (
      <Marker
        // className='treepin'
        // style={{backgroundColor:"black !mportant", height:"50px", width:"50px"}}
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
      >
        <div
          className="treepin"
          style={this.state.style}
          // onClick={() =>
          //   this.setState({
          //     tree: tree,
          //   })
          // }
        >
          {/* {tree.status === "Alive" && (
            <p className="tree-emoji-alive" style={this.state.style}>{`\u{1F333}`}</p>
          )} */}
          {/* {tree.status === 'Alive' && (
            <img src='images/tree3.png' className="tree-emoji-alive" style={this.state.style}/>
          )} */}
          {/* {tree.status === "Stump" && (
            <p className="tree-emoji-stump" title={`\u{1F96B}`}>{`\u{1F96B}`}</p>
          )}
          {tree.status === "Dead" && (
            <p className="tree-emoji-dead" title={`\u{1F334}`}>{`\u{1F334}`}</p>
          )} */}
        </div>
        {/* <TreePin
          size={20}
          onClick={() =>
            this.setState({
              const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
              tree: tree
            })
          }
        /> */}
      </Marker>
    )
  }
  _renderPopup(map) {
    const { tree } = this.state
    return (
      tree && (
        <Popup
          tipSize={50}
          offsetLeft={12}
          offsetTop={15}
          longitude={parseFloat(tree.longitude)}
          latitude={parseFloat(tree.latitude)}
          closeOnClick={false}
          onClose={() => this.setState({ tree: null })}
        >
          <TreeInfo info={tree} />
        </Popup>
      )
    )
  }
  render() {
    const { viewport } = this.state
    const {
      showFilters,
      searchString,
      handleClickSearch,
      speciesListClick,
      getAddress,
      searchType,
      scrollHeader,
      handleScroll,
      keyPress,
    } = this.props
    const trees = this.props.treesData && this.props.treesData
    let speciesCount = countSpecies(trees)
    let style = keyPress ? { display: "block" } : { display: "none" }

    return (
      <div className="map-wrapper" onClick={() => handleScroll()}>
        <div className="tree-gif" style={style}>
          <img src="./images/tree.gif" />
        </div>
        <div className="icons">
          <ion-icon
            onClick={() => this.props.handleFilterClick()}
            name="funnel-outline"
          />
          <ion-icon
            onClick={() => this.props.handlePieChart()}
            name="pie-chart-outline"
          />
        </div>
        <ReactMapGL
          className="map"
          width={viewport.width}
          height={viewport.height}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={this.resizeIcon}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {/* <div onLoad={this.hello} /> */}
          {/* {this.state.tree && this.state.tree.latitude} */}
          {trees.length && trees.map(this._renderMarker)}
          {this._renderPopup()}
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this.resizeIcon} />
          </div>
        </ReactMapGL>
        {showFilters && (
          <TreesList
            treesData={trees}
            speciesCount={speciesCount}
            searchString={searchString}
            handleClickSearch={handleClickSearch}
            speciesListClick={speciesListClick}
            getAddress={getAddress}
            searchType={searchType}
            showFilters={showFilters}
            // scrollToView={scrollToView}
          />
        )}
      </div>
    )
  }
}
export default Map