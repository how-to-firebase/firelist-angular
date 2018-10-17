import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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