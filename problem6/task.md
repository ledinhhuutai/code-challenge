# Task – Real-Time Leaderboard Backend

Build a backend service that maintains a real-time leaderboard and exposes secure APIs for updating and reading scores.

## Deliverables
- Node.js + TypeScript service (Express or Fastify) with REST + WS/SSE.
- Redis for leaderboard (ZSET) and Pub/Sub; PostgreSQL for durable events and current totals.
- Security: JWT bearer auth with scopes; idempotency on write; rate limiting.
- Documentation: how to run locally and with Docker; quick verification commands.

## Functional Requirements
1. Start action session
   - `POST /v1/actions/start` (Auth: `scores:write`)
   - Returns short-lived action token (JWT) and `actionSessionId`.
2. Increment score
   - `POST /v1/scores/increment` (Auth: `scores:write`)
   - Validates token; writes `score_events` and updates `user_scores` in a transaction.
   - Idempotent via `Idempotency-Key` header.
   - Updates Redis ZSET and publishes delta.
3. Read leaderboard
   - `GET /v1/leaderboard/top?limit=10` (Auth: `scores:read`)
   - Reads Redis ZSET (`ZREVRANGE ... WITHSCORES`).
4. Real-time stream
   - `GET /v1/stream/leaderboard` (SSE) or `GET /v1/realtime/leaderboard` (WebSocket)
   - Sends initial snapshot and subsequent updates.

## Data Model (DDL sketch)
- `users(id, display_name, avatar_url?, created_at, updated_at)`
- `action_sessions(id, user_id, action_type, status, started_at, expires_at)`
- `score_events(id, user_id, delta, source, action_session_id, idempotency_key, created_at)`
- `user_scores(user_id, score, updated_at)`

## Constraints & Policies
- Server-authoritative scoring; client cannot set scores directly.
- Each increment is exactly-once per `Idempotency-Key`.
- Bounds: `delta` in `[1..100]` (configurable).
- Rate limits per-user and per-IP (token bucket).

## Environment Variables
- `DB_URL` (PostgreSQL)
- `REDIS_URL` (Redis)
- `PORT` (API port)
- `ACTION_TOKEN_TTL`, `SESSION_TTL`

## Acceptance Criteria
- Top-N endpoint returns correct ordering and values under concurrent updates.
- Valid increments persist to DB and reflect in Redis; idempotency prevents duplicates.
- Unauthorized or expired tokens are rejected.
- Stream delivers snapshot on connect and deltas thereafter.

## Notes
- Prefer small, focused modules (controllers/services/repositories) and Zod validation.
- Add tests for idempotency and token validation when possible.
- Provide Docker Compose for Redis+PostgreSQL+API to ease local run.