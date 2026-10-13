# Portfolio redesign: tmux + nvim

## Goal

Replace the generic "hacker terminal" look (matrix rain, neon green, `whoami` / `cat about.md` prompts) with a faithful recreation of my actual working setup: tmux + Neovim in a black-and-green Ubuntu WSL terminal.

The rule for every design decision: **if it isn't on my screen when I work, it doesn't go on the site.**

Second goal: make the site much easier to skim. The current page is ~1,700 words and ~8,000px tall on desktop. Visible text on load should drop by roughly half, with depth moved behind folds and file selection instead of deleted.

Reference mockup: `experience-mockup.dc.html` (in this folder). It is written in a custom canvas template format (`<x-dc>`, `<sc-for>`, `<sc-if>`, `{{holes}}`, and a `Component` class with `renderVals()`), so treat it as a reference for markup, styles, behaviour and copy, not as code to copy in. The `data()` method in it holds the rewritten experience copy.

## Notes for the implementer

- Inspect the existing repo first (framework version, routing, styling approach, component patterns) and follow what's there. Don't assume structure from this doc.
- Don't add dependencies without asking.
- Plan before writing code. Propose a plan for Phase 0 and Phase 1 first and wait for approval.
- Work phase by phase. Each phase should leave the site deployable.

## Non-negotiables

- **Mouse and touch first.** Keyboard navigation is a bonus layer for people who discover it. Every action must be reachable by click/tap.
- **Readable.** Body 15-16px, line-height ~1.7, text column max ~78ch.
- **Accessible.** Real `<button>` and `<a>` elements, visible focus styles, `aria-hidden` on decorative glyphs (line numbers, tildes, `#` markers, carets), 4.5:1 contrast for all real text, `prefers-reduced-motion` disables the cursor blink and any other animation.
- **Works at 390px wide.**
- **Cut:** matrix rain, typing animations, boot sequences, CRT/scanline effects, the scrolling skills marquee.
- **Copy rule:** no em dashes anywhere in site copy.

## Design tokens

Read from the real setup on 2026-10-13: Windows Terminal Ubuntu profile (scheme **Ottosson**, `background #000000`, font **Cascadia Mono**), Neovim **rose-pine** (main) with `Normal` cleared to `bg=none` by `ColorMyPencils()`, and tmux with no theme (default green status bar). Values come from live highlight groups via `nvim --headless`. They are defined once in `src/app/globals.css` (CSS variables plus the Tailwind `@theme`), so swapping colorschemes is a one-file change.

| Token | Value | Source | Used for |
|---|---|---|---|
| `bg` | `#000000` | Ottosson bg (`Normal` bg=none) | page and pane background |
| `fg` | `#bebebe` | Ottosson fg (`Normal` fg cleared) | body text (11:1) |
| `fg-strong` | `#e0def4` | `CursorLineNr`, `Folded` fg | emphasis, cursor line number, fold text |
| `surface` | `#1f1d2e` | `StatusLine` / `Folded` / `ColorColumn` bg | statusline, fold line |
| `cursorline` | `#26233a` | `CursorLine`, `TelescopeSelection` | cursor line, selected listing row |
| `visual` | `#332d41` | `Visual` | `::selection` |
| `border` | `#6e6a86` | `WinSeparator` | pane divider |
| `fg-muted` | `#908caa` | `StatusLine` fg | statusline text, secondary text (6.4:1 on bg, 5.1:1 on surface) |
| `comment` | `#908caa` | `Comment` | metadata, hints |
| `line-nr` | `#6e6a86` | `LineNr` | line numbers and tildes; 4.1:1, so decorative (`aria-hidden`) only |
| `heading` | `#c4a7e7` | `@markup.heading.1.markdown` (iris) | `# headings` |
| `list` | `#31748f` | `@markup.list` (pine) | bullet markers; decorative only |
| `code` | `#9ccfd8` | `@markup.raw` (foam) | inline code and tech stack, plain text with no chip background |
| `warn` | `#f6c177` | `WarningMsg` (gold) | "live" badges, focus outline |
| `tmux` | `#3fae3a` | Ottosson `green` | tmux status bar background, with `#000000` text (7.3:1) |

