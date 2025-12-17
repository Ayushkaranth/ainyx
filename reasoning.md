# Engineering Decisions & Trade-offs

## 1. Architecture & State Management
I chose to separate the application state into three distinct layers to ensure scalability and performance:

* **Server State (TanStack Query):** Handles the async fetching of `Apps` and `Graph` data. This provides out-of-the-box caching, loading states, and error handling. It treats the "backend" as the source of truth, so app switching correctly re-fetches data.
* **UI State (Zustand):** Manages global client-side preferences that need to be accessed across the component tree, specifically `selectedAppId`, `selectedNodeId`, and the mobile drawer visibility. This prevents prop-drilling through the Layout components.
* **Canvas State (ReactFlow):** Node positions and connections are managed locally within the Flow component's internal model.

## 2. Deviation from Text Requirements (Layout)
The assignment text specified: *"Right panel split into: App selector / Apps list"*.
However, the provided high-fidelity screenshot clearly showed the **App Selector as a floating panel on the left**.

* **Decision:** I chose to implement the **Left Floating Panel** design to match the visual mockups exactly. This separation allows the Right Panel to be dedicated entirely to the "Node Inspector," creating a less cluttered and more focused editing experience.

## 3. Node Inspector Synchronization
Synchronizing a high-frequency input (like a slider) with a complex graph model can cause performance stutters if every "tick" triggers a full re-render of the graph.

* **Solution:** I implemented a **Local State Buffer** in the `NodeInspector`. The slider updates a local state variable immediately (for 60fps smoothness), and simultaneously calls the `updateNodeData` function to sync with the graph model. This ensures the UI remains responsive even if the graph grows large.

## 4. Strict TypeScript Implementation
I adhered to the `strict: true` requirement by avoiding `any` types completely.
* **Typed Nodes:** I defined a specific `AppNodeData` interface that extends `Record<string, unknown>`.
* **Typed Props:** All components, including the custom `ServiceNode` and generic UI components, define explicit prop interfaces.
* **Result:** This ensures type safety for properties like `data.traffic` and `data.status` throughout the application.

## 5. Known Limitations (Mock Data)
Since the requirements specified a mock API with no backend persistence:
* **Persistence:** Changes made to nodes (like renaming or moving) are client-side only. Switching apps and coming back will re-fetch the original "Server" data, resetting changes. This is the expected behavior for a read-only API integration.
* **Graph Layout:** The mock nodes use static coordinates. In a production version, I would implement an auto-layout library (like `dagre` or `elkjs`) to calculate node positions dynamically based on the topology.