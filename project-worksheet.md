# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description, Wireframes / Priority Matrix | Complete
|Day 2|  Functional Components, Core Application Structure (HTML, CSS, etc.), Initial Clickable Model| Complete
|Day 3| MVP, Present | Complete



## Project Description

A map that shows the trees of New York City using NYC Opendata API. Filters include zipcode, species, and status of the tree(s).

## Wireframes

https://drive.google.com/drive/u/0/folders/1Z1ZevfqgnntRZHu8aewaD4etL7KFsFVs

## Priority Matrix

https://drive.google.com/drive/u/0/folders/1Z1ZevfqgnntRZHu8aewaD4etL7KFsFVs 

### MVP/PostMVP - 5min


#### MVP 
	Find API
	Fetch Data
	Display Map
	Display Markers
	Display Popups
	Style Components


#### PostMVP 
	Add UI features, select menus, filters etc...

## React Architectural Design

https://drive.google.com/drive/u/0/folders/1Z1ZevfqgnntRZHu8aewaD4etL7KFsFVs



## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

#### SAMPLE.....
| Component | Description | 
| --- | :---: |  
| App | This will fetch the data | 
| CityList | This will map the city demographics | 
| City | This will display city info |
| Map Container | This will render the map |
| Map Markers | This will render map markers |
| Popup Info | Display info for popups |



| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| App (and fetch) | H | 1hr| 1hr |
| Get tree demographics | H | 2hrs| 1.5hrs |
| Display Tree Info | H | 2hrs| 1hr  |
| Display Map | H | 2hrs| 3hrs|
| Map Markers | H | 2hrs| 5hrs |
| Map Markers with Filters | H | 4hrs| 8.5hrs |
| Popup Info | H | 2hrs | xx |
| Style | H | 5rs | 4hrs |
| Media Queries | H | 3hrs | xx |
| Total | H | 18hrs | 28hrs  |



## Helper Functions

| Function | Description | 
| --- | :---: |  
| ColorSelector | This will choose marker according to population size | 


## Additional Libraries

| Library | What it Does | 
| --- | :---: |  
| Bulma | Used to help style my application | 
| Google Fonts | Header Style | 


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

//this updates the initial state of viewport (latitude and longitude) so that when the page loads the map centers on the first tree in the array.
```
  componentWillReceiveProps = props => {
    props.treesData[0] &&
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          longitude: parseFloat(props.treesData[0].longitude),
          latitude: parseFloat(props.treesData[0].latitude),
          zoom: this.props.boro===''?11:14
        }
      }));
    
  };
```

## Change Log
 Map zoom size changes depending on whether a boro is selected or not. 
 Markers render different emojis according to tree status.
 Restructured layout.
 Made cite responsive with media queries.




## Issues and Resolutions
 Difficulty using conditional rendering with emojis. Solution from trial and error. Final solution using && conditionals.

 ```
 <div>
          {tree.status === "Alive" && (
            <p className="mrkr-alive">{`\u{1F333}`}</p>
          )}

          {tree.status === "Stump" && (
            <p className="tree-pin" title={`\u{1F96B}`}>{`\u{1F96B}`}</p>
          )}

          {tree.status === "Dead" && (
            <p className="tree-pin" title={`\u{1F334}`}>{`\u{1F334}`}</p>
          )}
        </div>

 ```