Never use `StatusLineNC` (`#6e6a86` on `#1d1b2a`, about 3.2:1) for real text.

Font: **Cascadia Mono** (via `next/font/google`).

## Decisions (2026-10-13)

- **Palette is faithful to the real screen**, not the mockup's green. The editor is black with rose-pine colors; the only green is tmux's default status bar.
- **Real nvim chrome.** There's no lualine and no file-tree plugin on the real setup. The statusline is nvim's default (`laststatus=2`, one per window: file path on the left, `row,col  All` on the right, no mode block). The left pane is a netrw-style listing, not a tree plugin.
- **The tmux bar uses tmux defaults:** the whole bar is green with black text, and the active window is marked with `*` (plus bold and `aria-current`), not a separate highlight. It sits at the top because it's the site nav, although tmux's default is the bottom.
- **One route per tmux window:** `/`, `/about`, `/experience`, `/projects`, `/contact`. Old `/#section` links redirect on the client.

## Layout (whole site)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [finlay] 0:home 1:about 2:experience* 3:projects 4:contact   "finlaycooper.ca" 17:11 13-Oct-26 │  tmux status bar = nav
├───────────────┬──────────────────────────────────────────────────────┤
│ ~/experience  │ experience › broadgrain.md        internal tool ● live│  winbar
│ ▾ experience/ │   4 # Software Developer Intern                       │
│   broadgrain  │   3 BroadGrain Commodities · Toronto, ON · Summer 2025│
│   javier-...  │   2 `TypeScript` `React Native` `Node.js` ...         │
│   soi-ram     │   1                                                   │
│   gta-capst.. │   5 - Sole engineer on a compliance platform ...      │  cursor line
│ ▸ archive/    │   1 - Cut compliance reporting time 75% ...           │
│               │   2 +--  4 lines: details ························    │  fold
│               │   ~                                                   │
├───────────────┴──────────────────────────────────────────────────────┤
│ experience/broadgrain.md                                  5,1    All │  nvim default statusline
│ press ? for keybinds · j/k move · enter open · za fold · :resume     │  cmdline hint row
└──────────────────────────────────────────────────────────────────────┘
```

### tmux status bar (site nav)

- Top of the page (`status-position top` is a real tmux option).
- Whole bar on `tmux` green with black text (tmux defaults). Left: `[finlay]`, then windows `0:home 1:about 2:experience 3:projects 4:contact`. The active window gets a `*` suffix, bold, and `aria-current="page"`.
- Right: `"finlaycooper.ca" HH:MM DD-Mon-YY`, a live clock in tmux's default `status-right` format.
- Wraps onto multiple lines at phone width.

### Panes

- Flex row with `flex-wrap: wrap` and `gap: 1px`. The container background is `border` (`WinSeparator`), so the 1px gap renders as the pane divider whether the panes sit side by side or stack on mobile.
- File tree pane: `flex: 1 1 240px`. Buffer pane: `flex: 999 1 560px; min-width: 0`.
- Listing pane looks like netrw. Rows are buttons with min-height 44px. The selected row uses the `cursorline` background and `fg-strong` text. Live items get a `warn` `● live` tag.

### nvim buffer

- **Winbar:** `section › file.md` on the left. On the right: external link (`↗`) when there is one, a short note (e.g. "internal tool") when there isn't, and an amber `● live` badge.
- **Gutter:** 64px, `relativenumber` behaviour. The cursor line shows its absolute number in `warn`; every other line shows its distance from the cursor. Cursor line gets the `cursorline` background and a block cursor on its first character (blinks; off under reduced motion). Gutter is `aria-hidden`.
- **Markdown rendering:** `# Title` heading in `heading` with the `#` at ~55% opacity; meta line in `comment`; tech stack as inline code in `code` (no chip background); bullets with a `list` `-` marker and a hanging indent so wrapped lines align.
- **Folds:** extra detail is collapsed behind `+--  N lines: details ····` (dots fill to the pane edge, `surface` background). Clicking toggles. Open state shows `▾ details (zc to close)` followed by the detail lines. Use `aria-expanded`.
- **Tildes** after the end of the content.

