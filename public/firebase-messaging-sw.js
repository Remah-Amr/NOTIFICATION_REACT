// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Replace the values with yours
const firebaseConfig = {
  apiKey: "AIzaSyBq64HWdfk5p47V7yJtHvRP1_mflsrnqlY",
  authDomain: "authmodule-test.firebaseapp.com",
  databaseURL: "https://authmodule-test-default-rtdb.firebaseio.com",
  projectId: "authmodule-test",
  storageBucket: "authmodule-test.appspot.com",
  messagingSenderId: "239733814657",
  appId: "1:239733814657:web:08d8a08350060cbe1ea480",
  measurementId: "G-WQMCS66HE7"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Not necessary, but if you want to handle clicks on notifications
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link;
  if (!pathname) return;
  const url = new URL(pathname, self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === url ? (windowClient.focus(), true) : false
        );

        if (!hadWindowToFocus)
          self.clients
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
      })
  );
});
