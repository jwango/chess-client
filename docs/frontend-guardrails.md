# Frontend Guardrails

This document serves to provide guidance for best practices with the intent of deterring one from veering into dangerous territory.

## Typescript Usage

Use Typescript first where-ever possible. This will provide type safety for static compilation, as well as ensure that our intentions for our code is made more clear.

## Modular File Layout

Code is laid out by module instead of by function. When code is laid out by module, each module should be thought of as an independent unit of code that only uses the publicly available API of other modules. This provides encapsulation and buffers consumers from rapid changes in implementation. Modules also allow developers to easily keep their dependencies in check and avoid a tangle of imports that may reach deep into a module.

### Guidelines
1. Use a "barrel file" index.ts at the root of each module that exports its public APIs
   ```
   // example file layout
   src
   |-- shared
   |-- module-a
       |-- a-implementation.ts
       |-- index.ts
   |-- module-b
       |-- b.implementation.ts
       |-- index.ts
   ```
2. Only import from the "barrel file" of other modules
   ```
   /** a-implementation.ts */
   // YES
   import { aType } from '../module-b';

   // NO
   import { aType } from '../module-b/implementation.ts;
   ```

3. Extract circular dependencies into a common module - either module a, module b, or shared module

### Adding a new module
1. **Consider** if a new module is necessary, or if the code can belong to an existing module. Good candidates are isolated groups of code that function as independent as possible, and can be loaded at different times (which improves bootstrap performance).
2. **Create new folder** under `src/modules`
3. **Create new barrel file** `index.ts` at the root of your new module folder
4. **Register new alias** for your module under `tsconfig.json` at `compilerOptions.paths` so that it can be imported with an absolute import, as opposed to a relative import; pattern is to name the alias as `@module-name`
5. Similarily **provide the mapping for the alias** to the barrel file in `webpack.base.config.js` at `resolve.alias`
6. Make sure to manage your public API via the barrel file, and to **import from this module only using the new alias**

```
// File structure
src
|-- modules
    |-- new-module-name
        |-- index.ts

// tsconfig.json
{
  ...,
  compilerOptions: {
    ...,
    paths: [
      ...,
      "@new-module-name": ["src/modules/new-module-name/index.ts]
    ]
  }
}

// webpack.base.config.js
{
  ...,
  resolve: {
    alias: {
      ...,
      "@new-module-name": path.resolve(__dirname, "./src/modules/new-module-name/index.ts")
    },
    ...
  }
}
```

## Layered Architecture

Think of the code within each module as layers, with the outside facing the user and the inside facing our internal services.

```
1. User Interface & Rendering
|-> 1A. Presentation: Building blocks (general purpose components)
|-> 1B. Business logic: Pure functions and effects
    |-> 1B.i.  API layer (handles communication outside of the web app)
```

Examples:
* (1) `edit-bed.form.tsx` renders an edit form for the bed, but it doesn't interact with the API layer
* (1A) `Toast.tsx` is a general purpose component allowing any component to easily show a toast
* (1B) `bed-detail.page.tsx` handles business logic and interaction with the API layer
* (1Bi) `planner/lib/api.ts` and `planner/lib.models.ts` handles the API definition and the interaction with the storage service

Lines are not always clear - so treat this as guideline and not as a hard-and-fast rule. The goal here is not clear boundaries, but rather code that is easy to test, reason about, and build in isolation. This is supposed to support development, not hamper it.

## Component Design

Think critically about the *responsibility* of a component. What is its purpose? What are its inputs and what are its outputs? Can it be tested in isolation with unit tests and trusted to just do its job well?

Related concepts
* Single Responsibility Principle (https://en.wikipedia.org/wiki/Single-responsibility_principle)
* Presentation vs. Container / Dumb vs. Smart Components (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* MVC / VMMC: Model-View-Controller, View Model-Model-Controller

## Styling

Use tailwind css where possible, which allows for combining both markup and styling in the same file (tsx / jsx). Additionally tailwind css classes almost always have the same specificity, which means there is little jockeying for specificity.

If tailwind css proves not the be sufficient or otherwise unwieldy (say over 10 or 12 classes), then opt for css modules next.
See https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/ for a basic example.

## Security

Familiarize yourself with the most common attack vectors, as detailed by OWASP:
1. XSS - [Cross-Site Scripting][xss]; React has some decent default guards around this, but there exist areas to [watch out for](https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected)
2. Security Misconfiguration: never trust client code, never embed API keys or secrets in client code, never persist authentication tokens

[xss]: https://cwe.mitre.org/data/definitions/79.html