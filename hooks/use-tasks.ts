"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTasks,
  createTask,
  moveTask as moveTaskAction,
  updateTask,
  deleteTask,
} from "@/lib/actions/tasks";

type Task = {
  id: string;
  title: string;
  owner: string;
  due: string;
  column: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useMoveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, column }: { id: string; column: string }) =>
      moveTaskAction(id, column),
    // Optimistic update — move the task in the cache instantly
    onMutate: async ({ id, column }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) => (task.id === id ? { ...task, column } : task)),
      );

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateTask>[1] }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
