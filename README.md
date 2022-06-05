# Twitch_Chat_Log_API
Simple REST API to manipulate twitch chat messages log which has been saved into MongoDB collection.

Current End Points:

GET /api/v1/chatters will respond with information about all chatters stored in database.

GET /api/v1/messages will respond with information about all messages stored in database.

GET /api/v1/chatters/<user_name>?limit=limit_size will respond with all messages of a user with optional number of messages.
