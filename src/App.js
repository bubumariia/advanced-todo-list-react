import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      completeBtn: false,
      pendingList: 0,
    };
  }
  // handleInput f() will submit when the enter key will be pressed
  handleEnter = (event) => {
    if (event.key === "Enter") {
      // it will prevent on change submition
      event.preventDefault();
      this.setState({
        // initiates the list of todos and the number of items in todos
        todos: [...this.state.todos, event.target.value],
        pendingList: this.state.pendingList + 1,
      });
      // it makes the input element empty after enter key was clicked
      event.target.value = "";
    }
  };
  // handleDeleteBtn f() will checck if the button complete and Delete button is clicked
  handleDeleteBtn = (event) => {
    //it checks if the Complete button was clicked, it will not decrease the number pending list. It will only remove the item(li)
    if (
      event.target.parentElement.previousElementSibling.classList.contains(
        "cross-line"
      )
    ) {
      event.target.parentElement.previousElementSibling.parentElement.remove();
      event.target.parentElement.remove();
    } // it will control the number of the pending tasks,in order not to be less than 0, It will only remove the item(li)
    if (this.state.pendingList === 0) {
      event.target.parentElement.previousElementSibling.parentElement.remove();
      event.target.parentElement.remove();
    }
    // if the complete button is not pressed then, it will decrease the number of pending list and remove the task(li)
    if (
      !event.target.parentElement.previousElementSibling.classList.contains(
        "cross-line"
      )
    ) {
      this.setState({ pendingList: this.state.pendingList - 1 });
      event.target.parentElement.previousElementSibling.parentElement.remove();
      event.target.parentElement.remove();
    }
  };
  // handleCompleteBtn f() adds class to the Li(task) element in order to be appeared line-through and decreases the number of pending list
  handleCompleteBtn = (event) => {
    if (!this.state.completeBtn && this.state.pendingList > 0) {
      event.target.parentElement.previousElementSibling.classList =
        "cross-line";
      this.setState({
        pendingList: this.state.pendingList - 1,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <main>
            <h1>Pending tasks ({this.state.pendingList})</h1>
            <ul>
              {/* it iterates the todos and will show the the tasks in UI */}
              {this.state.todos.map((todo, index) => {
                return (
                  <>
                    <div className="list-button">
                      <li>{todo}</li>
                      <div className="buttons">
                        <button
                          className="completeBtn"
                          onClick={this.handleCompleteBtn}
                        >
                          complete
                        </button>
                        <button
                          className="deleteBtn"
                          onClick={this.handleDeleteBtn}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </ul>
            <input
              placeholder={"Add a new task"}
              onKeyPress={this.handleEnter}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}
