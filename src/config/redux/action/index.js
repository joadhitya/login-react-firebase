import firebase, { database } from "../../firebase";
export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Hartanto" });
  }, 2000);
};
export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    return firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    return firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function (error) {
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  var urlNotes = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", function (snapshot) {
      const data = [];
      const cekSnapshot = snapshot.val();

      console.log(cekSnapshot);
      if (cekSnapshot === null) {
        data.push({
          content: "kosong",
          date: '0000000',
          tile: 'kosong'
        });
        resolve(data);
      } else {
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
        dispatch({ type: "SET_NOTES", value: data });
        resolve(snapshot.val());
      }
    });
  });
};

export const updateDataFromAPI = (data) => (dispatch) => {
  var urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
export const deleteDataFromAPI = (data) => (dispatch) => {
  var urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
    resolve(true);
  });
};
