import {
  IonContent,
  IonList,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonLabel,
  IonNote,
  IonBadge,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";

import {add} from 'ionicons/icons';

import React from "react";

const Home = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Hello</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Hello From React Side</p>

        <IonList>
          <IonItem>
            <IonCheckbox slot="start" />
            <IonLabel>
              <IonNote>Prashul Jain</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="end">
              5 days
            </IonBadge>
          </IonItem>
        </IonList>

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton onClick={ ()=> props.history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
