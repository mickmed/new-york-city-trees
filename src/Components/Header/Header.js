import React, { Component } from "react"
import SearchBar from "../SearchBar/SearchBar.js"
import "./Header.scss"
class header extends Component {
  // imgEl = React.createRef()
  state = {
    fixHeader: false,
    imgFade: false,
    scroll: false,
  }

  scrollToView = async () => {
    let headerHeight = this.refs.header.clientHeight
    let bannerHeight = this.refs.banner.clientHeight
    
    let time = 200
    let fadeOut = await setInterval(() => {
      time -= 20
      this.refs.img.style.opacity = time / 200
      if (time === 0) {
        clearInterval(fadeOut)
       
        window.scrollTo(0, bannerHeight)
      }
    }, 20)
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState, this.props)
    if (prevProps.scrollHeader !== this.props.scrollHeader) {
      this.scrollToView()
    }
  }
  refreshd = () => {
    console.log('hereee')
  }
  render() {
    const { searchString, searchType, getAddress, handleScroll, refresh } = this.props
    let style = this.state.imgFade ? { display: "none" } : { display: "block" }
  
    console.log(typeof this.state.headerHeight)
    return (
      <>
        <header
          style={{ background: "orange", height: this.state.headerHeight }}
          className="header"
          ref="header"
        >
          <div className="banner" ref="banner">
            <div onClick={refresh}>NEW YORK CITY TREES</div>
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
              // getAddress={this.props.getAddress}
            />
          </div>
          <div className="nyc-logo" ref="img">
            <img src="images/nyc.png" alt="nyc trees" style={style} />
          </div>
        </header>
      </>
    )
  }
}
export default header
