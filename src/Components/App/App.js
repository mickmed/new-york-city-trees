import React, { Component } from "react"
import axios from "axios"
import Header from "../Header/Header.js"
import Map from "../Map/Map.js"
import Footer from "../Footer/Footer.js"
import "./App.scss"
import { getAddress, getBySpecies } from "../Api/Api.js"
import { Route } from "react-router-dom"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trees: [],
      fixHeader: false,
      input: "",
      searchString: "",
      showFilters: false,
      showPie: false,
      scrollHeader: false,
      keyPress: false,
      resizeMap: false,
      mapCont: "70vh",
    }
    this.imgRef = React.createRef()
    this.contRef = React.createRef()
  }
  async componentDidMount() {
    await this.getAddress("00083", "zipcode")
  }
  getAddress = async (srch, type) => {
    if (type === "keyPress") {
      this.setState({
        keyPress: true,
      })
    }
    let trees = await axios.get(getAddress(srch))
    this.setState({
      trees: trees.data,
      searchString: srch,
      searchType: type,
      keyPress: false,
    })
  }
  speciesListClick = async (spc, srch) => {
    let trees = await axios.get(getBySpecies(spc, srch))
    console.log(trees)
    this.setState({
      trees: trees.data,
      showFilters: !this.state.showFilters,
      showPie: false,
    })
  }
  handleClickSearch = (clickedValue) => {
    this.setState({
      searchString: clickedValue,
    })
    this.getAddress(clickedValue)
  }
  handleFilterClick = () => {
    this.setState({
      showFilters: !this.state.showFilters,
      showPie: false,
    })
  }
  handlePieClick = () => {
    this.setState({
      showFilters: false,
      showPie: !this.state.showPie,
    })
  }
  handleScroll = () => {
    this.setState({
      scrollHeader: !this.state.scrollHeader,
    })
  }
  scrollToView = async (headerHeight, orig) => {
    let imgHeight = getComputedStyle(this.imgRef.current).height.slice(0, -2)
    orig === "header"
      ? window.pageYOffset !== 0 &&
        window.scrollTo({ top: 0, behavior: "smooth" })
      : window.scrollTo({ top: imgHeight, behavior: "smooth" })
    orig === "header"
      ? this.setState({ mapCont: "70vh", resizeMap: !this.state.resizeMap })
      : this.setState({ mapCont: "80vh", resizeMap: !this.state.resizeMap })
  }
  render() {
    const {
      getAddress,
      handleScroll,
      scrollToView,
      speciesListClick,
      handleFilterClick,
      handlePieClick,
    } = this
    const {
      trees,
      searchString,
      searchType,
      showFilters,
      showPie,
     
      scrollHeader,
      resizeMap,
    } = this.state
    return (
      <div
        className="App"
      >
        <Header
          getAddress={getAddress}
          handleScroll={handleScroll}
          scrollToView={scrollToView}
          scrollHeader={scrollHeader}
        />
        <Route exact path="/">
          <main className="container" ref={this.contRef}>
            <div className="nyc-logo" ref={this.imgRef}>
              <img src="images/nyc.png" alt="nyc trees" />
            </div>
            <div className="results-title">
              {searchType !== undefined && searchType !== "keyPress"
                ? `${searchType}:`
                : trees.length !== 0
                ? "result:"
                : "no results for:"}
                
              <span
                onClick={() => getAddress(searchString, searchType)}
              >{` ${searchString}`}</span>
             
              {trees.length !== 0 && (
                <span style={{ fontSize: "12px" }}>{` (${trees.length})`}</span>
              )}
            </div>
            <div className="map-container" style={{ height: this.state.mapCont }}>
              <Map
                treesData={trees}
                resizeMap={resizeMap}
                searchString={searchString}
                handleFilterClick={handleFilterClick}
                handlePieClick={handlePieClick}
                containerHeight={this.state.containerHeight}
                showFilters={showFilters}
                showPie={showPie}
                speciesListClick={speciesListClick}
                handleScroll={handleScroll}
              />
            </div>
          </main>
        </Route>
        <Route path="/about">
          <div>site built by Mick Roth</div>
        </Route>
        <Footer />
      </div>
    )
  }
}
export default App
