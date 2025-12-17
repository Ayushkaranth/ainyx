# Ainyx Frontend Intern Task - App Graph Builder

A responsive, interactive graph visualization dashboard built for the Ainyx Solutions frontend intern assessment. This project implements a "Service Node" editor with real-time state synchronization, custom ReactFlow nodes, and a responsive mobile drawer layout.

## Quick Start

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Deployed Url
*https://ainyx.vercel.app/

### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ayushkaranth/ainyx.git
    cd ainyx-final
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Run Linting**
    ```bash
    npm run lint
    ```

## 🛠 Tech Stack
* **Framework:** React + Vite
* **Language:** TypeScript (Strict Mode)
* **State Management:** Zustand (Client UI State)
* **Server State:** TanStack Query (Mock API Data)
* **Visualization:** @xyflow/react (ReactFlow)
* **UI Components:** shadcn/ui + Tailwind CSS
* **Icons:** Lucide React

## Key Features
* **Custom Node Architecture:** Replicates the detailed "Service Card" design with status indicators, traffic bars, and tabbed metrics.
* **Real-time State Sync:** Editing the "Traffic" slider in the Inspector instantly updates the Node on the canvas via a local-state buffer strategy.
* **Mobile Responsiveness:** The Right Panel automatically converts to a slide-over Drawer on small screens.
* **Mock API Layer:** Simulates network latency and data fetching using TanStack Query.
* **Interactive Graph:** Supports Drag-and-Drop, Zoom/Pan, Node Selection, and Edge Creation/Deletion.

## Shortcuts
* **Shift + F:** Fit View to Screen
* **Cmd/Ctrl + B:** Toggle Left App Panel
* **Backspace/Delete:** Delete selected node or edge
