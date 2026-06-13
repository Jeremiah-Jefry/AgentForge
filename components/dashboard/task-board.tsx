"use client";

import { ArrowLeftRight, MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import { useTasks, useMoveTask } from "@/hooks/use-tasks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type BoardColumn = "TODO" | "PROGRESS" | "DONE";

const columns: { key: BoardColumn; label: string }[] = [
  { key: "TODO", label: "To do" },
  { key: "PROGRESS", label: "In progress" },
  { key: "DONE", label: "Completed" },
];

function nextColumn(column: string, direction: "left" | "right"): string {
  const order: string[] = ["TODO", "PROGRESS", "DONE"];
  const index = order.indexOf(column);
  const target =
    direction === "left"
      ? Math.max(0, index - 1)
      : Math.min(order.length - 1, index + 1);
  return order[target];
}

export function TaskBoard() {
  const { data: tasks, isLoading } = useTasks();
  const moveTask = useMoveTask();

  const handleMoveTask = (taskId: string, taskColumn: string, direction: "left" | "right") => {
    const newColumn = nextColumn(taskColumn, direction);
    if (newColumn !== taskColumn) {
      moveTask.mutate({ id: taskId, column: newColumn });
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-[28px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {columns.map((column, columnIndex) => (
        <Card key={column.key} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-[var(--heading)]">{column.label}</p>
              <p className="text-sm text-[var(--text-tertiary)]">
                {tasks?.filter((task) => task.column === column.key).length ?? 0} tasks
              </p>
            </div>
            <Badge variant={columnIndex === 1 ? "violet" : "default"}>{column.label}</Badge>
          </div>
          <div className="space-y-3">
            {tasks
              ?.filter((task) => task.column === column.key)
              .map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  whileHover={{ y: -4 }}
                  className="cursor-grab rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[var(--heading)]">{task.title}</p>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Owner: {task.owner} · Due {task.due}
                      </p>
                    </div>
                    <ArrowLeftRight className="size-4 text-[var(--text-tertiary)]" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      aria-label={`Move ${task.title} to the previous column`}
                      onClick={() => handleMoveTask(task.id, task.column, "left")}
                      disabled={task.column === "TODO"}
                      className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition disabled:opacity-30 disabled:hover:text-[var(--text-secondary)]"
                    >
                      <MoveLeft className="size-3.5" />
                      Move left
                    </button>
                    <button
                      type="button"
                      aria-label={`Move ${task.title} to the next column`}
                      onClick={() => handleMoveTask(task.id, task.column, "right")}
                      disabled={task.column === "DONE"}
                      className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition disabled:opacity-30 disabled:hover:text-[var(--text-secondary)]"
                    >
                      Move right
                      <MoveRight className="size-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
