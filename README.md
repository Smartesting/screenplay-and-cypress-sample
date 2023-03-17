# Cucumber + Screenplay + Cypress sample

Just a proof of concept, trying to get [cucumber-js](https://github.com/cucumber/cucumber-js), [screenplay](https://github.com/cucumber/screenplay.js/) and [cypress](https://cypress.io) working together.

## What's the goal

The idea is to be able to run a single Cucumber scenario at different levels:

- core: just the businness logic represented by plain JS function
- http: the core is exposed using Next.js and the scenarios are interacting with the server through HTTP
- dom: the components are mounted individually using Cypress. They interact directly with the core
- dom-http: same as previously, except that the components are interacting with the backend using HTTP
- browser: the full stack runs with NextJS and we interact like a "real" user

## Running the tests

All levels of tests can be executed running `npm test`. Each level has its own target:

- `npm run test:cucumber`: run the tests at core level
- `npm run test:cucumber:http`: run the tests at `http` level
- `test:cypress:component`: run test tests at component level (against the `core`, not using `http` layer)
- `test:cypress:e2e`: run test tests like a real user

Note: in order to run `test:cypress:e2e`, you need to have a test server running: you can do so by running `npm run start:test`.

## What's working so far

- There's a scenario showing a user can create a ToDo list
- The scenario runs against the core
- The scenario runs at the HTTP level
- The scenario runs at the Component level
- The scenario kinda run at E2E level (kinda... there's no reset between tests so the more the tests are executed the more items are displayed :/ ) 

## What has to be done

- Run the scenario at browser level.
- Run the scenario at component level using the `http` layer (although, that might not be a hich priority. It would be nice, but if the scenarios run against the real server, then the components will use `http`)
- Have the assertions to get the CY tests failing for real.

Right now, we do not really execute the scenario, but a rewritten version. Ideally, we should generate the code and not write it manually (otherwise it defeats the point having a single specification file to test the system at multiple levels).

At the browser level, we could use [badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) to handle this. But at component level, [the `file:preprocessor` hook is not available](https://github.com/cypress-io/cypress/issues/21992), so we can not use the same library.
Another issue (if we were able to use a preprocessor at component test level) is that the same test file can not be used for both component and e2e tests. So we need to duplicate the feature files in any case.

So far, there are two possibilities that could be used to fix the problem:

- have a "test file" for each level (eg: `component.cy.test.tsx` and `e2e.cy.test.ts`) which read the feature files and generate the tests "on the fly".
- write a script that translates `.feature` file into one or two test files.

### Limitations

To ease handling of Promises and the Cypress Promises-like, the steps have to be pretty simple. All that might work is simply waiting for the actor to attempt an action.
For example, this kind of steps works:

```
async function doSomething(this: World, actor: Actor<World>) {
  actor
    .attemptTo(this.doSomething())
    .then(response => actor.remember('something', response))
}
```

As you notice, we do not use `await` but rely on good old `then`. The reason behing it is that both JS Promises and Cypress Promises implements the `then` method (although it's not exactly the same thing).

Using `await` on a Cypress does not really wait for it to be finished (although, to be fully honest, there's been so many trials and errors than the `await` might not have been the real issue. But it works this way :D)
