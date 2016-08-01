"use strict";
app.factory('AuthFactory', function() {

  let provider = new firebase.auth.GoogleAuthProvider();
  let currentUserId = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User logged in", user.uid);
      currentUserId = user.uid;
    } else {
     
    }
  });

  let authWithProvider = function() {
    return firebase.auth().signInWithPopup(provider);
  };

  let getUser = function() {
    return currentUserId;
  };

  let createAccount = function(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };
  let signIn = function(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  let logout = function() {
    return firebase.auth().signOut().
    then(function(){
      currentUserId=null;
    });
  };

  return {authWithProvider, getUser, createAccount, logout, signIn};
});