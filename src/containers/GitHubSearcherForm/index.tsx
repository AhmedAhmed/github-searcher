import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';
import { useHistory } from 'react-router';

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

const blockName = 'githubSearcherForm';

class GitHubSearcherForm extends Component <any, State> {

  state = {
    query: "",
    entityType: {
      name: "Users",
      value: "users"
    }
  }

  componentDidMount(){
    const {entity, query} = this.props;
    const obj:any = entity === 'users' || entity === undefined? {
      name: "Users",
      value: "users"
    } : {
      name: "Repositories",
      value: "repos"
    };
    this.setState({
      entityType: obj,
      query: query
    }, () => {
      if( this.canSearch() ){
        this.props.onStickUpdate(true);
        this.performSearch();
      }
    });

    window.onpopstate = (event:any) => {
      const {params} = this.props.match;
      if(params.query) {
        this.setState({
          query: params.query
        });
      }
      this.performSearch();
    };
  }

  fetchRepos = () => this.props.actions.fetchRepos(this.state.query);
  fetchUsers = () => this.props.actions.fetchUsers(this.state.query);

  setEntity = (item:DropDownItem) => debounce( () => 
    {
      this.setState({entityType: item}, () => {
        const {query, entityType} = this.state;
        window.history.pushState({urlPath:`/${entityType.value}/${query}`},"",`/${entityType.value}/${query}`)
      });
    },
    150
  );

  canSearch = () => this.state.query?.trim().length >= 3;

  performSearch = (item:DropDownItem = this.state.entityType) => {
    item.value === 'users' ? this.fetchUsers() : this.fetchRepos();
    this.setEntity(item)();
  };

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
        this.props.onStickUpdate(false)
        const clearData = debounce(() => {
          this.props.actions.clearSearch();
        }, 150);
        clearData();
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
            selected={this.state.entityType}
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