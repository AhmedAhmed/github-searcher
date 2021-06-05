import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as Actions from '../../store/actions';

import GitHubSearcherForm from '../GitHubSearcherForm';

import './app.scss';
import GithubResults from '../../components/GitHubResults';

interface State {
  stuck: Boolean
}

const blockName = 'githubSearcher';

class App extends Component <any, State> {

  render(){
    const {params} = this.props.match;
    return (
      <div className={blockName}>
        <GitHubSearcherForm 
          {...this.props}
          query={params.query}
        />
        <GithubResults {...this.props} />
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