import React from 'react'
import { Route } from 'react-router'
import { Signup, Login } from '../../authentification'
import { isAuthenticated } from '../../authentification/roles'
import Interface from '../../interface/containers/Menu'
import Showcase from '../../showcase/components/Showcase'

class Layout extends React.Component {
  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Route path='/home' component={isAuthenticated(Interface)} />
        <Route exact path='/' component={Showcase} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </div>
    )
  }
}

export default Layout
