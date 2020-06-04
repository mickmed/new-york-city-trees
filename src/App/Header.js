import React, { Component } from "react"
import ReactDOM from "react-dom"

import "../Style/Header.scss"
import SearchBar from "./SearchBar"

// import axios from "axios";

class header extends Component {
  // imgEl = React.createRef()
  state = {
    fixHeader: false,
    imgFade: false
  }
  // componentDidMount() {
  //   // window.addEventListener("scroll", this.handleScroll)

  //   this.setState({
  //     // searchHeight: this.refs.header.clientHeight,
  //     // bannerHeight: this.refs.banner.clientHeight,
  //   })
  // }

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.handleScroll)
  }



  scrollToView = () => {
    // let headerHeight = this.refs.header.clientHeight
    let imageHeight = this.refs.img.clientHeight
    let bannerHeight = this.refs.banner.clientHeight
    // window.scrollTo(0, (bannerHeight + 100))


    let time = 2000
    let fadeOut = setInterval(() => {
      time -= 200
      this.refs.img.style.opacity = time / 2000
      // console.log(time)

      if (time === 0) {
        clearInterval(fadeOut)
        // window.scrollTo(0, (bannerHeight + 100))
        this.refs.img.style.display = 'none'


      }


    }, 200)


  }


  render() {
    let style = this.state.imgFade ?
      { display: 'none' } : { display: 'block' }

    return (
      <>
        <header
          className="header"
          ref="header"

        >
          <div className="banner" ref="banner">
            <h2>NEW YORK CITY TREES</h2>
            <SearchBar
              // style={style.searchInput}
              // onchange={this.props.onchange}
              onsubmit={this.props.onsubmit}
              fixHeader={this.state.fixHeader}
              searchHeight={this.state.searchHeight}
              // bigHeaderHeight={this.state.bigHeaderHeight}
              bannerHeight={this.state.bannerHeight}
              search={this.state.search}
              searchString={this.props.searchString}
              scrollToView={this.scrollToView}
              trees={this.props.trees}
              getData={this.props.getData}
              getAddress={this.props.getAddress}
            />


          </div>
          <div className='nyc-logo'>
            <img
              ref="img"
              src="images/nyc.png"
              alt="nyc trees"
              style={style}
            />
          </div>
        </header>

      </>
    )
  }
}

export default header
