import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import "./SearchBar.scss"
import { getAddress } from "../Api/Api.js"
import axios from "axios"

// function renderSectionTitle(section) {
//   let title
//   if (section.title === "nta_name") {
//     title = "neighborhood"
//   } else if (section.title === "spc_common") {
//     title = "common name"
//   } else {
//     title = section.title
//   }
//   return <strong>{title}</strong>
// }

// function getSectionSuggestions(section) {
//   return section[Object.keys(section)[1]]
// }
///////////////////////////////////////////////////

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      suggestions: [],
      trees: [],
      isMobile: false,
    }
  }

  fetchRequested = async (value) => {

    let srch = value
    let trees = srch && srch.length > 2 && (await axios.get(getAddress(srch)))
    let suggestions = [
      { title: "address", suggestions: [] },
      { title: "zipcode", suggestions: [] },
      { title: "nta_name", suggestions: [] },
    ]
    trees.data.forEach((tree) => {
      suggestions.forEach((type, i) => {
        if (tree[type.title].toLowerCase().includes(value.toLowerCase())) {
        
          if (suggestions[i].suggestions.length < 6) {
            if (
              !suggestions[i].suggestions.filter(
                (e) => e.text === tree[type.title]
              ).length > 0
            ) {
              suggestions[i].suggestions.push({ text: tree[type.title] })
            }
          }
        }
      })
    })
    suggestions.forEach(e=>{
      e.title = e.title === 'nta_name' ? 'neighborhood' : e.title
    })
    return suggestions
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    
    if (!value) {
      this.setState({
        suggestions: [],
      })
      return
    }
    try {
      if (value.length > 2) {
        let requestTimer 
        clearTimeout(requestTimer)
        requestTimer = setTimeout(async () => {
          let resp = await this.fetchRequested(value)

          this.setState({
            suggestions: resp,
          })
        }, 300)
      }else{
      
        this.setState({
          suggestions:[ { title: "loading...", suggestions: [{text:''}] }],
        })
        
      }
    } catch (e) {
      this.setState({
        suggestions: [],
      })
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.setState({
      value: ''
    });
    console.log("event", event)
    console.log("method", method)
    console.log("suggestion", suggestion)
    console.log("suggestionValue", suggestionValue)

    console.log("suggestionIndex", suggestionIndex)
    console.log("sectionIndex", sectionIndex)
    console.log(this.state.suggestions[sectionIndex])

    this.props.getAddress(
      suggestionValue,
      this.state.suggestions[sectionIndex].title
    )
    // return suggestion.text
  }

  onKeyPress = async (event, str) => {
    event.preventDefault()
event.target.value.length > 3 &&
    setTimeout(async () => {
      // this.setState({

      //   suggestions: [],
      // })
      await this.props.getAddress(str, "keyPress")
      // this.setState({

      //   suggestions: [],
      // })
    }, 500)
  }

  render() {
    const { value, suggestions } = this.state
    // console.log(suggestions)
    return (
      <form onSubmit={this.props.onsubmit}>
        {/* <span>{`\u{1F50E}`}</span> */}
        <Autosuggest
          inputProps={{
            placeholder: `\u{1F50E}`,

            value: value,
            type: "text",
            name: "input",
          
            
            onChange: (event, { newValue, method }) => {
              this.setState({
                value: newValue,
              })
            },
            onClick: (event) => {
              // console.log(event.keyCode)
              // event.preventDefault()
              console.log(value)
                 
                  this.onKeyPress(event, event.target.value)

               
            },
            onKeyDown: (event) => {
              // console.log(event.keyCode)
              // event.preventDefault()
              if(event.keyCode === 13){
                 
                  this.onKeyPress(event, event.target.value)

                } 
            },
          }}
          multiSection={true}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={(suggestion) => {
            // console.log(suggestion)
            return suggestion.text
          }}
          renderSuggestion={(suggestion) => {
            

            return <span>{suggestion.text}</span>
          }}
          renderSectionTitle={(section) => {
            return section.title
          }}
          getSectionSuggestions={(section) => {
            return section.suggestions
          }}
          focusInputOnSuggestionClick={this.state.isMobile}
          style={{ transform: "translate(50px)", background: "green" }}
        />
      </form>
    )
  }
}

export default SearchBar
