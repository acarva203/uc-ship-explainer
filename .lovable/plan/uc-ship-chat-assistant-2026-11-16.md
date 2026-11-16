# UC SHIP chat assistant

Replace the "Ask about UC SHIP" box with a single, unsaved chat conversation. Students type in their selected language and get a numbered step-by-step answer with official links, in that language.

## What students see
- Same spot in the guide (after the opening, before "How to get care"), hidden when printing.
- Emergency/symptom safety note and privacy note stay above the chat.
- Messages: student bubbles, assistant answers as numbered steps, each step with its official source link; follow-up questions keep earlier context.
- "New conversation" button clears the chat. Nothing is stored; closing the page erases it.
- Typing indicator while answering, Stop button, friendly error with contacts if the answer fails.
- Symptom questions: no assessment, points to 911 / nurse line (530) 752-2349.

## Keeping answers grounded
- The model may only use facts from the guide's sourced entries (costs, referrals, where to get care, waiver) and only cite allowlisted official links; any link not on the list is removed before display.
- Answers in the selected language; dollar amounts, phone numbers and plan names kept exact.
- Out-of-scope questions get a short "can't help with that here" plus contacts.
- Existing caveat about unconfirmed 2026–27 benefit booklets shown under the chat.

## Technical details
- Server function streams `streamResponse` on `openai/gpt-6-astra` with full message history each turn (client-held, max ~20 turns, 1500 chars each), system prompt built from `SHIP_GUIDANCE` + `SRC` allowlist, language code passed in.
- Markdown rendering via AI Elements (`Conversation`, `Message`, `MessageResponse`, `PromptInput`), styled with existing blue/gold tokens; link post-filter against `SRC` URLs.
- `GatewayError` handling per SDK guidance; no logging of question text.
- Translate new UI strings into all five languages.
- Remove old AskShip result UI; update AGENTS.md rule (model now writes steps but only from bundled facts/allowlisted links).
- Tests: link allowlist filter, history trimming limits. Browser check: English and Spanish follow-up, symptom redirect, 320px.
