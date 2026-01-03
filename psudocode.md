1. Prepare Your Project Dependencies [DONE]

Install the necessary libraries via npm or yarn for dragging, resizing (optional), Markdown rendering, and panning/zooming.
For draggable nodes: Install react-draggable (docs: https://www.npmjs.com/package/react-draggable).
For optional resizing with dragging: Install react-rnd (docs: https://www.npmjs.com/package/react-rnd).
For rendering Markdown content in nodes: Install react-markdown (docs: https://www.npmjs.com/package/react-markdown).
For panning and zooming the oversized board: Install react-zoom-pan-pinch (docs: https://www.npmjs.com/package/react-zoom-pan-pinch). This library wraps your content to enable smooth click-drag panning (moving the view) and pinch/scroll zooming, treating the large board as a fixed "world" while only the visible portion shifts.

Run the install commands in your terminal (e.g., npm install react-draggable react-rnd react-markdown react-zoom-pan-pinch).

2. Set Up the Canvas Container [DONE]

In your Canvas component, create an outer wrapper <div> that fills the available screen space (e.g., 100% width/height of its parent <Container>), with overflow hidden to clip the view.
Inside that, wrap an inner content <div> with your fixed board size (e.g., width: 5000px; height: 5000px; position: relative;).
Use the panning library from Step 1 to wrap the inner content <div>, configuring it for panning (enable panning mode) and optional zooming (e.g., min/max scale, wheel zoom).
Style the inner content <div> with your grid background using CSS linear gradients, and apply your dark mode colors.
This setup ensures the board is always 5000x5000px (or whatever fixed size you choose), nodes position absolutely within it, and panning lets users drag to explore without changing coordinates.
For panning/zooming configuration details, refer to the library docs linked in Step 1.

3. Manage Nodes with React State [DONE]

In the Canvas component, use React's useState hook to store an array of node objects.
Each node object should include properties like: id (unique), x/y coordinates (for position), width/height (for size), content (Markdown string), and type (e.g., note, list, image).
Use useEffect to load initial nodes from your DB on component mount (see Step 8 for DB integration).
When updating state (e.g., after dragging), use the setter function to create a new array with updated node positions.
For state management basics, refer to React hooks docs: https://react.dev/reference/react/useState and https://react.dev/reference/react/useEffect.

4. Create the Node Component [DONE]

Make a new Node component (e.g., in /Components/Node.tsx).
This component receives a single node's data as props (e.g., id, x, y, content).
Render the node's content inside a <div> with absolute positioning based on x/y props.
For different node types:
Notes/paragraphs/lists: Use the Markdown library to parse and display the content.
Images: Use Next.js's <Image> component with the src from node data.

Style the node with your retro theme: pixelated borders, shadows, dark backgrounds, and resizable if using the optional library.
Add event handlers for editing content (e.g., make text editable on click).
For Markdown specifics, check the library's usage guide linked in Step 1.

5. Render Nodes in the Canvas [DONE]

In the Canvas component, map over your state array to render each <Node> component.
Pass the node's data as props to each instance.
Ensure the canvas <div> wraps all these rendered nodes.
This creates the visual board—nodes will appear at their saved positions.

6. Add Draggability (and Optional Resizability) [DONE]

Wrap each node's content <div> in the dragging library's component (e.g., <Draggable> from react-draggable).
Configure it to:
Bound movement to the fixed board size (e.g., { top: 0, left: 0, right: 5000, bottom: 5000 }) to prevent nodes from dragging off the edges.
Snap to a grid (e.g., 20px steps to match your background grid).
Call a callback on drag stop to update the node's x/y in state.

If adding resizing, switch to the resizable library and configure similar bounds/snapping, updating width/height in state on resize end.
For touch/mobile support, the libraries handle it out of the box—test on devices.
Refer to the libraries' props and examples in their docs (linked in Step 1) for configuration options.
Use the panning library's context to convert screen coordinates to board ("world") coordinates in the drag callback, ensuring positions are saved absolutely relative to the 5000x5000 board (docs for context/transform access: https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/docs-hooks--page).

7. Handle Adding New Nodes and new Folders / Files [DONE]

From your hotbar or sidebar (e.g., on button click in <HotBar> or <SideBar>), trigger a function to add a new node to the canvas state.
Generate a unique ID (e.g., using crypto.randomUUID() or a library like uuid—install if needed: https://www.npmjs.com/package/uuid).
Set default position (e.g., center of board: x=2500, y=2500) or based on current viewport (query the panning library's transform state for offsets—see its docs).
Pass the add function as a prop from Canvas to parent components if needed, or use context for global state (React context docs: https://react.dev/reference/react/createContext).

8. Polish front end [HALF-DONE]

Add undo / redo functionality to node page. ~~Make a folder open if its not already when a new node is added to it.~~ ~~Fix bug where if there are no folders, a new one cant be created. (this happens because after a user deletes them all, it wants to add a new folder to a folder that no longer exists. Also there is not a method to make a top-level folder if none are made, it needs to link a top level to a users custom id).~~ Also fix the center canvas button so either it centers canvas to its initial load spot, or the initial load spot is set to the center of the canvas. ~~Fix bug where if the node list is too long, and you scroll down AND open the three dots menu, the menu appears very low or off screen low.~~ fix the bug where ehen your editing a node and click to drag text, the first time you can, but afterwards it moves the node again and the e.stoppropogation stops working.

9. Integrate Saving and Loading with Your Database [HALF-DONE]

For loading: In useEffect of Canvas, make a fetch request to your API endpoint to get nodes for the current page (use a page ID from URL params or state).
Parse the JSON response and set it to your nodes state—the absolute x/y pixels will place nodes correctly on the board, even off-screen.

For saving: On drag/resize end, or on a "save" button click, serialize the nodes array to JSON and send a POST/PUT request to your API.
Use debounce to avoid frequent saves during dragging (install lodash: https://www.npmjs.com/package/lodash, docs for debounce: https://lodash.com/docs/4.17.15#debounce).

Handle errors (e.g., show a toast notification).
For fetch API basics: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch.
If using a specific DB service, follow their JS client docs (e.g., Supabase: https://supabase.com/docs/guides/getting-started, Firebase: https://firebase.google.com/docs/web/setup).

10. Enhance with Additional Features

You've already added the panning library in Step 2—test it by dragging the mouse to pan the board view.
For zooming: Enable it in the library config to let users zoom in/out (e.g., via mouse wheel), which scales the view without resizing the actual board or nodes.
Persist view state if desired (e.g., save current pan/zoom offsets to DB or localStorage on unload, reload on mount—library provides ways to get/set transform).
Add keyboard shortcuts (e.g., delete node): Use react-hotkeys-hook (docs: https://www.npmjs.com/package/react-hotkeys-hook).
Responsiveness: The outer wrapper auto-adjusts to screen size, but the inner board stays fixed; test on different monitors to confirm positions consistency.
Accessibility: Add ARIA roles/labels to nodes (docs: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

11. Test and Iterate

Run the app and add nodes at various positions on the large board.
Pan around to view off-screen areas, drag nodes, save/reload—verify positions are identical across sessions/devices.
If the board feels too large (e.g., perf lag on low-end devices), reduce to 3000x3000px or dynamically expand only as needed (but stick to fixed for consistency).
Debug in dev tools: Inspect the inner <div> to confirm its fixed size and node positions.


Use https://reactflow.dev/learn/concepts/the-viewport