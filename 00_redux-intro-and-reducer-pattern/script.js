import { createStore } from "redux";
const postCountElement = document.querySelector(".post-count");

const intialState = {
  post: 0,
  name: "sohan Singh",
  age: 24,
};

const INCREMENT = "post/increment";
const DECREMENT = "post/decrement";
const INCREASE_BY = "post/increaseBy";
const DECREASE_BY = "post/decreaseBy";

function reducer(state = intialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREASE_BY:
      return { ...state, post: state.post + action.payload };
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload };
    default:
      return state;
  }

  //? using if else statement
  // if (action.type === INCREMENT) {
  //     return { ...state, post: state.post + 1 }
  // } else if (action.type === DECREMENT) {
  //     return { ...state, post: state.post - 1 }
  // } else if (action.type === INCREASE_BY) {
  //     return { ...state, post: state.post + action.payload }
  // } else if (action.type === DECREASE_BY) {
  //     return { ...state, post: state.post - action.payload }
  // }
  // return state
}
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store);

store.subscribe(() => {
  console.log(store.getState());
  postCountElement.innerText = store.getState().post;
});

postCountElement.innerText = store.getState().post;

store.dispatch({ type: DECREMENT });
store.dispatch({ type: INCREMENT });
store.dispatch({ type: INCREASE_BY, payload: 15 });
store.dispatch({ type: DECREASE_BY, payload: 5 });

postCountElement.addEventListener("click", () => {
  store.dispatch({ type: INCREMENT });
});

// setTimeout(() => {
//   store.dispatch({ type: DECREMENT });
//   console.log("sohan");
// }, 2000);
