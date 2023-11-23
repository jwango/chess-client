# [TEC-03] Choose Webpack as Module Bundler

**Author(s)**: Josh Wang  
**Status**: Retrospective Documentation  
**Last updated**: 2023-04-09  

Web applications are limited by the runtime environment of their host devices. Browsers run different (read: possibly outdated) versions of JavaScript with varying levels of memory and CPU capacity. A module bundler enables programmers to code in a more development-friendly environment (super fast computers with Typescript targeting ECMAScript Next), while transpiling their code to run as intended in the end user's environment (3G speeds on an old laptop with ECMAScript 2015).

## Context

### Primers and pre-requisites

* [ECMAScript (ES)][1] - a standard that JavaScript implements, think of it as the roadmap for JavaScript
* [TypeScript (TS)][2] - "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale."
* [Mobile web performance][3] by [Estelle Weyl](https://estelle.github.io/)
* [Polyfill][4] - bridges the gap between source code and the actual JS code running on any given browser target
* Source Maps - the ability to reference source code from compiled code (breakpoints, stack traces)
* Cache Busting - browsers cache static resources to avoid constantly refetches...but when code changes how does the browser know? The cache needs "busting" to mark those static resources as stale.
* Minification - the process of simplifying compiled code as much as possible (change variable names, remove white spaces)
* Compression - the process of compressing the compiled code into a smaller format so that the server doesn't have to do so
* browserslist - the list of user agents / browsers the project intends to support; often an option in node `package.json`

### Details

Provide relevant details and context that help frame the problem and its importance.   

## Requirements

Constraints
1. TypeScript support
2. Polyfill support
3. Bundle into single (or main / vendor) js bundles, single css bundle
4. Bundle versioning for "cache busting"
5. Minification
6. Compression

Criteria
1. Compile time
2. Source map support
3. Watch functionality (hot reloads)
4. Maturity
5. Active

Developers require a module bundler to transpile, minify, and compress their TypeScript React code and Tailwind CSS into bundles for production deployment that can be run on the target browserslist.

## Options

| Module Bundler | [Compile time][6] | [Bundling][7] | Source Maps   | Watch / HMR         | Maturity      | Active |
| -------------- | ----------------- | ------------- | ------------- | ------------------- | ------------- | ------ |
| Webpack 5      | Fast              | 6.5 / 8       | Comprehensive | Yes                 | Mature (2012) | Yes    |
| Rollup         | Slow              | 6.0 / 8       | Yes           | Via Web Dev Server  | Mature (2015) | Yes    |
| Browserify     | ?                 | 3.5 / 8       | Yes           | Plugin              | Mature (2011) | No     |

## Decision

Webpack 5 is chosen as the module bundler for the project.

### Reasoning

Webpack 5 is an actively developed module bundler with an ecosystem to support code splitting, source maps, minification, compression, babel transpilation (ES / TS), polyfills, and hot module reloading. Webpack is battle tested and used by default for just about all [modern React frameworks / bootstrappers][5] (NextJS, Create React App, Gatsby).

### Consequences

Consequences
1. Using Webpack and not a higher level framework like NextJS or Create React App means that the team will manage webpack builds manually. The quality of builds is only as good as the team knows how to make it.

Issues
- No major forseeable issues.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview
[2]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.HTML
[3]: https://estelle.github.io/viewsource/#slide16
[4]: https://developer.mozilla.org/en-US/docs/Glossary/Polyfill
[5]: https://legacy.reactjs.org/docs/code-splitting.html#bundling
[6]: https://blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack/
[7]: https://bundlers.tooling.report/code-splitting/