### Statusline (nvim default, `laststatus=2`)

One per window, on `surface` with `fg-muted` text: file path on the left, `row,col` and `All` on the right. No mode block.

### Cmdline hint row

`press ? for keybinds · j/k move · enter open · za fold · :resume`

## Sections

- **home:** an nvim start screen (dashboard-nvim / alpha style): my name as an ASCII or large mono header, the one-paragraph summary, my photo, and a shortcut list (`[a] about  [e] experience  [p] projects  [r] resume  [c] contact`) that works as clickable links. Keep the photo.
- **about:** `about.md` buffer. Trim to the essentials. Fold education into here or give it a small buffer.
- **workflow:** `workflow.md`. This is now the **only** place the AI-agent workflow story lives. Keep it to the 5 steps, shorter.
- **experience:** exactly as in the mockup. Four roles in the tree (BroadGrain, Javier Navarrete, Soi Ram, GTA capstone). YMCA and Three Lakes go in a collapsed `archive/` folder. Use the copy from the mockup's `data()`.
- **projects:** same split layout: project list in the tree, the selected project in the buffer. Each project uses folds for "what it is / how it works / the interesting challenge / what I focused on". Add real screenshots or GIFs of what I built, and live / GitHub / play links.
- **skills:** replace the 33-item marquee (currently rendered 3 times in the DOM) with a `:Lazy`-style plugin list, ~12 curated technologies, each linking to the role or project that used it.
- **contact:** `contact.md` buffer with the form styled as a buffer, plus a plain `mailto:` fallback.

## Copy changes

- Experience: 3 visible bullets per role, the rest in a fold.
- Remove AI-agent mentions from experience bullets and keep that story in the workflow section only. The hero summary can mention it once at most.
- Fracture Protocol: reconcile "built with AI agents" with "I wrote about two-thirds of the C#". Pick one honest framing.
- Capstone: drop the "59 files" metric; lead with the 107 endpoints and the three-role integration harness.

## Keybinds (Phase 3)

| Key | Action |
|---|---|
| `0`-`4` | switch tmux window (section) |
| `j` / `k` | move cursor / tree selection |
| `gg` / `G` | top / bottom |
| `Enter` | open selected file |
| `za` | toggle fold on current line |
| `/` | Telescope-style fuzzy finder over projects, roles and skills |
| `:` | command line: `:resume`, `:projects`, `:contact`, `:q` |
| `?` | which-key style popup listing all keys |
| `Esc` | close any overlay |

Never capture keys while focus is in an input or textarea (the contact form).

## Phases

0. **Fixes that don't depend on the redesign**
   - Add Open Graph + Twitter card meta, a 1200x630 share image, and a canonical URL (Next.js metadata API if that's what the repo uses).
   - Add a skip-to-content link.
   - Bug check: jumping via the nav to `#experience` showed a blank section until I scrolled manually. Find out if the scroll-reveal animation fails on anchor jumps; fix it or remove the reveal.
1. **Tokens and shell:** design tokens, font, tmux bar, pane layout, global statusline, cmdline row, using existing content.
2. **Sections:** experience and projects first (split layout, folds, relative numbers), then home, about, workflow, skills, contact.
3. **Keybinds:** the table above, fuzzy finder, which-key popup.
4. **Mobile and polish:** 390px pass, reduced motion, contrast check.
5. **Separate project, later:** a real TUI version at `ssh finlaycooper.ca`, using Charm's Wish (Go) or Ink (TypeScript/React) on a small VPS. Add a copyable `ssh finlaycooper.ca` line to the home screen once it's live.

## Done when

- Everything is reachable by mouse/touch alone; keyboard layer works without breaking form input.
- No accessibility violations from an automated audit (axe or Lighthouse).
- Layout works at 390px.
- Reduced motion disables all animation.
- A link preview with image renders when finlaycooper.ca is pasted into LinkedIn or Slack.
- Visible words on first load are roughly half of today's ~1,700.
