import React, {Component} from 'react';

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

export default class Dropdown extends Component <Props, State> {
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
    this.setState({
      selected: item
    }, () => {
      this.props.onChange( this.state.selected );
    });
    this.toggleMenu(evt);
  }

  renderMenu = () => {
    const {items} = this.props;
    return (
      <ul className={`${blockName}-menu`}>
        {items.map(item => 
          <li className={`${blockName}-menuItem`}>
            <a href="/" onClick={this.selectItem(item)}>{item.name}</a>
          </li>)
        }
      </ul>
    );
  }

  render(){
    const {isVisible, selected} = this.state;
    return (
      <div className={blockName}>
        <div className={`${blockName}-button`} onClick={this.toggleMenu}>
          <div className={`${blockName}-label`}>{this.props.selected?this.props.selected.name : this.state.selected?.name}</div>
          <span className={`${blockName}-arrow`}></span>
        </div>
        {isVisible && this.renderMenu()}
      </div>
    );
  }
}