<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- All UC SHIP facts live in `src/data/ucship.ts` with source URLs; components read from it — keeps figures verifiable and single-sourced.
- Cost/deadline logic is pure in `src/lib/ship-math.ts` with tests in `src/test/ship-math.test.ts` — math must stay testable.
- Section navigation uses a shared Navigation component with a native dialog on phones; native focus trapping and Escape dismissal keep all destinations keyboard-accessible.
- Selection controls use shared native radio inputs with labeled visual targets — browser-native arrow-key selection avoids custom keyboard timing issues.
- Waiver status uses a live local-date hook that refreshes at midnight and on focus/visibility — open tabs must not show stale deadline status.
- Insurance definitions are single-sourced in `src/data/insurance-terms.ts` and added to reading text through InsuranceText; skip interactive labels to avoid nesting buttons.
- Guide languages use bundled catalogs and a URL preference; interpolate whole translated messages for dynamic values and localize dates, while leaving insurance calculations, brands and official links unchanged — prevents fragment grammar and altered facts.
- Print the existing guide through print CSS and beforeprint/afterprint preparation; expand and restore disclosures and deduplicate numbered source URLs so language and current interactive choices stay intact.
<!-- AGENT-MEMORY:END -->
