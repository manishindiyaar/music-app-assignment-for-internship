# Music App – Project Requirements Document (PRD)

## 1. Objective
Create a modern, micro-frontend React application that allows users to browse, filter, and manage a music library while demonstrating role-based access control (admin vs. user) and Module Federation integration.  The solution should be easily deployable to free hosting platforms and showcase clean code, clear architecture, and automated workflows.

---
## 2. Stakeholders & Personas
| Persona | Role | Goals |
|---------|------|-------|
| Admin   | Internal curator | Add new songs, delete outdated entries, verify UX works for admins |
| User    | End-user / guest | Browse and search the library, group songs, build playlists |
| HR / Reviewer | Evaluator | Assess code quality, architectural decisions, deployment, and UX |

---
## 3. Functional Requirements
1. **Music Library UI**  
   • Display a list of songs with columns: `Title`, `Artist`, `Album`, `Year`, `Duration`.  
   • Provide filter, sort, and *group by* controls for the above fields using native JS `map`, `filter`, `reduce`, and `Array.sort`.  
   • Support dark & light mode.

2. **Role-Based Access Control (RBAC)**  
   • Roles: `admin`, `user`.  
   • `admin` can *add* and *delete* songs.  
   • `user` can only *read* and use filter/sort features.  
   • Controls are conditionally rendered based on role.

3. **Authentication (Mock JWT)**  
   • Simple `/login` form.  
   • On submit, generate in-memory **JWT-like** string `{ role, exp }`.  
   • Token persisted to `localStorage`.  
   • `AuthContext` hydrates state on app boot.

4. **Micro-Frontend Architecture (Module Federation)**  
   • Two independently deployed apps:  
     1. **Main App (Container)** – handles routing, auth, and state.  
     2. **Music Library (Remote)** – UI for song list, lazy-loaded at runtime.  
   • `Main App` consumes `SongLibrary` component exposed by `Music Library` via Webpack/ Vite Module Federation.

5. **Deployment**  
   • Separate build & deploy pipelines for *container* and *remote*.  
   • Free platforms (Netlify/Vercel) + GitHub Actions CI.

---
## 4. Non-Functional Requirements
| Category | Requirement |
|----------|-------------|
| Performance | First load < 2 s on 3G, subsequent MF load via dynamic import < 1 s |
| Accessibility | WCAG AA compliant (keyboard nav, ARIA labels) |
| Code Quality | ESLint + Prettier enforced, 90% unit test coverage for pure functions |
| Scalability | New remotes can be added without changing container build |

---
## 5. Tech Stack
| Concern | Tech / Library | Rationale |
|---------|---------------|-----------|
| Language | **TypeScript** | safer refactors, better DX |
| Bundler  | **Vite 5** + `vite-plugin-federation` | faster dev HMR than Webpack |
| UI       | **React 18** (Hooks) | functional, concurrent-mode ready |
| Styling  | **Tailwind CSS** | rapid prototyping, responsive, dark mode toggles |
| State    | React **Context** + `useReducer` | lightweight vs. Redux |
| Testing  | **Vitest** (unit) & **Playwright** (e2e) | integrated with Vite, modern |
| Auth     | `jsonwebtoken` (client-side) | encode/decode mock JWT |
| CI/CD    | **GitHub Actions** | lint → test → build → deploy |
| Linting  | **ESLint**, **Prettier**, **husky** pre-commit | consistent code style |

---
## 6. UI / UX Design Specifications

This section translates the provided wire-frames (see `/ref/Screenshot 2025-06-24 at 7.10.21 PM.png` & `/ref/Screenshot 2025-06-24 at 7.10.37 PM.png`) into concrete implementation guidance.  All class names must be built on top of **Tailwind CSS** with the custom design tokens defined in the shared stylesheet excerpt below (already placed in `src/styles/theme.css`).  The same tokens automatically adapt to **light** and **dark** mode through the `:root` and `.dark` scopes.

### 6.1 Layout Anatomy

| Zone | Description | Key Classes / Tokens |
|------|-------------|-----------------------|
| **Sidebar (60 px)** | Vertical navigation containing **Home**, **Explore**, and a circular **Role Indicator** pinned at the bottom. | `bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border`, `ring-sidebar-ring` |
| **Top Bar** | Full-width search input with placeholder "*What do you want to listen today?*" Search uses subtle border + inner shadow. | `bg-card`, `border-input`, `text-muted-foreground`, `focus:ring-ring` |
| **Filter Pills** | Row of pill buttons: **All**, **Newest**, **Oldest**, **Latest** (rename to *Trending* if desired). | `bg-secondary`, `text-secondary-foreground`, `data-[active=true]:bg-primary` |
| **Music Grid** | Responsive `grid` (`md:grid-cols-3`) of **Album Card** components. | `gap-6 md:gap-8` |
| **Album Card** | Rounded container with play/pause/skip controls overlay; title + artist text underneath. | `rounded-lg`, `bg-card`, `shadow-sm`, `.iconBackground` for icon wrapper |
| **Show More** | Outlined button beneath grid, loads next page. | `border-border`, `hover:bg-muted` |
| **Admin CTA** | In **admin** role only, a floating **"＋ Add Music"** button appears top-right using accent color. | `bg-accent-primary`, `text-accent-foreground`, `shadow-lg` |

