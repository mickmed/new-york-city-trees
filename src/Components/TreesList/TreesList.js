import React from "react"
import "./Treelist.scss"
import { countSpecies } from '../Helpers/Shared.js'
class TreesList extends React.Component {
  constructor() {
    super()
    this.state = {
      trees: [],
    }
  }
  componentDidMount() {
    // this.getLocation()
  }
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }
  capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  render() {
    const {
      searchString,
      treesData,
      speciesListClick,
    } = this.props
    const { capitalize } = this
    let sorted = this.props.speciesCount
    return (
      //  {showFilters && (
      <div className="tree-list">
        {console.log(treesData)}
        {treesData.length !== 0 ? (
          <div>
                {sorted.map((trees, index) => (
                  <div
                  key={index}
                    className="spc-count"
                    onClick={() => speciesListClick(trees[0], searchString)}
                  >{`${trees[0]} \u00A0 ${trees[1]}`}</div>
                ))}
          </div>  
        ) : (
          <div>
            <img src="./images/tree.gif" />
          </div>
        )}
      </div>
    )
  }
}
export default TreesList
