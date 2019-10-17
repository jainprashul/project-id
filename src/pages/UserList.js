import React, { useState } from "react";
import { add } from "ionicons/icons";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  useIonViewWillEnter,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLoading
} from "@ionic/react";
import db from "../db/pouch";

const UserList = props => {
  const reader = new FileReader();
  const [Faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFaces = async () => {
    // const response = await fetch('https://uifaces.co/api?limit=50', {
    //     headers: {
    //         'X-API-KEY': '0654ef6f3731433e2ccd0d32e1e709'
    //     }
    // })

    // const face = await response.json(response)
    // console.log(face);
    // setFaces(face)
    // setLoading(false)
    const userName = "6faf9433-7e87-4b9e-9427-5ff48dc41bdf-bluemix";
    const key =
      "71d8405657a9a3edb62424bb48b0cfaad7d11c4e68eac6a44d99f0f0f4523201";
    const database = "userslist";

    console.log("syncing");
    // const url = 'https://6faf9433-7e87-4b9e-9427-5ff48dc41bdf-bluemix:71d8405657a9a3edb62424bb48b0cfaad7d11c4e68eac6a44d99f0f0f4523201@'
    const url = `https://${userName}:${key}@6faf9433-7e87-4b9e-9427-5ff48dc41bdf-bluemix.cloudantnosqldb.appdomain.cloud/${database}`;
    console.log(url);

    db.sync(url, {
      live: true,
      retry: true
    })
      .on("complete", res => console.log("sync done", res))
      .on("change", res => console.log("changed", res))
      .on("paused", res => console.log("paused", res))
      .on("error", err => {
        console.log(err);
      });

    await db.allDocs(
      { include_docs: true, descending: true, attachments: true },
      (err, doc) => {
        console.log(doc.rows);
        setFaces(doc.rows);

        setLoading(false);
      }
    );

    console.log("done");
  };

  useIonViewWillEnter(getFaces);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {Faces.length ? (
            Faces.map((item, i) => {
              let imgUrl = `data:${item.doc._attachments.filename.content_type};base64,${item.doc._attachments.filename.data}`;

              return (
                <IonItem
                  key={i}
                  href={`/dashboard/users/${i}`}
                  onClick={() => {
                    item.doc.id = i;
                    {
                      /* item.doc.photo = imgUrl */
                    }
                    localStorage.setItem("data", JSON.stringify(item.doc));
                    console.log("stored item ", i);
                  }}
                >
                  <IonAvatar slot="start">
                    <img src={imgUrl} alt="avatar" />
                  </IonAvatar>
                  <IonLabel>{item.doc.name}</IonLabel>
                </IonItem>
              );
            })
          ) : (
            <p>Add Some Users Details</p>
          )}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push("/new")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>

          <IonLoading animated isOpen={loading} message="Loading Users.."
              onDidDismiss={() => setLoading(false)}
              duration={5000}    />
    </IonPage>
  );
};

export default UserList;
