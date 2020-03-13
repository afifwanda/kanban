# kanban

# firebase link
```bash
https://kanban-140e3.firebaseapp.com/
```

# Server dependencies
### Dependencies

server side

| Package | Version |
| --- | --- |
| "bcrypt"              | "^4.0.1" |
| "cors"                | "^2.8.5" |
| "dotenv"              | "^8.2.0" |
| "express"             | "^4.17.1"|
| "google-auth-library" | "^5.10.1"|
| "jsonwebtoken"        | "^8.5.1" |
| "pg"                  | "^7.18.2"|
| "sequelize"           | "^5.21.5"| 

client side 

| Package | Version |
| --- | --- |
| "axios"               | "^0.19.2" |
| "vue"                 | "^2.6.11" |
| "vue-hot-reload-api"  | "^2.3.4"  |


# Default Port

```bash
SERVER : http://localhost:3000
CLIENT : http://localhost:1234
```

# Server Tools
```bash
Tools: NodeJS, Express, sequelize, postgresql
```

# Client Tools
```bash
Tools: Vue
```

# .env example
```bash
port =
DB_USERNAME =
DB_PASSWORD =
JWT_SECRET =
CLIENT_ID =
```
# User
| URL | Method | Description |
| --- | --- | --- |
| /user/register        | POST | mendaftar user baru|
| /user/login           | POST | login dan mendaptkan akses token |
| /user/googleLogin     | POST | login dengan akun google |


# POST 

### Full Documentation

see full documentation here https://documenter.getpostman.com/view/10570933/SzS1UpJf?version=latest