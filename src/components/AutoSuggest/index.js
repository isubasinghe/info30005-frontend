import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import Fuse from 'fuse.js';

import './suggest.scss';

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name",
  ]
};

const renderSuggestion = suggestion => (
  <div>
    
  </div>
);

const getSuggestionValue = suggestion => suggestion.name;

class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      keyDown: false,
      timer: 0,
      shouldPrint: false,
    }
    
  }

  componentDidMount() {
    console.log(this.props);
  }
  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log(value);
    console.log(this.props.inventory);
    let fuse = new Fuse(this.props.inventory, options);
    const results = fuse.search(value);
    if(results.length < 1) {
      return;
    }
    for(let i = 0; i < this.props.inventory.length; i++) {
      if(this.props.inventory[i]._id == results[0]._id) {
        this.props.slider.slickGoTo(i);
        break;
      }
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    
  };

  print = () => {
    if(this.state.shouldPrint) {
      console.log(this.props.inventory);
    }
    console.log(this.props.inventory);
  }



  render() {
    this.print();
    const { value, suggestions} = this.state;
    const inputProps = {
      placeholder: 'Search an item',
      value,
      onChange: this.onChange
    };

    return (
      <div className="auto-suggest">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default AutoSuggest;