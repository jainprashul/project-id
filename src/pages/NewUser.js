import React, { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react'
import db from '../db/pouch'
import { async } from 'q'

const NewUser = ({ history }) => {

    const reader = new FileReader()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [position, setPosition] = useState('')
    const [photo, setPhoto] = useState()

    const submitData = async (e)  => {
        e.preventDefault()
       

        let newData = {
            _id: 'user:' + Date.now().toString(),
            _attachments: {
                filename: {
                    type: photo.type,
                    data: photo,
                    content_type : photo.type
                }
            },
            name,
            email,
            position,
        }
        console.log(newData);
        db.put(newData, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Saved ' + res);
                history.push('/dashboard')

            }
        })

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/dashboard' />
                    </IonButtons>
                    <IonTitle>New User</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>


                <form onSubmit={submitData}>

                    <IonItem>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput id='name' onIonChange={(e) => setName(e.target.value)} ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput onIonChange={(e) => setEmail(e.target.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Position</IonLabel>
                        <IonInput onIonChange={(e) => setPosition(e.target.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" >User Profile</IonLabel>
                        <IonInput type="file" accept="image/*" onIonChange={(e) => {
                            console.log(e.target.children[0].files[0]);
                            setPhoto(e.target.children[0].files[0])
                        }}></IonInput>
                    </IonItem>

                    <IonButton type='submit' color='primary'>Submit</IonButton>
                </form>





            </IonContent>
        </IonPage>
    )
}

export default NewUser
