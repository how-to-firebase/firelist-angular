import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as nodemoji from 'node-emoji';

const serviceAccount = require('../firebase-adminsdk-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firelist-angular-dev.firebaseio.com'
});

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
  query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
          return 0;
        }

        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
      })
      .catch(reject);
}

const deleteCollection = (db, collectionPath, batchSize) => {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

// https://firebase.google.com/docs/functions/manage-functions#modify-region
// https://firebase.google.com/docs/functions/locations
// @Todo: Turn on retry() and set the timeout to be very long
export const deleteNoteAndTodos = functions.region('europe-west1').firestore
  .document('notes/{noteId}')
  .onDelete((snap, context) => {
    const noteId = context.params.noteId;

    const collectionTodosPath = `notes/${noteId}/todos`;
    console.log(`Preparing to delete Note Todos: ${collectionTodosPath}`);

    return deleteCollection(firestore, collectionTodosPath, 50).then(() => {
      console.log('Todos are gone!');
    });
  });


// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// 3. firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const APP_NAME = 'Firelist PWA';
// Sends an email to the given collaborator.
const sendEmail = async (mailOptions) => {
  await mailTransport.sendMail(mailOptions);
  console.log('New email sent to:', mailOptions.to);
  return null;
}

// [START shareNoteViaEmail]
export const shareNoteViaEmail = functions.firestore
  .document('notes/{noteId}')
  .onUpdate((change, context) => {
    const previousNoteValue = change.before.data();
    const newNoteValue = change.after.data();

    if (newNoteValue.collaborators.length > previousNoteValue.collaborators.length) {
      const randomEmoji = nodemoji.random();
      const collaboratorEmail = newNoteValue.collaborators[newNoteValue.collaborators.length - 1];

      const mailOptions = {
        from: `${APP_NAME} <firelist.pwa@gmail.com>`,
        to: collaboratorEmail,
        subject: `${randomEmoji.emoji} You've received an invitation to collaborate`,
        text: `Hey there!\n\nGreat news! You just got invited to collaborate. Access https://firelist-angular-dev.firebaseapp.com/note/${context.params.noteId} and have fun!\n\n-----------------\n${newNoteValue.title}\n${newNoteValue.description ? `${newNoteValue.description}\n` : ''}${newNoteValue.geolocation ? newNoteValue.geolocation.formatted_address : ''}`
      };

      return sendEmail(mailOptions);
    } else {
      return null;
    }
  });
// [END shareNoteViaEmail]