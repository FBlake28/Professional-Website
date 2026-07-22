# Contract: Contact Form → Formspree

The only external interface this feature exposes/consumes (constitution Principle II: Formspree is
the one sanctioned external service). This documents the request/response contract the frontend JS
(`js/main.js`) implements against.

## Request

- **Method**: `POST`
- **URL**: `https://formspree.io/f/{FORM_ID}` (Freddy's Formspree form ID — configured as a constant
  in `js/main.js`, not a secret; Formspree form endpoints are safe to expose client-side by design)
- **Headers**: `Accept: application/json` (required to get a JSON response instead of Formspree's
  default HTML redirect page)
- **Body** (`FormData` or `application/json`):

  | Field | Required | Client-side validation before send |
  |---|---|---|
  | `name` | yes | non-empty |
  | `email` | yes | non-empty, well-formed (`type="email"` + `checkValidity()`) |
  | `message` | yes | non-empty |

  A submission failing any of these MUST NOT be sent (FR-010, SC-004) — validation happens before
  `fetch()` is ever called.

## Responses (handled by frontend)

| Case | Formspree response | Frontend behavior |
|---|---|---|
| Success | `200 OK`, JSON body (e.g. `{ ok: true }`) | Show inline success confirmation (FR-012); clear form. |
| Formspree-side validation error | `4xx`, JSON body with an `errors` array | Show inline error message summarizing the returned error(s) (FR-012). |
| Network failure / unreachable / offline | `fetch()` rejects (no response) | Show a clear inline error message; **do not clear the visitor's typed input** (Edge Cases: "does not lose the message they typed"). |

## Out of scope

- No server-side contract on this project's side — there is no backend (Principle II).
- No webhook, callback, or polling — this is a one-shot fire-and-respond POST.
- No retry logic beyond what the visitor triggers manually by resubmitting.
