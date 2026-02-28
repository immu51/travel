# Fix "MongoDB connection error: bad auth"

"Bad auth" means Atlas is rejecting your **username** or **password**.

## 1. Use separate env vars (recommended if password has special characters)

In `backend/.env`, **comment out or remove** `MONGODB_URI` and set these (use your **actual** Atlas username, password, and host):

```env
MONGODB_USER=khanimran57175_db_user
MONGODB_PASSWORD=Tajmahal@786
MONGODB_CLUSTER=cluster0.iyyduhg.mongodb.net
MONGODB_DB=travel
```

The app will URL-encode the password for you, so you can use `@`, `#`, etc. as-is. No need to write `%40` for `@`.

## 2. If you keep using MONGODB_URI

Encode special characters in the password:

| Character | Use in URI |
|-----------|------------|
| `@`       | `%40`      |
| `#`       | `%23`      |
| `:`       | `%3A`      |
| `/`       | `%2F`      |
| `?`       | `%3F`      |

Example: password `Pass@123` → in URI use `Pass%40123`.

## 3. Verify in MongoDB Atlas

1. **Atlas** → your project → **Database Access** → your database user.
2. **Edit** the user and set a **new password** (e.g. simple one without symbols to test: `MyPass123`).
3. Use that **exact** password in `.env` (with the separate vars above, or encoded in `MONGODB_URI`).
4. **Network Access**: ensure your IP is allowed (or use `0.0.0.0/0` for testing only).

## 4. Check username

The username must match **exactly** what you see in Atlas (Database Access). It is often something like `myuser` or `myuser_db_user` (no `@cluster...` in the name).

After changing `.env`, restart the backend: `npm run dev`.
