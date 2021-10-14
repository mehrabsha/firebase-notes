import firebase from "../firebase";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

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
    addNote() {
      const noteId = `note_${Date.now()}`;
      set(ref(db, "notes/" + noteId), {
        id: noteId
      });
    },
    updateNote() {
      update(ref(db), {
        "notes/note_1634207990954": {
          id: "hi"
        }
      });
    },
    allNotes({ commit }) {
      commit("setIsLoading", true);
      onValue(ref(db, "notes"), snapshot => {
        commit("setNotesList", snapshot.val());
        commit("setIsLoading", false);
      });
    }
  }
};
