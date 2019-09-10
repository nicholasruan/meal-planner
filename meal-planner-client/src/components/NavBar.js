import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu;

class NavBar extends React.Component {
  state = {
    current: 'planner'
  }

  handleClick = (event) => {
    this.setState({
      current: event.key
    });
  };

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="light" >
          <Menu.Item key="planner">
            <Link to="/home">
              <Icon type="calendar" />
              Planner
            </Link>
          </Menu.Item>
          <Menu.Item key="meals">
            <Link to="/home/meals">
              <Icon type="coffee" />
              Meals
            </Link>
          </Menu.Item>
          <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Settings
            </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">
              <Link to="/home/profile/edit">
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={null}>
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default NavBar
