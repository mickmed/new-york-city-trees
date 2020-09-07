import React, { Component } from "react"
import SearchBar from "../SearchBar/SearchBar.js"
import "./Header.scss"
import { Link } from "react-router-dom"

class header extends Component {
  constructor() {
    super()
    this.state = {
      fixHeader: false,
      imgFade: false,
      scroll: false,
    }
    this.headerRef = React.createRef()
  }

  componentDidMount() {
    // console.log(this.refs.header.clientHeight)
  }

  componentDidUpdate(prevProps, prevState) {
    //   // console.log(prevProps, prevState, this.props)
    if (prevProps.scrollHeader !== this.props.scrollHeader) {
      this.props.scrollToView(getComputedStyle(this.headerRef.current).height)
    }
  }

  render() {
    return (
      <>
        <header className="header" ref={this.headerRef}>
          <h2
            onClick={() =>
              this.props.scrollToView(
                getComputedStyle(this.headerRef.current),
                "header"
              )
            }
          >
            {`\u{1F333}`}NEW YORK CITY TREES
          </h2>

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
        </header>
      </>
    )
  }
}
export default header
