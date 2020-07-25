import React from "react"

import "../Header/Header.scss"
import "./footer.scss"
import { Link } from "react-router-dom"

// import axios from "axios";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Website by <Link to='https://mick-roth.surge.sh'>Mick Roth &copy; </Link>2019
        Gihub<Link to='https://mick-roth.surge.sh'>Mick Roth &copy; </Link>2019

      </p>
    </footer>
  )
}

export default Footer
