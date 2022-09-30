import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Examples</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(MainContainer);
