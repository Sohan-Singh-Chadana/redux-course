import { createStore } from "redux";
import { myCreateStore } from "./my-redux";
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
}
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const myStore = myCreateStore(reducer);

console.log(myStore);
console.log(store);

const unsubscribe = myStore.subscribe(() => {
  console.log(myStore.getState());
  postCountElement.innerText = myStore.getState().post;
});


postCountElement.innerText = myStore.getState().post;

myStore.dispatch({ type: DECREMENT });
myStore.dispatch({ type: INCREMENT });
myStore.dispatch({ type: INCREASE_BY, payload: 15 });

unsubscribe()
myStore.dispatch({ type: DECREASE_BY, payload: 5 });

postCountElement.addEventListener("click", () => {
  myStore.dispatch({ type: INCREMENT });
});

// setTimeout(() => {
//   store.dispatch({ type: DECREMENT });
//   console.log("sohan");
// }, 2000);
