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

## 🌟 What is the Adaptive Dynamic Layout?

The AI-Powered Layout Engine introduces a dynamic UI that fluidly adapts to how users interact with the application. Instead of static, fixed grids, the interface morphs organically—optimizing the layout based on simulated behavior (such as heatmaps) and specific context modes.

**Simply put:** The screen reorganizes itself smoothly to show you exactly what you need, exactly when you need it.

### Why is this useful?
In traditional web applications, changing views or switching tasks often forces a jarring, instantaneous page reload or a rigid re-render. This layout engine solves that by treating UI elements as flexible components that gently glide into their new arrangements. This creates a premium, engaging experience that minimizes cognitive load and keeps your focus undisturbed.

### How it works conceptually
1. **State Management:** When a layout shift is triggered (like clicking a button), our **Zustand** state manager instantly updates the current application mode.
2. **Style Recalculation:** Based on this state, **Tailwind CSS** intelligently recalculates CSS flexbox and grid rules on the fly.
3. **Fluid Animation:** Because the CSS transitions are dynamically applied, the browser fluidly shapes the DOM elements directly to their new boundaries. The result is a seamless, liquid transition.

### Simple Real-World Examples
Where can product teams and developers apply this pattern?
- **SaaS Dashboards:** A workspace that automatically collapses navigation menus and expands the main editor when a user enters "Focus Mode" to write or design.
- **E-commerce Platforms:** A product page that subtly resizes and prioritizes the "Add to Cart" button or prominent product features based on a user's simulated browsing heatmap.
- **Productivity Apps:** An application that brings high-priority panels to the center and minimizes secondary sidebars when you need to quickly review important analytics.

## 🚀 How to Use the Experiment

1. **Open the Experiment:** Load the application in your browser.
2. **Shift Contexts:** Click between context toggles like **Focus Mode** and **Dashboard Mode**. Observe how the overall layout transforms to prioritize different information panes.
3. **Simulate Heatmap:** Click the **"Simulate Heatmap"** button to trigger activity-based layout alterations.
4. **Observe the Magic:** Watch as the application interface fluidly reorganizes itself without a single page reload or jarring flash. The layout dynamically adjusts the weights, sizes, and positioning of components in real-time.

---

## 💬 Intro Modal Content

*This modal should be displayed to the user right before they interact with the experiment for the first time.*

**Title:** Welcome to the Adaptive Layout Engine ✨

**Body:**
> "This experiment demonstrates how modern interfaces can feel alive and responsive to your needs. Instead of rigid, static grids, you'll experience a UI that fluidly morphs and reorganizes itself based on context. 
> 
> **What to try:**
> - Toggle between **Focus Mode** and **Dashboard Mode** to see how the layout shifts to prioritize specific tasks.
> - Click **Simulate Heatmap** to watch the interface artificially adapt to simulated user attention points.
>
> Notice how everything glides smoothly into place without abrupt jumps. Go ahead and start exploring!"
