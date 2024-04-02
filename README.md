Установка:
- необходимые для конфигурации бэка данные содержатся в .env файле в корне репозитория
    если в гите файла нет, кго надо создать со следующими данными (девелоп)
    PORT=3000
    APP_HTTPS_URL=https://e8d9-185-104-126-181.ngrok-free.app
    API-KEY=1
    API_KEY_BOT=2

    TELEGRAM_BOT_KEY=6754440846:AAHcIv7xHUE7pGheh9eF-cmgb0xX49HsrQI
    TELEGRAM_API_URL=https://api.telegram.org/bot

    TG_API_PHONE=89276732588
    TG_API_ID=27906368
    TG_API_HASH=3330b002bc5d3552caecacd2cd4833f1

    JWT_SECRET=123
    SESSION_SECRET=smianal

    DB_HOST=192.168.3.26
    DB_PORT=5432
    DB_NAME=smianal
    DB_USER=sas
    DB_PASS=Cvbhyjd1989

    FRONT_URL=localhost:8080

- в данных конфигурации БД (DB_HOST...) надо указать адрес имеющейся свободной базы на дев стенде
- выполнить установку зависимостей командой npm install
- первым скриптом запускать миграции (npx sequelize-cli db:migrate) есть в package.json
- вторым скриптом запустить команду preserve
- после корректной установки, в последующих запусках запускать бэк необходимо только командой serve 
- при успешном запуске и контакте с БД в терминале должны быть следующие сообщения:
[1] [1] Listening: http://localhost:3000
[1] [1] Executing (default): SELECT 1+1 AS result
[1] [1] Connection has been established successfully.