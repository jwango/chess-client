# [UXP-02] Render Panel Pages as Router Outlet

**Author(s)**: Josh Wang  
**Status**: Retrospective Documentation  
**Last updated**: 2023-04-09  

Users view web apps on a number of different devices, which have varying levels of screen real-estate: mobile, tablet, desktop. The web app should allow users to make the most out of their screen no matter the screen size by using side panels.

## Context

### Primers and pre-requisites

Concepts
* media queries and break points
* router outlets   

## Requirements

Constraints
1. Same code for different screen sizes

Criteria
1. Effort
2. Complexity
3. Deep link - whether or not the side panel can be controlled by the URL

The chosen technique will allow the code to be written once and applied for mobile, tablet, and desktop views. The tablet and desktop views should make better use of the extra screen space by incorporating panels.

## Options

| Technique       | Effort | Complexity | Deep link |
| --------------- | ------ | ---------- | --------- |
| Router Outlet   | Medium | Medium     | Yes       |
| Child Component | Low    | Medium     | No        |

Both techniques will make use of breakpoints to support mobile, tablet, and desktop views.
The router outlet will require extra code to wire-up the panel route and extra code in the base page to render the outlet.

```
// router.tsx
createBrowserRouter([
  ...,
  {
    path: 'planner/beds',
    element: <GardenPage />,
    children: [
      {
        path: ':bedId',
        element: <BedDetailPage />
      },
      {
        path: ':bedId/sections/:bedSectionId',
        element: <BedSectionDetailPage />
      }
    ]
  }
])

// base-page.tsx
const BasePage = () => {
  return <div>
    My base content
    <Panel><Outlet /></Panel>
  </div>  
}
```

## Decision

Router outlet was chosen over an embedded child component.

### Reasoning

The complexity between the two options is relatively the same, but router outlet supports deep linking which allows users to navigate using browser history (back button), which is nice on mobile devices.

### Consequences

Consequences
1. Maintenance cost is slightly more to support the routing. If a route ever changes then not only does the outlet rendering code need to change, but the route definitions also need to change.

Issues
1. If react router can no longer be used, then the router outlet rendering must be completely re-worked. Fortunately the difference between rendering an outlet and opening a child component is do-able: navigation is replaced with state management for deciding which side panel to open.