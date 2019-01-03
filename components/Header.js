import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react'
import {Link} from '../routes';

class Header extends Component {
  state = {}

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Menu style={{marginTop:'30px'}}>
        <Link route='/'>
          <a className='item'>
            Crowdfunding
          </a>
        </Link>
        <Menu.Menu position='right'>
          <Link route='/'>
            <a className='item'>
              Campaing
            </a>
          </Link>
          <Link route='/campaing/new'>
            <a className='item'>
              +
            </a>
          </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header;