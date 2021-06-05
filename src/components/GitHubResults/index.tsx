import React, {Component} from 'react';
import { isEmpty, get, isArray } from 'lodash';

import './style.scss';


const blockName = 'githubResults';

export default class GithubResults extends Component <any, any> {

  renderHeader = () => {
    const items = get(this.props.data, 'items', []);
    return items[0].owner && (
      <div className={`${blockName}__header`}>
        <div className={`pic`}>
          <img alt='pic' src={items[0].owner.avatar_url} height="50px" width="50px" />
        </div>
        <div className={`info`}>
          <h3>{items[0].owner.login}</h3>
        </div>
      </div>
    );
  }

  renderFiles = (files:any):any => {
    const names = Object.keys(files);
    const item = files[names[0]];
    return (
      <>
        <div className='name'>
          {item.filename}
        </div>
        {item.language && <div className='type'>
          {item.language}
        </div>}
      </>
    );
  };

  renderGists = () => {
    const items = get(this.props.data, 'items', []);
    return items.map((item:any, index:number) => (
      <div key={index} className={`${blockName}__list-item`}>
        {this.renderFiles(item.files)}
      </div>
    ));
  }

  render(){
    const items = get(this.props.data, 'items', []);

    return isArray(items) && (
      <div className={blockName}>
        {isEmpty(items) && (
          <div className={`${blockName}__empty`}>No Gists Found</div>
        )}
        {!isEmpty(items) && (
          <>
            {this.renderHeader()}
            <div className={`${blockName}__list`}>
              {this.renderGists()}
            </div>
          </>
        )}
      </div>
    );
  }
}