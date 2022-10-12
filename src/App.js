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
  handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({
        todos: [...this.state.todos, event.target.value],
        pendingList: this.state.pendingList + 1,
      });
      event.target.value = "";
    }
  };
  handleDeleteBtn = (event) => {
    if (
      event.target.parentElement.previousElementSibling.classList.contains(
        "cross-line"
      )
    ) {
      event.target.parentElement.previousElementSibling.parentElement.remove();
      event.target.parentElement.remove();
    }
    if (this.state.pendingList === 0) {
      event.target.parentElement.previousElementSibling.parentElement.remove();
      event.target.parentElement.remove();
    }
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
