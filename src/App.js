import React from "react";
import "./styles/index.scss";
import { connect } from "react-redux";
import Header from "./components/Header";
import Main from "./components/Main";
import { startFetchData } from "./store/actions/meals";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(startFetchData())
});

export default connect(null, mapDispatchToProps)(App);
