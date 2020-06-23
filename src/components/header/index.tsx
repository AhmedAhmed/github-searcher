import React, {Component} from 'react';
import Logo from '../../icon/logo';
import './header.scss';

interface State {
  name: String
}

interface Props {

}

const blockName = 'githubSearcherHeader';

export default class Header extends Component <Props, State> {
  render(){
    return (
      <div className={`${blockName}`}>
        <div className={`${blockName}-logo`}>
          <Logo />
        </div>
        <div className={`${blockName}-details`}>
          <div className={`${blockName}-details--title`}>Github Searcher</div>
          <div className={`${blockName}-details--placeholder`}>
            Search users or repositories below
          </div>
        </div>
      </div>
    );
  }
}