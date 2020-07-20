import React, { Component } from "react"
import SearchBar from "../SearchBar/SearchBar.js"
import "./Header.scss"
import { Link } from "react-router-dom"

class header extends Component {
  // imgEl = React.createRef()
  state = {
    fixHeader: false,
    imgFade: false,
    scroll: false,
  }
  componentDidMount() {
    // console.log(this.refs.header.clientHeight)
  }

  componentDidUpdate(prevProps, prevState) {
    //   // console.log(prevProps, prevState, this.props)
    if (prevProps.scrollHeader !== this.props.scrollHeader) {
      this.props.scrollToView(
        this.refs.header.clientHeight,
        this.refs.banner.clientHeight
      )
    }
  }

  render() {
    const { searchString, searchType, getAddress, handleScroll } = this.props
    let style = this.state.imgFade ? { display: "none" } : { display: "block" }

    // console.log(this.refs.header)
    return (
      <>
        <header
          // style={{ background: "orange", height: this.state.headerHeight }}
          className="header"
          ref="header"
        >
          <div className="banner" ref="banner">
            <Link
              to="/"
              onClick={() =>
                this.props.scrollToView(
                  this.refs.header.clientHeight,
                  this.refs.banner.clientHeight,
                  "header"
                )
              }
              className="header-link"
            >
              <h2>NEW YORK CITY TREES</h2>
            </Link>
            <SearchBar
              // style={style.searchInput}
              // onchange={this.props.onchange}
              // onsubmit={this.props.onsubmit}
              // fixHeader={this.state.fixHeader}
              // searchHeight={this.state.searchHeight}
              // // bigHeaderHeight={this.state.bigHeaderHeight}
              // bannerHeight={this.state.bannerHeight}
              // search={this.state.search}
              // searchString={this.props.searchString}
              handleScroll={this.props.handleScroll}
              // scrollState={this.props.scrollState}
              // trees={this.props.trees}
              // getData={this.props.getData}
              getAddress={this.props.getAddress}
            />
          </div>
          <div className="nyc-logo" ref="img">
            <img ref="img" src="images/nyc.png" alt="nyc trees" style={style} />
          </div>
        </header>
      </>
    )
  }
}
export default header
