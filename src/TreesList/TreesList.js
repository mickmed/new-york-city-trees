import React from "react"
import "../Style/Treelist.scss"

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

  showPosition = (position) => {
    console.log(
      position.coords.latitude.toString() + position.coords.longitude.toString()
    )
  }

  hoods = (neighbs) => {
    let result = {}
    for (let i = 0; i < neighbs.length; ++i) {
      if (!result[neighbs[i]]) result[neighbs[i]] = 0
      ++result[neighbs[i]]
    }
    return result
  }

  capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    const {
      searchString,
      searchType,
      treesData,
      speciesListClick,
      getAddress,
      showFilters,
    } = this.props
    const { capitalize, handleClick } = this
    console.log(searchType)
    //sort by count
    const spcCount = treesData.reduce(
      (ac, { spc_common: a }) => ((ac[a] = ac[a] + 1 || 1), ac),
      {}
    )
    let sorted = []
    for (let spc in spcCount) {
      sorted.push([capitalize(spc), spcCount[spc]])
    }
    sorted.sort(function(a, b) {
      return a[1] - b[1]
    })
    sorted.reverse()
    console.log(showFilters)

    return (
      //  {showFilters && (
      <div className="tree-list">
        {treesData.length !== 0 ? (
          <div>
           
           
         
           
           
                {sorted.map((trees) => (
                  <div
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
