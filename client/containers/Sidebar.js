import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Favorites from '../components/Favorites';

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <SearchBox />
        <Favorites />
      </div>
    );
  }
}

export default Sidebar;
