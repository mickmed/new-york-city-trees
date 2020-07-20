import React, { Component } from "react"
import axios from "axios"

import Header from "../Header/Header.js"
import Map from "../Map/Map.js"
import Chart from '../Chart/Chart.js'
import Footer from "../Footer/Footer.js"
import "./App.scss"
import { countSpecies } from '../Helpers/Shared.js'

import { getManhattan, getAddress, getBySpecies } from "../Api/Api.js"

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
      scrollHeader: false,
      keyPress: false,
    }
  }

  async componentDidMount() {
    await this.getAddress("00083", "zipcode")
  }
  // onSubmit = (evt) => {
  //   evt.preventDefault()
  // }
  // getManhattanTrees = async () => {
  //   console.log("manhattan")
  //   let trees = await axios.get(getManhattan())
  //   console.log(trees)
  //   this.setState({
  //     trees: trees.data,
  //     searchString: "Manhattan",
  //     searchType: "the boro of",
  //   })
  // }
  getAddress = async (srch, type) => {
    console.log(type, "here", srch)
    if (type === "keyPress") {
      this.setState({
        keyPress: true,
      })
    }
    let trees = await axios.get(getAddress(srch))
    console.log(trees)
    this.setState({
      trees: trees.data,
      searchString: srch,
      searchType: type,
      keyPress: false,
    })
  }
  speciesListClick = async (spc, srch) => {
    console.log('srch', srch)
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
      scrollHeader: !this.state.scrollHeader,
    })
  }

  scrollToView = async (headerHeight, bannerHeight, orig) => {
    // console.log(headerHeight / 10)

    // console.log(imgHeight, headerHeight, bannerHeight, window.pageYOffset)

    let time = 200
    let fadeOut = await setInterval(() => {
      time -= 20
      // this.refs.img.style.opacity = time / 200
      if (time === 0) {
        clearInterval(fadeOut)
        orig === "header"
          ? window.pageYOffset !== 0 && window.scrollTo(0, 0)
          : window.pageYOffset < headerHeight - bannerHeight &&
            window.scrollTo(0, headerHeight - bannerHeight)
      }
    }, 20)
  }

  render() {
    const {
      // onSubmit,
      getAddress,
      handleScroll,
      scrollToView,
      // handleClickSearch,
      speciesListClick,
      handleFilterClick,
    } = this
    const {
      trees,
      searchString,
      fixHeader,
      searchType,
      showFilters,
      keyPress,
      scrollHeader,
    } = this.state
    // console.log(searchString)
    let speciesCount = countSpecies(trees)

    return (
      <div
        className="App"
        // style={{ height: "100vh" }}
      >
        <Header
          // onsubmit={onSubmit}
          // fixHeader={fixHeader}
          // searchString={searchString}
          // trees={trees}
          getAddress={getAddress}
          // ref="header"
          handleScroll={handleScroll}
          scrollToView={scrollToView}
          scrollHeader={scrollHeader}
          // searchString={searchString}
          // searchType={searchType}
        />
        <Route exact path="/">
          <main className="container">
            <div className="results-title">
              {searchType !== undefined && searchType !== "keyPress"
                ? `${searchType}`
                : trees.length !== 0
                ? "result"
                : ""}
              <span
                onClick={() => getAddress(searchString, searchType)}
              >{` ${searchString}`}</span>
              {trees.length !== 0 && (
                <span style={{ fontSize: "12px" }}>{` (${trees.length})`}</span>
              )}
            </div>
            <Map
              treesData={trees}
              handleScroll={handleScroll}
              searchString={searchString}
              handleFilterClick={handleFilterClick}
              showFilters={showFilters}
              // scrollToView={scrollToView}
              // switch={this.state.switch}
              // scrollHeader={this.scrollHeader}
              
              // handleClickSearch={handleClickSearch}
              speciesListClick={speciesListClick}
              // getAddress={getAddress}
              // searchType={searchType}
              // keyPress={keyPress}
            />
            <Chart speciesCount={speciesCount}/>
          
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
