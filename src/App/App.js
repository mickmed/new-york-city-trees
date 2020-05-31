import React, { Component } from "react"
import "../Style/App.scss"
import axios from "axios"
import TreesList from "../TreesList/TreesList"
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
      searchString: ''
    }
  }

  async componentDidMount() {
    await this.getAddress('00083', 'zipcode')
  }

  onSubmit = (evt) => {
    evt.preventDefault()
  }
  getManhattanTrees = async () => {
    console.log('manhattan')
    let trees = await axios.get(getManhattan())
    console.log(trees)
    this.setState({ trees: trees.data, searchString: 'Manhattan', searchType: 'the boro of' })

  }
  getAddress = async (srch, type) => {
    console.log(type)
    let trees = await axios.get(getAddress(srch))
    this.setState({ trees: trees.data, searchString: srch, searchType: type })
  }

  speciesListClick = async (spc, srch) => {
    let trees = await axios.get(getBySpecies(spc, srch))
    this.setState({ trees: trees.data })
  }

  handleClickSearch = (clickedValue) => {
    this.setState({
      searchString: clickedValue,
    })
    this.getAddress(clickedValue)
  }
  render() {
    const { onSubmit, getAddress, handleClickSearch, speciesListClick } = this
    const { trees, searchString, fixHeader, searchType } = this.state
    return (
      <div className="App">
        <Header
          onsubmit={onSubmit}
          fixHeader={fixHeader}
          searchString={searchString}
          trees={trees}
          getAddress={getAddress}
        />


        <main className="container">
          <Map
            treesData={trees}
            searchString={searchString}
          />
          {searchString !== '00083' &&
            <TreesList
              treesData={trees}
              fixHeader={fixHeader}
              searchString={searchString}
              handleClickSearch={handleClickSearch}
              speciesListClick={speciesListClick}
              getAddress={getAddress}
              searchType={searchType}
            />}
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
