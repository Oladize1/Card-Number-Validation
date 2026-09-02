# Card Number Validation API

**Live demo:** https://card-number-validation.pxxlspace.cv/

This project is a card number validation service. It checks whether a submitted card number is structurally valid, correct length and format, then verified against the industry-standard Luhn algorithm (a checksum used to catch typos and malformed numbers).

## Tech Stack
- Node.js, TypeScript (strict mode)
- Express.js
- Vitest + Supertest for testing
- ESLint for code quality checks

## Setup

1. Clone the repository

```
git clone https://github.com/Oladize1/Card-Number-Validation.git
```

2. Move into the project directory

```
cd card-validation-api
```

3. Install dependencies

```
npm install
```

4. Create your local environment file from the example

```
cp .env.example .env
```

5. Start the development server

```
npm run dev
```

The server runs on `http://localhost:4000` by default, or whichever `PORT` you set in `.env`.

## API

### GET /

Basic root route confirming the API is running.

**Response (200):**

```json
{ "status": "ok", "message": "Card Number Validation API is running" }
```

### POST /api/validate

**Request body:**

```json
{ "cardNumber": "4111111111111111" }
```

**Success response (200):**

```json
{ "status": "success", "statusCode": 200, "isValid": true, "message": "credit card number is valid" }
```

**Error response (400) — missing/invalid input:**

```json
{ "status": "error", "statusCode": 400, "message": "card number is required" }
```

**Example curl:**

```
curl -X POST http://localhost:4000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"cardNumber": "4111111111111111"}'
```

### Unmatched routes

Any request to an undefined route returns a consistent JSON 404 response instead of a default HTML error page.

**Response (404):**

```json
{ "status": "error", "statusCode": 404, "message": "Route GET /foo not found" }
```

## Testing

Run all tests:

```
npm test
```

Run only the unit tests for the validation service:

```
npm run test:service
```

Run only the integration tests for the endpoint:

```
npm run test:integration
```

Check code quality with ESLint:

```
npm run lint
```

## Design Decisions

- **cardNumber as a string, not a number:** avoids leading-zero loss and integer-range issues.

- **400 vs 200 boundary:** 400 means the request itself was malformed (missing or wrong-typed `cardNumber`). 200 with `isValid: false` means the request was valid and the endpoint successfully determined the card number is not valid — an invalid card is a correct answer, not a request error.

- **Validation approach:** length check (13–19 digits), digits-only check, then the Luhn algorithm. I also added a check that rejects numbers made up of a single repeated digit (e.g. `1111111111111`). This isn't part of Luhn itself, it's an extra rule I added because a run of identical digits is a common placeholder value that could still coincidentally pass Luhn.

- **Why Vitest over Jest:** I initially set up with Jest, but its ESM support is still experimental and needed extra config (`NODE_OPTIONS`, `ts-jest` ESM flags) to work with `"type": "module"` and strict TypeScript. Vitest is ESM-native and needed no extra config, so I switched.

- **Why Express over NestJS:** I'm more familiar with Express, and for a single endpoint with no modules or complex routing, NestJS's structure would add overhead this project doesn't need.

- **No Zod (or other schema validation library):** the request has one field to validate (`cardNumber` present and a string). A manual check handles that in a few lines, a schema library earns its place once the input shape has more structure than this.

- **No CORS or rate-limiting middleware:** there's no browser-based client on a different origin calling this API, so CORS doesn't apply. There's also no meaningful per-request cost to protect (no database, no external calls, just a synchronous string check), so rate-limiting isn't solving an actual risk here. Both would be reasonable first additions if this became a real client-facing deployment.

- **No database/repository layer:** there's no persistence requirement in the brief, so I didn't add one.