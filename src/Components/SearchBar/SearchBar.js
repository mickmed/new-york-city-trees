import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import "./SearchBar.scss"
import { getAddress } from "../Api/Api.js"
import axios from "axios"
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
    suggestions.forEach((e) => {
      e.title = e.title === "nta_name" ? "neighborhood" : e.title
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
      } else {
        this.setState({
          suggestions: [{ title: "loading...", suggestions: [{ text: "" }] }],
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
      value: "",
    })
    this.props.getAddress(
      suggestionValue,
      this.state.suggestions[sectionIndex].title
    )
  }
  onKeyPress = async (event, str) => {
    event.preventDefault()
    event.target.value.length > 2 &&
      setTimeout(async () => {
        await this.props.getAddress(str, "keyPress")
      }, 500)
  }
  onSubmit = (event) => {
    event.preventDefault()
    const str = event.target.firstChild.firstChild.value
    if (str.length > 2) {
      const go = async () => {
        await this.props.getAddress(str, "keyPress")
      }
      go()
    }
  }
  render() {
    const { value, suggestions } = this.state
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <Autosuggest
          inputProps={{
            placeholder: "search",
            value: value,
            type: "text",
            name: "input",
            onChange: (event, { newValue, method }) => {
              this.setState({
                value: newValue,
              })
            },
            onClick: (event) => {
              this.props.handleScroll()
            },
            onKeyDown: (event) => {
              if (event.keyCode === 13) {
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
        <button>
          <span>{`\u{1F50E}`}</span>
        </button>
      </form>
    )
  }
}
export default SearchBar
