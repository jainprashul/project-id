import React, { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react'
import db from '../db/pouch'
import imageCompression from 'browser-image-compression';

const NewUser = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [position, setPosition] = useState('')
    const [photo, setPhoto] = useState()
    const [submiting, setsubmiting] = useState(false)

    const submitData = async (e)  => {
        e.preventDefault()
       
        setsubmiting(true)

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
                setsubmiting(false)
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
                        <IonInput type="file" accept="image/*" onIonChange={ async (e)  => {
                            const img = e.target.children[0].files[0]
                            console.log(img);
                            console.log(`File size ${img.size / 1024 } Kb`); // smaller than maxSizeMB

                            try {
                                const resImg = await imageCompression(img, {
                                    maxSizeMB: 0.2,
                                    maxWidthOrHeight: 1366,
                                    useWebWorker: true
                                })
                                console.log(resImg);
                                console.log(`File size ${resImg.size / 1024} Kb`); // smaller than maxSizeMB

                                setPhoto(resImg)

                                

                            }

                            catch (e) {
                                console.error(e);
                            }
                            
                        }}></IonInput>
                    </IonItem>

                    <IonButton type='submit' id='formSubmit' disabled={submiting} color='primary'>Submit</IonButton>
                </form>





            </IonContent>
        </IonPage>
    )
}

export default NewUser
