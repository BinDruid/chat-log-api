# Twitch Chat Message API

A Simple REST API to access twitch chat messages (of a specific channel) which has been saved into a MongoDB collection.

### Current End Points:

`GET /api/v1/stats` will respond with number of unique users and subs that have chatted (in a specific day).

`GET /api/v1/messages` will respond with an array containing all of chat messages (in a specific day or a user), message counts and top 10 words in entier messages.

| Resource      | METHOD | Query Parameters                 | Example                                            |
| ------------- | ------ | -------------------------------- | -------------------------------------------------- |
| Channel Stats | `GET`  | date (optional)                  | GET /api/v1/stats?date=5/30/2022                   |
| Chat Messages | `GET`  | date (optional), user (optional) | GET /api/v1/messages?date=5/18/2022?user=user_name |
