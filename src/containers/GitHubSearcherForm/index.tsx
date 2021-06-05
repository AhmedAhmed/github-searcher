import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as Actions from '../../store/actions';

import Header from '../../components/header';
import InputText from '../../components/inputtext';
import GitHubResults from '../../components/GitHubResults';

import './style.scss';

interface State {
  query: string
}

const blockName = 'githubSearcherForm';

class GitHubSearcherForm extends Component <any, State> {

  state = {
    query: '',
  }

  componentDidMount(){
    const {query} = this.props;
    this.setState({query: query});

    window.onpopstate = () => {
      const {params} = this.props.match;
      if(params.query) {
        this.setState({
          query: params.query
        });
      }
      this.fetchGists();
    };
  }

  componentWillUnmount() {
    window.onpopstate = () => {}
  }

  fetchGists = () => this.props.actions.fetchGists(this.state.query);

  onChangeInput = (evt:any) => {
    this.setState({query: evt.target.value});
  }

  onSubmit = (evt:any) => {
    evt.preventDefault();
    this.fetchGists();
  }

  render(){
    return (
      <div className={blockName}>
        <Header />
        <form onSubmit={this.onSubmit} className={`${blockName}-form`}>
          <InputText
            className={`${blockName}-input`}
            onChange={this.onChangeInput}
            placeholder="Enter Username"
          />
          <button className={`${blockName}__button`}>Search</button>
        </form>
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
)(GitHubSearcherForm);