### 6.2 Role-Driven UI

1. App wraps pages in `<AuthContextProvider>` which exposes `role` + `isAdmin`.
2. **Conditional rendering**:
   ```tsx
   {isAdmin && <AddMusicButton />}
   {isAdmin && <DeleteSongIcon id={id} />}
   ```
3. Sidebar **Role Indicator** changes color via token: `bg-[--accent-primary]` for *admin*, `bg-[--accent-secondary]` for *user*.

### 6.3 Theming & Design Tokens

The following snippet (already supplied) must stay **global** so that Tailwind can tree-shake utility classes:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* design-token block ↓ */
@theme inline {
  /* ...token definitions from user-provided schema... */
}

/* light & dark root tokens omitted for brevity */

@layer base {
  * {@apply border-border outline-ring/50;}
  body {@apply bg-background text-foreground;}
}

/* utility helpers (scrollbar-hide, ping, pulse, speaking-animation) also included */
```

Guidelines:
• **Never** hard-code hex colours—always use tokens like `bg-primary` or CSS var `--color-primary`.  
• Respect `dark` variant with `class="dark"` on `<html>`; tokens automatically invert.

### 6.4 Interaction & Animation

| Element | Animation | Utility |
|---------|-----------|---------|
| Album Card on hover | slight scale-up & shadow | `transition-transform hover:scale-105` |
| Play/Pause icon | pulsing glow | `animate-pulse` |
| Sidebar Role Indicator | subtle ping every 3 s | `animate-ping` |
| Microphone / call-like components | compound `speaking-animation` | see `.speaking-animation` util |

### 6.5 Responsiveness

• **≤768 px**: Sidebar collapses to bottom nav (`fixed bottom-0 w-full flex justify-around`).  
• Search bar becomes icon-only, expanding on focus.  
• Grid switches to `grid-cols-1`.

### 6.6 Accessibility & A11y

• All interactive icons receive `aria-label`.  
• Maintain `tabindex` order: sidebar → search → filters → grid cards.  
• Ensure colour contrast meets WCAG AA—already handled by token palette.

---
## 7. Monorepo Directory Structure
```
music-app/
├ apps/
│  ├ main-app/             # Container (auth, state, shell)
│  │  ├ public/
│  │  ├ src/
│  │  │  ├ components/
│  │  │  │  ├ Header.tsx
│  │  │  │  ├ LoginForm.tsx
│  │  │  │  └ ProtectedRoute.tsx
│  │  │  ├ hooks/
│  │  │  │  └ useAuth.ts
│  │  │  ├ context/
│  │  │  │  ├ AuthContext.tsx
│  │  │  │  └ SongContext.tsx
│  │  │  ├ styles/
│  │  │  │  └ global.css   # Global styles & theme tokens
│  │  │  └ App.tsx
│  │  └ vite.config.ts       # federation({ remotes })
│  └ music-library/         # Remote (UI only)
│     ├ public/
│     ├ src/
│     │  ├ components/
│     │  │  └ SongLibrary.tsx
│     │  └ utils/
│     │     └ songUtils.ts   # map/filter/reduce helpers
│     

