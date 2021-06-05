import React, {PureComponent} from 'react';
import Logo from '../../icon/logo';
import './header.scss';

interface State {
  name: String
}

interface Props {

}

const blockName = 'githubSearcherHeader';

export default class Header extends PureComponent <Props, State> {
  render(){
    return (
      <div className={`${blockName}`}>
        <div className={`${blockName}-logo`}>
          <Logo />
        </div>
        <div className={`${blockName}-details`}>
          <div className={`${blockName}-details--title`}>Github Gist Search</div>
          <div className={`${blockName}-details--placeholder`}>
            Search users gists
          </div>
        </div>
      </div>
    );
  }
}