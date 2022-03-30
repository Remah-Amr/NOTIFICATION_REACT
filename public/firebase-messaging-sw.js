// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Replace the values with yours
const firebaseConfig = {
  apiKey: "AIzaSyCsf_zMJxfBzMhlKUi_orLQ5Hnb-567VeM",
  authDomain: "remah-a60ee.firebaseapp.com",
  projectId: "remah-a60ee",
  storageBucket: "remah-a60ee.appspot.com",
  messagingSenderId: "693802205955",
  appId: "1:693802205955:web:b1f8a89e5dc36f84331f36",
  measurementId: "G-RLGY9PRJK3"
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
