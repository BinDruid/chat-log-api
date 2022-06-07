@ECHO OFF
:: This batch file logs twitch chat, starting from 6:30 Pm until 12:00 pm.

TITLE Twitch Chat Logger

ECHO ==========================
ECHO    Logging Chat
ECHO ==========================

::set CUR_YYYY=%date:~10,4%
::set CUR_MM=%date:~4,2%
::set CUR_DD=%date:~7,2%

::set SUBFILENAME=%CUR_YYYY%%CUR_MM%%CUR_DD%

node ./chat_log.js 
::> Logs/chat_%SUBFILENAME%.JSON 2>&1

pause