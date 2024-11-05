export function myCreateStore(reducer) {
    let state;
    let listeners = [];
    const store = {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener());
        },
        subscribe(listener) {
            listeners.push(listener);
            return function () {
                // listeners = listeners.filter((listener) => listener !== listener)
                const listenerIndex = listeners.findIndex(
                    (registeredListener) => registeredListener === listener
                );
                listeners.splice(listenerIndex, 1);
            };
        },
    };

    store.dispatch({ type: "@@INIT" });
    return store;
}

// export function myCreateStore(reducer) {
//   let state;
//   let listeners = [];

//   const store = {
//     getState: function () {
//       return state;
//     },
//     dispatch(action) {
//       state = reducer(state, action);
//       listeners.forEach((listener) => listener());
//     },
//     subscribe(listener) {
//       listeners.push(listener);
//       return function () {
//         listeners = listeners.filter((l) => l !== listener);
//       };
//     },
//   };

//   store.dispatch({ type: "@@INIT" });
//   return store;
// }