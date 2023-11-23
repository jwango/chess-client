# [TEC-01] Choose React as Web App Framework

**Author(s)**: Josh Wang  
**Status**: Retrospective Documentation  
**Last updated**: 2023-04-08  

Users today expect web applications to function like a desktop application, but in their browser. With this comes expectations of a cohesive design and a consistent user experience. Such experiences are code-heavy, relying far more on JavaScript and the manipulation of DOM elements than would be expected with a traditional static web page.

## Context

### Primers and pre-requisites

Most web frameworks support a number of basic functions:
1. Component-based units of code that support division of responsibility and code re-use
2. Rendering dynamic or conditional content based on user input

Concepts
* Progress Web App - see [web.dev][1]
* i18n (internationalization) - see [i18next][2]
* a11y (accessibility) - see [WCAG][3]

## Requirements

Constraints
* Progressive Web App
* i18n localization
* a11y first

Criteria
* Community support
* Familiarity
* Flexibility
* Performance
* Route management
* Standard library
* State management
* Testing frameworks

A small team of developers wants to quickly create a web application with basic functionality, minimal cruft, and minimal ceremony. A popular and relevant web framework will allow the developers to worry less about dependency on a dying library, as well as build their own proficiency in marketable skills.

## Options

| Framework | Community Support       | Familiarity | Flexibility | Performance | Route Mgmt. | Standard Lib      | State Mgmt. | Testing Frameworks             |
| --------- | ----------------------- | ----------- | ----------- | ----------- | ----------- | ----------------- | ----------- |------------------------------- |
| React     | Good, hot               | High        | High        | Medium      | Good        | Opt-In            | Good        | 1st class with Testing Library |
| Angular   | Good, losing popularity | High        | Low         | Medium      | Good        | Large, Opinonated | Medium      | 1st class with Testing Library |

This list is created with frameworks that I personally have experience with. Technically I have worked with Vue though it didn't leave many lasting impressions.
All options shown here meet the constraints of supporting a Progressive Web App, i18n localization, and a11y first.

## Decision

The team will use React as the base web application framework.

### Reasoning

React is chosen over Angular due to 1) it's community support and retention (see State of JS 2022), and 2) its flexibility. React is more bare-bones and opt-in with its feature set, meaning that developers can make the framework fit their use case. This stands in contrast with Angular which has more rigidity and requires more setup while providing really powerful feature sets in its standard library.

React is backed by a large company Meta / Facebook, which almost guarantees it a more stable shelf-life than other frameworks.

### Consequences

State clearly the consequences of this decision and any forseeable issues down the line.
Each issue should detail the severity of the issue, the parties affected, and the projected time horizon of the issue.

Consequences
1. Codebase is coupled to React framework, so new contributors will need to know or learn React.
2. React is always updating, and if you aren't up to date, then you are behind on security. In this way developers are beholden to new React features. This is true for about all modern JS libraries.
3. Team will need to figure out a lot of the tooling that other frameworks like Angular give you for free. Opt-in and options means that more decisions have to be made. Examples include a module builder, a routing library, a state management library, a component library, and so on. There is no official way of doing things, meaning the team must come to an agreement about their own best practices.

Issues
1. Base React bundle is not small. This is primarily a concern for at-scale deployment (whenever that happens), but perhaps it can be addressed with minification, compression, lazy-loading, and Suspense.

[1]: https://web.dev/progressive-web-apps/
[2]: https://www.i18next.com/
[3]: https://www.w3.org/WAI/standards-guidelines/wcag/