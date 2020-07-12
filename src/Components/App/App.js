import React, { Component } from "react"
import axios from "axios"

import Header from "../Header/Header.js"
import Map from "../Map/Map.js"
import Footer from "../Footer/Footer.js"
import "./App.scss"

import { getManhattan, getAddress, getBySpecies } from "../Api/Api.js"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trees: [],
    
      fixHeader: false,
      input: "",
      searchString: "",
      showFilters: false,
      scrollHeader: false,
      keyPress: false,
      refreshd:false
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
        keyPress:true
      })
    }
    let trees = await axios.get(getAddress(srch))
    this.setState({ trees: trees.data, searchString: srch, searchType: type, keyPress:false })
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
  handleScroll = () => {
    this.setState({
      scrollHeader: true,
    })
  }
  refresh = () => {
    console.log('here')
    this.setState({ 
      refreshd:!this.state.refreshd,
      scrollHeader:false

    })
  }
  render() {
    console.log('reneder')
    const {
      // onSubmit,
      // getAddress,
      // handleClickSearch,
      // speciesListClick,
      // handleFilterClick,
      handleScroll,
      refresh
    } = this
    const {
      trees,
      searchString,
      fixHeader,
      searchType,
      showFilters,
      keyPress,
      scrollHeader
    } = this.state
    // console.log(searchString)
    return (
      <div className="App" style={{background:'red', height:'100vh'}}>
        <Header
          // onsubmit={onSubmit}
          // fixHeader={fixHeader}
          // searchString={searchString}
          // trees={trees}
          // getAddress={getAddress}
          // ref="header"
          handleScroll={handleScroll}
          scrollHeader={scrollHeader}
          refresh={refresh}
          // searchString={searchString}
          // searchType={searchType}
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
          {/* <Map
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
          /> */}
        </main>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default App
