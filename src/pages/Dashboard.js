import React from 'react'
import { IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router'
import UserList from './UserList'
import UserDetail from './UserDetail'

const Dashboard = ({match}) => {
    
    return (
        <IonRouterOutlet>
            <Route exact path={match.url} component={UserList} />
            <Route path={`${match.url}/users/:id`} component={UserDetail} />

        </IonRouterOutlet>
    )
}

export default Dashboard
