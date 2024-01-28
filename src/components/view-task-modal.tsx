import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { MoreVertical } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {
  completeSubtask,
  completeTask,
  removeTask,
} from "@/redux/features/board/boardSlice";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const ViewTaskModal = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { desc, subtasks, id, status, taskName } = useSelector(
    (state: RootState) => state.boards.selectedTask
  );
  useEffect(() => {
    dispatch(completeSubtask(id));
  }, [subtasks]);

  const handleDeleteTask = () => {
    const selectedTask = {
      status,
      taskId: id,
    };

    dispatch(removeTask(selectedTask));
  };

  const completedSubtasks = subtasks?.filter(
    (subtask) => subtask.isCompleted
  )?.length;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="py-3">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle>{taskName}</DialogTitle>
            <MoreVertical size={20} />
          </div>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <div className="">
            <p className="text-md text-semibold">
              Subtasks ({`${completedSubtasks} of ${subtasks?.length}`})
            </p>
            <div className="flex flex-col space-y-2 mt-3">
              {subtasks?.map(({ id, isCompleted, text }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={isCompleted}
                    onClick={() => dispatch(completeSubtask(id))}
                  />
                  <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {isCompleted ? <s>{text}</s> : <p>{text}</p>}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete Task
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
