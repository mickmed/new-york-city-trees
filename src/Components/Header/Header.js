import React, { Component } from "react"
import SearchBar from "../SearchBar/SearchBar.js"
import "./Header.scss"

class header extends Component {
  constructor() {
    super()
    this.state = {
      // fixHeader: false,
      // imgFade: false,
      // scroll: false,
    }
    this.headerRef = React.createRef()
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
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
            handleScroll={this.props.handleScroll}
            getAddress={this.props.getAddress}
          />
        </header>
      </>
    )
  }
}
export default header
