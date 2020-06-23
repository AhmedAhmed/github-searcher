import React, {Component} from 'react';
import isArray from 'lodash/isArray';

import './githubresults.scss';

const blockName = 'githubResults';

export default class GithubResults extends Component <any, any> {

  renderRepoItem = () => {
    const {items} = this.props;

    return items.length > 0 && items.map((item:any) => (
      <a href={item.html_url} className={`${blockName}-item`}>
        <div className={`${blockName}-item--image`}>
          <img 
            src={item.owner.avatar_url} 
            width="100px" 
            height="100px" 
            alt={item.owner.avatar_url}/>
        </div>
        <div className={`${blockName}-item--details`}>
          <div className={`${blockName}-item--name`}>{item.full_name}</div>
          <div className={`${blockName}-item--description`}>
            {item.description}
          </div>
        </div>
      </a>
    ));
  }

  renderUserItem = () => {
    const {items} = this.props;

    return items.length > 0 && items.map((item:any) => (
      <a href={item.html_url} className={`${blockName}-item`}>
        <div className={`${blockName}-item--image`}>
          <img 
            src={item.avatar_url} 
            width="100px" 
            height="100px" 
            alt={item.avatar_url}/>
        </div>
        <div className={`${blockName}-item--details`}>
          <div className={`${blockName}-item--name`}>{item.login}</div>
        </div>
      </a>
    ));
  }

  renderItem = () => {
    return this.props.type === 'users' ? this.renderUserItem() : this.renderRepoItem();
  }

  render(){
    const {items} = this.props;
    return (
      <div className={blockName}>
        {(!isArray(items) && items.fetching) && (
          <div className={`${blockName}-loader`}>
              <h2>Loading...</h2>
          </div>
        )}
        {this.renderItem()}
      </div>
    );
  }
}