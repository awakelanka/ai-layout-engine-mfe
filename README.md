# AI-Powered Layout Engine (Micro-Frontend)

This repository serves as a standalone **React Micro-Frontend (MFE)** specifically engineered to simulate an AI layout engine. It dynamically reconfigures navigation schemas, sidebar visibility, and responsive content grids based on simulated real-time user context and heatmap behaviors.

## Architecture & Tech Stack
- Frontend: `React 19` + `Vite`
- State Management: `Zustand` (for highly performant zero-dependency context switching)
- Styling: `TailwindCSS v4`
- Communication Layer: Secure `window.postMessage` API for parent-child bidirectional data flow.

## Integration Strategy

Because this application runs on `Vite` (dev port `3001` or any deployed Vercel domain), it integrates perfectly into the parent **Bun** application without bulky Module Federation tools. 

Instead of compiling them together, the parent app mounts this engine via an `<iframe>` inside a dedicated view (e.g., `/experiment/:id`).

### Step 1: Run this Micro-Frontend
Start this application locally:
```bash
bun install
bun run dev
# MFE runs on http://localhost:3001
```

### Step 2: Communication from the Parent (Bun App)
The Layout Engine natively listens for `UPDATE_CONTEXT` messaging events to mutate its layout purely via props dynamically passed from the Bun host.

```tsx
// Example from the Parent App:
const iframe = document.getElementById('layout-engine-mfe');
iframe.contentWindow.postMessage({
   type: 'UPDATE_CONTEXT',
   payload: 'FOCUS' // 'FOCUS' | 'DISCOVERY' | 'DASHBOARD'
}, '*'); // (Replace '*' with strict origins in production)
```

## How It Works Visually
By clicking the "Simulate Heatmap" or shifting Contexts (Focus Mode vs Dashboard Mode), the `Zustand` store forcefully overrides CSS flex/grid definitions. Since Tailwind styles apply CSS transition engines dynamically, the entire application interface fluidly morphs across the DOM instead of harshly jumping like a standard React re-render.
