Feature: Create a list

  @wip-http
  Scenario: Creating a new todo-list
    Given Harper is authenticated
    When Harper creates a todo-list named "Morning routine"
    Then Harper should have the following todo-lists:
      | name            |
      | Morning routine |