├ package.json               # root scripts + dev deps
└ README.md
```

*Note:* Each `vite.config.ts` declares federation settings; container points to remote URL via `.env.*` file.

### 7.1 Global CSS Implementation

The following CSS must be included in `apps/main-app/src/styles/global.css` to implement the design system:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-manrope: var(--font-manrope);
    --color-sidebar-ring: var(--sidebar-ring);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar: var(--sidebar);
    --color-chart-5: var(--chart-5);
    --color-chart-4: var(--chart-4);
    --color-chart-3: var(--chart-3);
    --color-chart-2: var(--chart-2);
    --color-chart-1: var(--chart-1);
    --color-ring: var(--ring);
    --color-input: var(--input);
    --color-border: var(--border);
    --color-destructive: var(--destructive);
    --color-accent-foreground: var(--accent-foreground);
    --color-accent: var(--accent);
    --color-muted-foreground: var(--muted-foreground);
    --color-muted: var(--muted);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-secondary: var(--secondary);
    --color-primary-foreground: var(--primary-foreground);
    --color-primary: var(--primary);
    --color-popover-foreground: var(--popover-foreground);
    --color-popover: var(--popover);
    --color-card-foreground: var(--card-foreground);
    --color-card: var(--card);
    --radius-sm: calc(var(--radius) - 4px);
    --radius-md: calc(var(--radius) - 2px);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) + 4px);
    --color-accent-primary: var(--accent-primary);
    --color-accent-secondary: var(--accent-secondary);
    --color-accent-foreground: var(--accent-foreground);
    --color-destructive: var(--destructive);
    --color-destructive-foreground: var(--destructive-foreground);
}

:root {
    --radius: 0.625rem;
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
    --accent-primary: oklch(0.72 0.1723 303.07);
    --accent-secondary: oklch(0.56 0.2726 294.48);
    --accent-foreground: oklch(0.21 0.0059 285.89);
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
}

.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
    --accent-primary: oklch(0.66 0.1972 300.41);
    --accent-secondary: oklch(0.56 0.2726 294.48);
    --accent-foreground: oklch(0.99 0 0);
}

@layer base {
    * {
        @apply border-border outline-ring/50;
    }
    body {
        @apply bg-background text-foreground;
    }
}

@layer utilities {
    .text-balance {
        text-wrap: balance;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollbar-hide {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
}

.iconBackground {
    border-radius: var(--radius-rounded-md, 0.375rem);
    border: 0.5px solid #a76ef6;
    background:
        radial-gradient(
            80.86% 125% at 50% 45%,
            var(--background-bg-background-10, rgba(9, 9, 11, 0.08)) 0%,
            var(--background-bg-accent-secondary-100, rgba(135, 49, 255, 0.75))
                100%
        ),
        linear-gradient(
            180deg,
            var(--background-bg-background, rgba(9, 9, 11, 0.5)) 60%,
            var(--background-bg-accent-secondary-100, rgba(135, 49, 255, 0.5))
                100%
        );
}

/* Add these styles to your global CSS or create a new CSS module */
@keyframes pulse {
    0%,
    100% {
        opacity: 0.8;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
}

@keyframes ping {
    75%,
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Speaking animation */
.speaking-animation {
    position: relative;
}

.speaking-animation::before,
.speaking-animation::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
}

.speaking-animation::before {
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border: 2px solid var(--accent-primary);
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.speaking-animation::after {
    width: calc(100% + 40px);
    height: calc(100% + 40px);
    border: 2px solid var(--accent-primary);
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    animation-delay: 0.5s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .call-controls {
        padding: 8px;
    }

    .call-controls button {
        padding: 8px;
    }
}
```

This CSS file must be imported in the main application entry point to apply the theme globally:

```tsx
// In apps/main-app/src/main.tsx or App.tsx
import './styles/global.css';
```

---
## 8. Core Logic Details
### 8.1 Authentication Flow
1. **Login** — User submits email & selects role.  
2. `login()` generates JWT: `jwt.sign({ role, exp }, 'dev-secret')`.  
3. Token stored in `localStorage`; `AuthContext` sets `{ role, isAuthenticated }`.  
4. `useAuth()` hook exposes `isAdmin` boolean for UI guards.

### 8.2 Song State Management
| Action | Reducer Type | Payload |
|--------|--------------|---------|
| `ADD_SONG`    | Adds song (admin only)    | `Song` object |
| `DELETE_SONG` | Removes by `id` (admin)  | `songId` |
| `SET_SONGS`   | Bulk load (on init)      | `Song[]` |

Songs are persisted to **localStorage** for demo persistence.

### 8.3 Filtering / Sorting / Grouping
```ts
const filtered = songs
  .filter(s => s.artist.includes(search))
  .sort((a, b) => a.title.localeCompare(b.title));

const grouped = filtered.reduce<Record<string, Song[]>>((acc, song) => {
  const key = song.album;
  acc[key] = acc[key] ? [...acc[key], song] : [song];
  return acc;
}, {});
```
*The remote exports pre-built utility functions for reuse in container tests.*

### 8.4 Module Federation Settings (simplified)
```ts
// apps/music-library/vite.config.ts
federation({
  name: 'music_library',
  filename: 'remoteEntry.js',
  exposes: {
    './SongLibrary': './src/components/SongLibrary.tsx'
  },
  shared: ['react', 'react-dom']
});

// apps/main-app/vite.config.ts
federation({
  name: 'main_app',
  remotes: {
    music_library: `${process.env.VITE_MUSIC_REMOTE_URL}/assets/remoteEntry.js`
  },
  shared: ['react', 'react-dom']
});
```

---
## 9. CI/CD & Quality Gates
1. **Pre-commit** → `husky` runs `eslint --fix` & `vitest --watch=false`.  
2. **GitHub Actions** workflow:  
   • Node 20 → Install deps → `pnpm -r run test`  
   • Build each app → Upload artifact  
   • Deploy to Netlify via PAT.
3. Pull-request badge shows lint/test status.

---
## 10. Deliverables for Review
- **GitHub repository** with clean commit history and PR descriptions.  
- **Live Demo Links**  
  • Main App (container)  
  • Music Library (remote)  
- **README.md** covering: local setup (`pnpm i && pnpm dev`), deployment URLs, demo credentials (`admin / user`).  
- **Architecture diagram** & explanation of Module Federation + RBAC.

---
## 11. Future Enhancements (Out of Scope)
*Playlists, audio player, user preferences, backend integration.*

---
*End of PRD* 