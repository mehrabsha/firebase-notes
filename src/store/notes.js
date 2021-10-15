import firebase from "../firebase";
import { getDatabase, ref, set, onValue, update } from "firebase/database";

const db = getDatabase(firebase);
export default {
  namespaced: true,
  state: {
    notesList: [],
    isLoading: false
  },
  getters: {
    getAllNotes: state => state.notesList,
    getIsLoading: state => state.isLoading
  },
  mutations: {
    setNotesList: (state, payload) => (state.notesList = payload),
    setIsLoading: (state, payload) => (state.isLoading = payload)
  },
  actions: {
    addNote({ rootGetters }, data) {
      const noteId = `note_${Date.now()}`;
      const userEmail = rootGetters["user/getEmail"];
      set(ref(db, `notes/${noteId}`), {
        id: noteId,
        title: "test",
        content: data.content,
        is_favourite: false,
        is_deleted: false,
        file: data.file,
        email: userEmail
      });
    },
    updateNote() {
      update(ref(db), {
        "notes/note_1634207990954": {
          id: "hi"
        }
      });
    },
    allNotes({ commit, rootGetters }) {
      commit("setIsLoading", true);
      onValue(ref(db, "notes"), snapshot => {
        const allNotes = Object.values(snapshot.val());
        const userNotes = allNotes.filter(
          note => note.email === rootGetters["user/getEmail"]
        );

        // add user notes to state and set isloadng to false
        commit("setNotesList", userNotes);
        commit("setIsLoading", false);
      });
    }
  }
};
