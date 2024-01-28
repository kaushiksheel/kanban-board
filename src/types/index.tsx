export type Content = {
  desc: string;
  id: string;
  status: string;
  subtasks: SubTask[];
  taskName: string;
};

export type Column = {
  columnTitle: string;
  content: Content[];
  id: string;
};
export type Board = {
  id: string;
  title: string;
  columns: Column[];
};

export type SubTask = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  taskName: string;
  desc: string;
  subtasks: SubTask[];
  status: string;
};
