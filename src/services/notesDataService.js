import firebase from "../firebase";
import { getDatabase, set, ref, onValue } from "firebase/database";

const db = getDatabase(firebase);

class NotesDataService {
  getAll() {
    return onValue(ref(db, "notes"), snapshot => {
      console.log("getAll > snapShot", snapshot.val());
    });
  }

  create(noteId) {
    return set(ref(db, "notes/" + noteId), {
      id: noteId
    });
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new NotesDataService();
