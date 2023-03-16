# Cucumber + Screenplay + Cypress sample

Just a proof of concept, trying to get [cucumber-js](https://github.com/cucumber/cucumber-js), [screenplay](https://github.com/cucumber/screenplay.js/) and [cypress](https://cypress.io) working together.

## What's the goal

The idea is to be able to run a single Cucumber scenario at different levels:

- core: just the businness logic represented by plain JS function
- http: the core is exposed using Next.js and the scenarios are interacting with the server through HTTP
- dom: the components are mounted individually using Cypress. They interact directly with the core
- dom-http: same as previously, except that the components are interacting with the backend using HTTP
- browser: the full stack runs with NextJS and we interact like a "real" user

## What's working so far

- There's a scenario showing a user can create a ToDo list
- The scenario runs against the core
- The scenario runs at the HTTP level

## What's in progress

- The scenario "kinda" runs against the components. Kinda for multiple reasons:
  - it's not really the scenario that is executed, more a test that takes the same steps. In practice, we'll have to parse the feature file using Gherkin and generate the tests from this. That's a bit out of scope for now
  - the steps are executed in a kind of weird order (not really weird, but the mix between JS Promises and Cypress Promises-like makes this)

### Limitations

- To ease handling of Promises and the Cypress Promises-like, the steps have to be pretty simple. All that might work is simply waiting for the actor to attempt an action.
