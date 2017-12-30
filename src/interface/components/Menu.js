import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationOpen from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import { Link } from 'react-router-dom'

import './Menu.css'

const styles = {
  titleStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkStyle: {
    textDecoration: 'none'
  }
}

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleCloseMenu = this.handleCloseMenu.bind(this)
  }

  handleOpenMenu () { this.setState({ menuOpen: true }) }
  handleCloseMenu () { this.setState({ menuOpen: false }) }

  render () {
    const title = <div style={{width: '100px'}}>Matcha</div>

    const profilScore = (
      <div className='Menu__ProfilScore'>
        <div className='Menu__ProfilScore__title'>Popularité</div>
        <div className='Menu__ProfilScore__score'>{this.props.profilScore}</div>
      </div>
    )

    const leftMenuIcon = (
      this.state.menuOpen
      ? <IconButton onClick={this.handleCloseMenu}><NavigationClose /></IconButton>
      : <IconButton onClick={this.handleOpenMenu}><NavigationOpen /></IconButton>
    )

    const CTAMenu = (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <Link
          to='/dashboard/profil'
          style={{
            borderRadius: '50%',
            border: '2px solid lightgrey',
            width: '50px',
            height: '50px'
          }}>
          <img style={{
            width: '99%',
            height: '99%',
            borderRadius: '50%'
          }} src={this.props.profilPicture} alt='' />
        </Link>
        <div>{profilScore}</div>
        <IconButton><LogoutIcon color='white' onClick={this.props.logout} /></IconButton>
      </div>
    )

    return (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.titleStyle}
          iconElementLeft={leftMenuIcon}
          children={CTAMenu}
          style={{backgroundColor: '#79A5C5'}}
        />
        <div>
          <Drawer
            docked={false}
            open={this.state.menuOpen}
            onRequestChange={(menuOpen) => this.setState({menuOpen})}
          >
            <div style={{height: '80px'}} />
            <Divider />
            <Link to='/dashboard' style={styles.linkStyle}>
              <MenuItem onClick={this.handleClose}>Menu</MenuItem>
            </Link>
            <Divider />
            <Link to='/dashboard/finder' style={styles.linkStyle}>
              <MenuItem onClick={this.handleClose}>Rechercher</MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={this.handleClose}>Mes matchs</MenuItem>
            <Divider />
            <MenuItem onClick={this.handleClose}>Discussions</MenuItem>
            <Divider />
            <Link to='/dashboard/profil' style={styles.linkStyle}>
              <MenuItem onClick={this.handleClose}>Mon profil</MenuItem>
            </Link>
            <Divider />
          </Drawer>
        </div>
      </div>
    )
  }
}

export default Menu
