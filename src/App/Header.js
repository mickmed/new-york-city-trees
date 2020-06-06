import React, { Component } from "react"

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

  componentDidMount() {
    // window.removeEventListener("scroll", this.handleScroll)
  }



  scrollToView = () => {
    // console.log('here')
    let headerHeight = this.refs.header.clientHeight
    // let imageHeight = this.refs.img.clientHeight
    let bannerHeight = this.refs.banner.clientHeight
    // window.scrollTo(400, (headerHeight + 1000))
    // console.log(bannerHeight)


   

    let time = 2000
    let fadeOut = setInterval(() => {
      time -= 200
      this.refs.img.style.opacity = time / 2000
     

      if (time === 0) {
        clearInterval(fadeOut)
        this.refs.img.style.display = 'none'
        this.refs.header.style.height= (bannerHeight + 20) + 'px'



      }


    }, 200)


  }


  render() {
    const { searchString, searchType, getAddress } = this.props
    let style = this.state.imgFade ?
      { display: 'none' } : { display: 'block' }
    // console.log(this.refs.img && this.refs.img)
    this.props.scrollState && this.scrollToView()
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
              scrollHeader={this.props.scrollHeader}
              scrollState={this.props.scrollState}
              trees={this.props.trees}
              getData={this.props.getData}
              getAddress={this.props.getAddress}
            />


          </div>
          <div className='nyc-logo' ref="img">
            <img
              
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
