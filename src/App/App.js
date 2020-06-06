import React, { Component } from "react"
import "../Style/App.scss"
import axios from "axios"
import Map from "../Map/Map.js"
import Header from "./Header"
import Footer from "./Footer"

import { getManhattan, getAddress, getBySpecies } from "./Api"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trees: [],
      boroname: "&boroname=Manhattan",
      zipcode: "&zipcode=10001",
      spc_common: "",
      status: "&status=Alive",
      health: "",
      fixHeader: false,
      input: "",
      searchString: "",
      showFilters: false,
      scrollHeader: false,
      keyPress: false
    }
  }

  async componentDidMount() {
    await this.getAddress("00083", "zipcode")
  }

  onSubmit = (evt) => {
    evt.preventDefault()
  }
  getManhattanTrees = async () => {
    console.log("manhattan")
    let trees = await axios.get(getManhattan())
    console.log(trees)
    this.setState({
      trees: trees.data,
      searchString: "Manhattan",
      searchType: "the boro of",
    })
  }
  getAddress = async (srch, type) => {
    console.log(type)

    if(type === 'keyPress'){
      this.setState({
        // trees:[]
        keyPress:true
      })
      
    }
    let trees = await axios.get(getAddress(srch))
    this.setState({ trees: trees.data, searchString: srch, searchType: type, keyPress:false })
  }

  getX = async (srch, type) => {

  }

  speciesListClick = async (spc, srch) => {
    let trees = await axios.get(getBySpecies(spc, srch))
    console.log(trees)

    this.setState({ trees: trees.data, showFilters: !this.state.showFilters })
  }

  handleClickSearch = (clickedValue) => {
    this.setState({
      searchString: clickedValue,
    })
    this.getAddress(clickedValue)
  }

  handleFilterClick = () => {
    // e.stopPropagation()
    this.setState({
      showFilters: !this.state.showFilters,
    })
  }
  scrollHeader = () => {
    this.setState({
      scrollHeader: true,
    })
  }

  render() {
    const {
      onSubmit,
      getAddress,
      handleClickSearch,
      speciesListClick,
      handleFilterClick,
      scrollToView,
      scrollHeader,
    } = this
    const {
      trees,
      searchString,
      fixHeader,
      searchType,
      showFilters,
      keyPress
    } = this.state
    // console.log(searchString)
    return (
      <div className="App">
        <Header
          onsubmit={onSubmit}
          fixHeader={fixHeader}
          searchString={searchString}
          trees={trees}
          getAddress={getAddress}
          scrollToView={scrollToView}
          ref="header"
          scrollHeader={scrollHeader}
          scrollState={this.state.scrollHeader}
          searchString={searchString}
          searchType={searchType}
        />

        <main className="container">
          <div className="results-title">
            {searchType !== undefined && searchType !== 'keyPress'
              ? `${searchType}`
              : trees.length !== 0
              ? "result"
              : ""}
            <span
              onClick={() => getAddress(searchString, searchType)}
            >{` ${searchString}`}</span>
            {trees.length !== 0 && <span style={{fontSize:'12px'}}>{` (${trees.length})`}</span>}
          </div>
          <Map
            treesData={trees}
            searchString={searchString}
            handleFilterClick={handleFilterClick}
            showFilters={showFilters}
            scrollToView={scrollToView}
            switch={this.state.switch}
            scrollHeader={this.scrollHeader}
            showFilters={showFilters}
            handleClickSearch={handleClickSearch}
            speciesListClick={speciesListClick}
            getAddress={getAddress}
            searchType={searchType}
            keyPress={keyPress}
          />
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
