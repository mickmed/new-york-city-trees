import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import "../Style/SearchBar.scss"
import { getAddress } from "./Api"
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

  componentDidMount() {
    this.isMobile() &&
      this.setState({
        isMobile: true,
      })
  }
  isMobile() {
    return window.orientation > -1
  }

  fetchRequested = async (value) => {
    console.log("value", value)

    let srch = value
    let trees =
      srch &&
      srch.length > 2 &&
      // srch.length % 2 !== 0 &&
      (await axios.get(getAddress(srch)))
    // console.log(trees)
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
        // console.log(value.toLowerCase())
      })
    })
    // console.log(suggestions)

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
      console.log(value.length)
      if(value.length > 2){
      clearTimeout(ttr)
      let ttr = setTimeout(async() => {
        this.setState({
        suggestions: await this.fetchRequested(value),
      })
      }, 300)
    }
    } catch (e) {
      this.setState({
        suggestions: [],
      })
    }
  }

  onSuggestionsClearRequested = () => {
    console.log('press')
    console.log('hi thee')
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
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

  onKeyPress = async(str) => {
    await this.props.getAddress(str, 'keyPress')
    this.onSuggestionsClearRequested()

    // setTimeout(()=>{
    //   this.onSuggestionsClearRequested()

    // },300)
  }

  render() {
    const { value, suggestions } = this.state

    return (
      <form onSubmit={this.props.onsubmit}>
        <Autosuggest
          inputProps={{
            placeholder: "address...",

            value: value,
            type: "text",
            name: "input",
            style: {
              background: "lightyellow",
            },
            onClick: () => this.props.scrollHeader(),
            onChange: (event, { newValue, method }) => {
              this.setState({
                value: newValue,
              })
            },
            onKeyDown: (event) => {
              // console.log(event.keyCode)
              event.target.value.length > 3 &&
                event.keyCode === 13 &&
                this.onKeyPress(event.target.value)
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
            // console.log(suggestion)
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
