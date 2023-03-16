Feature: Create a list

  @http
  Scenario: Creating a new todo-list
    Given Harper is authenticated
    When Harper creates a todo-list named "Morning routine"
    And Harper lists his todo-lists
    Then Harper should have the following todo-lists:
      | name            |
      | Morning routine |
