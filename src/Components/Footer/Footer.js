import React from "react"

import "../Header/Header.scss"
import "./footer.scss"

// import axios from "axios";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Website by{" "}
        <a target="_blank" href="https://mick-roth.surge.sh">
          Mick Roth&copy;
        </a>
      </div>
      <div>
        Github{" "}
        <a target="_blank" href="https://github.com/mickmed">
          Github.com/mickmed
        </a>
      </div>
    </footer>
  )
}

export default Footer
