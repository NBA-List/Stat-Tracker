import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import FavoriteSidebar from "../components/FavoriteSidebar";

class Sidebar extends Component {
  render() {
    return (
      <>
      <SearchBox />
      <FavoriteSidebar />
      </>
    )
  }
}

export default Sidebar;
