import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      transformResponse: (tasks) => tasks.reverse(),
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POSt",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...task });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(
        { id, ...updatedTask },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (taskslist) => {
            const taskIndex = taskslist.findIndex((el) => el.id === id);
            taskslist[taskIndex] = { ...taskslist[taskIndex], ...updatedTask };
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (taskslist) => {
            const taskIndex = taskslist.findIndex((el) => el.id === id);
            taskslist.splice(taskIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = api;