import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as Actions from '../../store/actions';

import GitHubSearcherForm from '../GitHubSearcherForm';

import './app.scss';

interface State {
  stuck: Boolean
}

const blockName = 'githubSearcher';

class App extends Component <any, State> {

  state = {
    stuck: false
  }

  onStickUpdate = ( state:Boolean ) => {
    this.setState({stuck: state});
  }

  render(){
    const {stuck} = this.state;
    return (
      <div className={stuck?`${blockName} ${blockName}-stuck`:blockName}>
        <GitHubSearcherForm onStickUpdate={this.onStickUpdate}/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);