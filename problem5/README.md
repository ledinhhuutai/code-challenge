# pb5 – Express + TypeScript CRUD API

## Overview
Backend API with CRUD for `items`, TypeScript, PostgreSQL persistence, and basic filters. Runs locally without Docker.

## Requirements
- Node.js >= 18
- PostgreSQL >= 13
- (Optional) Docker Desktop if you prefer containers

## Database Setup (Local, non-Docker)
1. Create database and user.
```
psql -U postgres -c "CREATE DATABASE appdb;"
psql -U postgres -d appdb -c "CREATE USER appuser WITH PASSWORD 'appuser';"
psql -U postgres -d appdb -c "GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;"
```
2. Initialize schema.
```
psql -U appuser -d appdb -f ./db/init/001_init.sql
```

## Environment
Create `.env` in `pb5`.
```
DB_URL=postgres://appuser:appuser@localhost:5432/appdb
PORT=3000
```

## Install and Run (Local)
```
npm install
npm run dev
```

## Docker
You can run both PostgreSQL and the API using Docker Compose.

### Build & Run
```
# From pb5 directory
docker compose build
docker compose up -d
```
- App: `http://localhost:3000`
- DB: `localhost:5432` (service name inside network: `db`)
- Environment for app in Compose uses:
  - `DB_URL=postgres://appuser:appuser@db:5432/appdb`
  - `PORT=3000`

### Logs & Stop
```
docker compose logs -f app
# Stop containers
docker compose down
# Stop and remove data volume (recreate schema next time)
docker compose down -v
```

### Notes
- `./db/init/001_init.sql` is mounted into the Postgres container and executed at first startup.
- If you change SQL or want a clean DB, use `docker compose down -v` and then `up` again.

## API
- Base: `http://localhost:3000`

### Create item
`POST /v1/items`
```
{
  "name": "Book",
  "description": "A good book",
  "status": "active"
}
```

### List items
`GET /v1/items?q=book&status=active&limit=10&offset=0&sortBy=created_at&sortOrder=desc`

### Get item
`GET /v1/items/:id`

### Update item
`PATCH /v1/items/:id`
```
{
  "name": "New name",
  "description": "Updated"
}
```

### Delete item
`DELETE /v1/items/:id`

## Quick Verify
```
curl -s http://localhost:3000/health
curl -s -X POST http://localhost:3000/v1/items -H "Content-Type: application/json" -d '{"name":"n1"}'
curl -s "http://localhost:3000/v1/items?limit=5"
```

## Notes
- Filters: `q` searches name or description (ILIKE). `status` filters by exact value. Pagination with `limit` and `offset`. Sorting by `name`, `created_at`, or `updated_at` with `asc|desc`.
- Designed to run without Docker or with Docker Compose using the provided files.