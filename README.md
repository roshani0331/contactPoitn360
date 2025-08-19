# ContactPoint360 — React Big Calendar with Bar Graph

A fast, cross-platform **React + TypeScript** app that renders a **React Big Calendar** (Month/Week/Day), highlights dates that have data, and on click shows a **bar chart** for that date. Built with **Vite**, state managed via **Redux Toolkit**, dates handled by **date-fns v3**, and UI powered by **MUI** (Dialog + Snackbar) and **Recharts**.

> **Assignment coverage**
>
> - Proper README.md  
> - Proper `package.json` & dependencies  
> - Meaningful project/app name  
> - Integrate React Big Calendar (date/week/month)  
> - Dummy JSON-like data with random dates  
> - Display date-wise data in calendar  
> - Highlight dates that have data + highlight selected date  
> - Click → popup with a bar graph for that date  
> - Warning “No data found…” when a date has no data  
> - Runs on macOS / Linux / Windows  
> - Uses **Redux**

---

## Table of Contents

1. [Tech Stack](#tech-stack)  
2. [Architecture & Design](#architecture--design)  
3. [Data Model](#data-model)  
4. [Project Structure](#project-structure)  
5. [Getting Started](#getting-started)  
6. [Available Scripts](#available-scripts)  
7. [How It Works (User Flow)](#how-it-works-user-flow)  
8. [Implementation Notes](#implementation-notes)  
9. [Accessibility & UX](#accessibility--ux)  
10. [Performance Considerations](#performance-considerations)  
11. [Troubleshooting](#troubleshooting)  
12. [Commit Policy for the Assignment](#commit-policy-for-the-assignment)  
13. [Future Enhancements](#future-enhancements)  
14. [License](#license)

---

## Tech Stack

- **Runtime/Build**: Node 18 or 20, Vite 5+
- **Language**: TypeScript
- **View**: React 18
- **State**: Redux Toolkit + React-Redux
- **Calendar**: `react-big-calendar` with `date-fns` localizer
- **Charts**: `recharts`
- **UI**: `@mui/material` + `@mui/icons-material`
- **Styling Engine**: Emotion (`@emotion/react` + `@emotion/styled`)
- **Dates**: `date-fns@^3`

---

## Architecture & Design

**Goals**: clean separation of concerns, deterministic state, and easy swap from dummy data to API.

- **Redux slices**
  - `dataSlice`  
    - Holds the generated dummy dataset (a map keyed by `dd-MM-yyyy`).  
    - Exposes memoized selectors:
      - `selectEvents` → Converts daily data to **all-day calendar events** (one per date).
      - `selectDayDataFactory(key)` → Returns `[ { name, value }, ... ]` for the selected date.
  - `uiSlice`  
    - Manages `selectedDateKey`, `dialogOpen`, and a `snackbar` message.
- **Components**
  - `BigCalendarView` — Calendar rendering, day highlighting, and click handling.
  - `DataDialog` — MUI Dialog + Responsive **Recharts** BarChart for the selected date.
  - `SnackbarAlert` — MUI Snackbar to warn when no data exists for a clicked date.
- **Patterns & Practices**
  - **Selectors** keep components lean and performant.
  - **Type-only imports** (e.g., `import type { PayloadAction }`) prevent ESM runtime issues.
  - **date-fns localizer** for React Big Calendar with `enUS` locale.

---

## Data Model

Random data is generated for the last ~45 days with ~55% coverage to exercise both “has data” and “no data” flows.

```ts
// Key format used throughout: 'dd-MM-yyyy' (e.g., "01-09-2025")

type DayData = { name: string; value: number };

type DataMap = Record<string, DayData[]>;
// Example:
// {
//   "01-09-2025": [{ name: "user_1", value: 3 }, { name: "user_2", value: 7 }],
//   "03-09-2025": [{ name: "user_1", value: 1 }, ... ],
//   ...
// }
```

# Getting Started

## Prerequisites
Node.js: v18 LTS or v20 LTS

## Clone & Install
- git clone https://github.com/roshani0331/contactPoitn360.gitcontactpoint360-big-calendar
- cd contactpoint360-big-calendar
- npm install

## Run Dev Server
npm run dev

## How It Works (User Flow)

- **Calendar:** each date with data becomes an all-day event. Title shows total count (e.g., “14 records”).
- **Highlighting:**
  - Dates that have data get a subtle tint (`.has-data`).
  - The selected date gets a stronger outline (`.selected`).
- **Interactions:**
  - Click a date:
    - If data exists → Dialog opens with a bar chart (per-user values).
    - If no data → a Snackbar warns: “No data found for the selected date.”
  - Click an event on a date with data → also opens the Dialog.

## Accessibility & UX

- Dialog: focus-trapped, ESC to close, labeled title.
- Snackbar: uses MUI Alert (announced to screen readers).
- Keyboard: React Big Calendar supports keyboard navigation; Dialog close button is keyboard accessible.
- Contrast: Selected date uses a clear outline; “has-data” uses a gentle tint.

## Performance Considerations

- Memoized selectors avoid recomputing events on each render.
- Responsive chart only mounts/updates when dialog opens & selected date changes.
- Minimal CSS overrides to keep layout fast.
- Vite enables fast HMR and tree-shaken production bundles.

## Commit 
- git commit -m "Initial Commit"
- git commit -m "Adding functionality"
- git commit -m "Update Readme."
- git commit -m "Fixing build error while deploying."

## License

MIT © ContactPoint360
