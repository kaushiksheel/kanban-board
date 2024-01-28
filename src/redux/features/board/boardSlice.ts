import { Board, Column, Task } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ChangeColumnTitle = {
  columnTitle: string;
  id: string;
};

type SelectedTask = {
  status: string;
  taskId: string;
};

export interface BoardState {
  boards: Board[];
  selectedBoard: Board;
  selectedTask: Task;
}

const initialState: BoardState = {
  boards: [],
  selectedBoard: {} as Board,
  selectedTask: {} as Task,
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addNewBoard: (state, action: PayloadAction<Board>) => {
      const newBoard = action.payload;
      state.boards = [...state.boards, newBoard];
    },
    removeBoard: (state, action: PayloadAction<Board>) => {
      const boardToRemove = action.payload;
      state.boards = state.boards.filter(
        (board) => board.id !== boardToRemove.id
      );
    },
    selectBoard: (state, action: PayloadAction<Board>) => {
      state.selectedBoard = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;

      state.selectedBoard = {
        ...state.selectedBoard,
        columns: state.selectedBoard.columns.filter((column) => {
          if (
            column.columnTitle.toLowerCase() === newTask.status.toLowerCase()
          ) {
            column.content.push(newTask);
          }
          return column;
        }),
      };
    },
    removeTask: (state, action: PayloadAction<SelectedTask>) => {
      const { status, taskId } = action.payload;
      const selectedColumn = state.selectedBoard.columns.find(
        (column) => column.columnTitle.toLowerCase() === status.toLowerCase()
      );
      const removeTask = selectedColumn?.content.filter(
        (task) => task.id !== taskId
      );
      state.selectedBoard = {
        ...state.selectedBoard,
        columns: {
          ...state.selectedBoard.columns,
          content: removeTask,
        },
      };
    },
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
    },
    changeColumnTitle: (state, action: PayloadAction<ChangeColumnTitle>) => {
      state.selectedBoard = {
        ...state.selectedBoard,
        columns: state.selectedBoard.columns.map((column) => {
          if (column.id === action.payload.id) {
            column.columnTitle = action.payload.columnTitle;
          }
          return column;
        }),
      };
    },
    completeSubtask: (state, action: PayloadAction<string>) => {
      const subtaskId = action.payload;

      state.selectedBoard = {
        ...state.selectedBoard,
        columns: state.selectedBoard.columns.map((column) => {
          column.content = column.content.map((task) => {
            if (task.subtasks) {
              task.subtasks = task.subtasks.map((subtask) => {
                if (subtask.id === subtaskId) {
                  // Toggle the isCompleted property of the subtask
                  return { ...subtask, isCompleted: !subtask.isCompleted };
                }
                return subtask;
              });
            }
            return task;
          });
          return column;
        }),
      };
    },
    updateColoumn: (state, action: PayloadAction<Column>) => {
      const newColumn = action.payload;
      state.selectedBoard = {
        ...state.selectedBoard,
        columns: state.selectedBoard.columns.map((column) => {
          if (column.id === newColumn.id) {
            column = newColumn;
          }
          return column;
        }),
      };
    },
  },
});

export const {
  addNewBoard,
  selectBoard,
  addTask,
  removeBoard,
  selectTask,
  removeTask,
  changeColumnTitle,
  completeSubtask,
  updateColoumn,
} = boardSlice.actions;

export default boardSlice.reducer;
