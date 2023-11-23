# [UXP-01] Use Native HTML Form Elements First

**Author(s)**: Josh Wang  
**Status**: Retrospective Documentation  
**Last updated**: 2023-04-09  

Most if not all web applications need a way to handle user input so that they can interact with the application and create or update their data. The best practice is to create forms that handle user input and submit them. While this sounds straightforward, developers take many different approaches, often making trade-offs between native functionality / accessibility and customized user experiences.

## Context

### Primers and pre-requisites

Concepts
* a11y (accessibility) - see [WCAG][1]

## Requirements

Constraints
* supports mobile experience

Criteria
* Accessibility
* Extensibility
* Mobile Support Out-of-the-box
* Cost
* Effort

## Options

| Form Building                      | Accessibility | Extensibility | Mobile OOTB    | Cost | Effort |
| ---------------------------------- | ------------- | ------------- | -------------- | ---- | ------ |
| New components, Native Elements    | Built-in      | 3 / 5         | 5 / 5          | $    | Medium |
| New Components, no Native Elements | Manually add  | 5 / 5         | 4 / 5          | $    | High   |
| MUI, 3rd Party Library             | Built-in      | 3 / 5         | 5 / 5          | $$   | Low    |

## Decision

Native form elements should be used first where possible in order to retain mobile usability and accessibility out of the box. If the native form elements cannot be customized to meet the design needs (which happens sometimes), then one can reach for building custom components without the native elements. But care must be taken to build in mobile usability and accessibility in such cases.

### Reasoning

Native form elements work best with browsers and mobile devices by default, with accessibility built-in. 3rd party libraries were excluded in favor of reducing bundle size, cutting dependencies, and low monetary cost.

### Consequences

Consequences
1. more time is spent building around native form elements, rather than using a 3rd party library which has complex components built for you

Issues
* No forseeable issues at this time

[1]: https://www.w3.org/WAI/standards-guidelines/wcag/