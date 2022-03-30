// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Replace the values with yours
const firebaseConfig = {
  apiKey: "AIzaSyBfTuzIZ19EWIE5BVGseKifa_4iuITXEvk",
  authDomain: "test-6393f.firebaseapp.com",
  projectId: "test-6393f",
  storageBucket: "test-6393f.appspot.com",
  messagingSenderId: "428344922618",
  appId: "1:428344922618:web:159fa46538cbbbf6d39443",
  measurementId: "G-W596FW4R3C"
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
