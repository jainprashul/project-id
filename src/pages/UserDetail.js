import React, { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonCard, IonIcon, } from '@ionic/react'

const UserDetail = (props) => {
    // console.log(props);
    const [User] = useState(JSON.parse(localStorage.getItem('data')))
    console.log(User);

    let imgUrl = `data:${User._attachments.filename.content_type};base64,${User._attachments.filename.data}`

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/dashboard' />
                    </IonButtons>
                    <IonTitle>User Detail</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>

                {
                    // eslint-disable-next-line eqeqeq
                    (User.id == props.match.params.id) &&  (
                        < IonCard >
                            <img src={imgUrl} alt='avatar' />
                           
                        <ion-card-header>
                            <ion-card-subtitle>Name</ion-card-subtitle>
                            <ion-card-title>{User.name}</ion-card-title>
                        </ion-card-header>
                        <br />
                        <ion-card-content>
                            <ion-card-subtitle>Email</ion-card-subtitle>
                            <ion-card-title>{User.email}</ion-card-title>
                            <br />
                            <ion-card-subtitle>Profession</ion-card-subtitle>
                            <ion-card-title>{User.position}</ion-card-title>
                        </ion-card-content>
                        </IonCard>
            )
        }

        
        
        

            </IonContent>
        </IonPage >
    )
}

export default UserDetail
