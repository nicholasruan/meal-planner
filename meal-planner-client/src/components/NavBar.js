import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Menu, Icon,} from 'antd'

class NavBar extends React.Component {
  state = {
    current: 'planner'
  }

  handleClick = (event) => {
    localStorage.current = event.key
    this.setState({
      current: event.key
    });
  };

  componentDidMount() {
    this.setState({
      current: localStorage.current
    })
  }

  render() {
    return (
        <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="light"
          >
          <Menu.Item disabled="true" className="menu-title">Meal Mate</Menu.Item>
          <Menu.Item className="logout" key="setting:2" onClick={this.props.logout} style={{float: 'right'}}>
            <Icon type="logout" />
            Logout
          </Menu.Item>
          <Menu.Item key="setting:1" style={{float: 'right'}}>
            <Link to="/home/profile">
              <Icon type="user" />
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="planner" style={{float: 'left'}}>
            <Link to="/home">
              <Icon type="calendar" />
              Planner
            </Link>
          </Menu.Item>
          <Menu.Item key="meals" style={{float: 'left'}}>
            <Link to="/home/meals">
              <Icon type="coffee" />
              Meals
            </Link>
          </Menu.Item>
          <Menu.Item key="recipe" style={{float: 'left'}}>
            <Link to="/home/addrecipe">
              <Icon type="plus" />
              Add Recipe
            </Link>
          </Menu.Item>

        </Menu>
      </div>
    )
  }
}

export default NavBar
