import React from 'react'
import Menu from '../containers/Menu'
import { Switch, Route, Redirect } from 'react-router'
import { connectSocket } from '../../notifications/socketsActions'

import Home from '../../home/containers/Home'
import Profil from '../../profil/components/Profil'
import Finder from '../../finder/containers/Finder'
import History from '../../history/containers/History'
import Chat from '../../chat/containers/Chat'
import Loading from '../../styled-components/Loading'

import './Interface.css'

class Interface extends React.Component {
  componentDidMount () {
    this.props.fetchProfil()
    this.props.getLikes()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profil.profilId && nextProps.profil.profilId) connectSocket(nextProps.profil.profilId)
  }

  render () {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Menu />
        {
          this.props.isFetching && !this.props.profil.profilId
          ? <Loading />
          : <div className='Home__contentContainer'>
            <Route path='/dashboard/home' component={Home} />
            <Route path='/dashboard/profil' component={Profil} />
            <Route path='/dashboard/finder' component={Finder} />
            <Route path='/dashboard/history' component={History} />
            <Route path='/dashboard/chat' component={Chat} />
            <Switch>
              <Redirect exact from='/dashboard' to='/dashboard/home' />
            </Switch>
          </div>
        }
      </div>
    )
  }
}

export default Interface
