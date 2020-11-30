var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEsJD1KRGYboaaijM2VIO1uWJHBK_0COD-g2k_9bxeQMWSD8rEhNakRidmlY7a1F2zyvoiPaC-gQEFXn0u7LiB8",
   "privateKey": "GzIxYIdRS5XjrzGHtXRBgR0QKVDrcHKA51vE8xcsHjE"
};
 
 
webPush.setVapidDetails(
   'mailto:rajaikhsanhalomoan@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f5n1XPwgSSU:APA91bGxbNxxRVYjCXu088Bf7Qkxkac51ZLhApKbiQOOky7iZsttexWcmQexgP2vmYi54xCqTsdivn4uqvTvnx25I_zjnkViyoGrmnRj6nQloJDZ5PCtA8wXwokRDquMHauM5c5SF7UT",
   "keys": {
       "p256dh": "BC9o2BCuQr4pDcRMTjr7ru9PdwLeYjlq9A6TE9QE/yQWjdLIruTirnixCQVxqK7HgbNykA0O7l5NkdLKcjjwDgs=",
       "auth": "Aj31LFEVPCIypjdtWoRaRQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '490016331585',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);