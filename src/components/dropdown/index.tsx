import React, {PureComponent} from 'react';

import './dropdown.scss';

interface DropDownItem {
  name: String,
  value: String
}

interface State {
  selected?: DropDownItem,
  isVisible: Boolean
}

interface Props {
  items: Array<DropDownItem>,
  onChange: Function,
  selected: DropDownItem
}

const blockName = 'dropdown';

export default class Dropdown extends PureComponent <Props, State> {
  state:State = {
    isVisible: false
  }

  componentDidMount(){
    const {items} = this.props;
    this.setState({
      selected: items[0]
    });
  }

  toggleMenu = (evt:any) => {
    evt.preventDefault();
    this.setState(({isVisible}) => ({isVisible: !isVisible}))
  };

  selectItem = (item:DropDownItem) => (evt:any) => {
    evt.preventDefault();
    this.props.onChange( item );
    this.toggleMenu(evt);
  }

  renderMenu = () => {
    const {items} = this.props;
    return (
      <ul className={`${blockName}-menu`}>
        {items.map((item, index) => 
          <li key={index} className={`${blockName}-menuItem`}>
            <a href="/" onClick={this.selectItem(item)}>{item.name}</a>
          </li>)
        }
      </ul>
    );
  }

  render(){
    const {isVisible} = this.state;
    return (
      <div className={blockName}>
        <div className={`${blockName}-button`} onClick={this.toggleMenu}>
          <div className={`${blockName}-label`}>{this.props.selected.name}</div>
          <span className={`${blockName}-arrow`}></span>
        </div>
        {isVisible && this.renderMenu()}
      </div>
    );
  }
}