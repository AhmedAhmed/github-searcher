import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';

import * as Actions from '../../store/actions';

import Header from '../../components/header';
import Dropdown from '../../components/dropdown';
import GitHubResults from '../../components/GitHubResults';

import './GitHubSearcherForm.scss';

interface DropDownItem {
  name: String,
  value: String
}

interface State {
  query: string,
  entityType: DropDownItem
}

interface Props {
  onStickUpdate: Function,
  actions: {
    fetchRepos: Function,
    fetchUsers: Function,
    clearSearch: Function
  },
  data: any
}

const blockName = 'githubSearcherForm';

class GitHubSearcherForm extends Component <Props, State> {

  state = {
    query: "",
    entityType: {
      name: "Users",
      value: "users"
    }
  }

  fetchRepos = debounce( 
    (item:DropDownItem) => 
    {
      this.props.actions.fetchRepos(this.state.query).then(() => {
        this.setState({entityType: item});
      });
    }, 
    150);

  fetchUsers = debounce(
    (item:DropDownItem) => {
      this.props.actions.fetchUsers(this.state.query).then(() => {
        this.setState({entityType: item});
      });
    },
    150
  );

  canSearch = () => this.state.query.trim().length >= 3;

  performSearch = debounce((item:DropDownItem = this.state.entityType) => {
    item.value === 'users' ? this.fetchUsers(item) : this.fetchRepos(item);
  }, 150);

  onChangeSelection = (item:DropDownItem) => {
    if( this.canSearch() ){
      this.performSearch(item);
    }
  }

  onChangeInput = (evt:any) => {
    this.setState({query: evt.target.value}, () => {
      if(this.canSearch()){
        this.props.onStickUpdate(true);
        this.performSearch();
      } else {
        this.props.actions.clearSearch();
        this.props.onStickUpdate(false);
      }
    });
  }

  render(){
    const {query, entityType} = this.state;
    const items = [{
      name: "Users",
      value: "users"
    },{
      name: "Repositories",
      value: "repos"
    }];

    return (
      <div className={blockName}>
        <Header />
        <form className={`${blockName}-form`}>
          <input 
            type="text" 
            className={`${blockName}-input`} 
            onChange={this.onChangeInput}
            value={query}
            placeholder="Start typing to search..." 
          />
          <Dropdown 
            items={items} 
            onChange={this.onChangeSelection} 
          />
        </form>
        <GitHubResults items={this.props.data} type={entityType.value}/>
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