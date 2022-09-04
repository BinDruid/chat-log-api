# Twitch Chat Message API

A Simple REST API to access twitch chat messages (of a specific channel) which has been saved into a MongoDB collection.

### User Authentication:

#### Step 1: Register

Register your username with a `POST` request to `/api/v1/user`.

You need to include 2 parameters in the header:

`username`

`password`

#### Step 2: Get Auth-Token

Send a `POST` request to `/api/v1/user/token` with username and password included in the header.

If your credentials are correct you will get a auth-token.

#### Consuming API End Points:

Every other routes of the API (exept `/user`) are protected with a valid auth-token. You should include the auth-token in the request header when calling protected end points.

Example:

`GET /api/v1/stats?date=5/30/2022 Content-Type: application/json auth-token: Bearer <your auth-token>`

### Current Available End Points:

`GET /api/v1/stats` will respond with number of unique users and subs that have chatted (in a specific day).

`GET /api/v1/messages` will respond with an array containing all of chat messages (in a specific day or from a user).

`GET /api/v1/topwords` will respond with an array containing top 10 words (in a specific day or from a user).

| METHOD | Resource      | Query Parameters                 | Example                                            |
| ------ | ------------- | -------------------------------- | -------------------------------------------------- |
| `GET`  | Channel Stats | date (optional)                  | GET /api/v1/stats?date=5/30/2022                   |
| `GET`  | Chat Messages | date (optional), user (optional) | GET /api/v1/messages?date=5/18/2022?user=user_name |
| `GET`  | Top Words     | date (optional), user (optional) | GET /api/v1/topwords?date=5/18/2022?user=user_name |
