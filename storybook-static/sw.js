/* eslint-disable no-restricted-globals */
// console.log({ self });

self.addEventListener("install", (event) => {
  console.log("Sw is installing");
});

self.addEventListener("activate", (event) => {
  console.log("sw is activated");
});

self.addEventListener("fetch", (event) => {
  console.log("fetch request", event.request.url);
});

self.addEventListener("message", (event) => {
  console.log("message from sw");
});
