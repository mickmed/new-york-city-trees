import React from "react"

import "../Header/Header.scss"
import "./footer.scss"



const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Website by{" "}
        <a target="_blank" href="https://mick-roth.surge.sh" rel="noopener noreferrer">
          Mick Roth&copy;
        </a>
      </div>
      <div>
        Github{" "}
        <a target="_blank" href="https://github.com/mickmed" rel="noopener noreferrer">
          Github.com/mickmed
        </a>
      </div>
    </footer>
  )
}

export default Footer
