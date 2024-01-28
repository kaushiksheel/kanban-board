import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Dropdown } from "./ui/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { v4 as uuid } from "uuid";
import { SubTask, Task } from "@/types";
import { addTask } from "@/redux/features/board/boardSlice";

export const AddTaskModal = ({ children }: { children: ReactNode }) => {
  const selectedBoard = useSelector(
    (state: RootState) => state.boards.selectedBoard
  );
  const [status, setStatus] = useState("");
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [subtasks, setSubtasks] = useState<SubTask[]>([
    {
      id: uuid(),
      text: "",
      isCompleted: false,
    },
  ]);
  const dispatch = useDispatch();
  const { columns } = selectedBoard ?? null;

  const list = columns?.map((column) => ({
    value: column.columnTitle,
    label: column.columnTitle,
  }));

  const handleChange = (index: number, value: string) => {
    const subtask = [...subtasks];
    subtask[index].text = value.toString();
    setSubtasks(subtask);
  };

  const handleAddSubtasks = () => {
    const newTask: SubTask = {
      id: uuid(),
      text: "",
      isCompleted: false,
    };
    setSubtasks([...subtasks, newTask]);
  };

  const handleAddTask = () => {
    const task: Task = {
      id: uuid(),
      taskName,
      desc,
      subtasks,
      status,
    };
    dispatch(addTask(task));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className=" block">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              placeholder="e.g. Take coffee break"
              name="taskName"
              value={taskName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskName(e.currentTarget.value)
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className=" block">
              Description
            </Label>
            <Input
              id="name"
              name="desc"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              placeholder="e.g. it's always good to take a break.This 15 min break will recharge the batteries a little"
              value={desc}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDesc(e.currentTarget.value)
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className=" block">Subtasks</Label>
            {subtasks.map(({ text, id }, index) => (
              <div key={id} className="flex items-center space-x-2">
                <Input
                  value={text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.currentTarget.value)
                  }
                  placeholder="eg. Make Coffee"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
                <Button variant="outline" size="icon">
                  <X strokeWidth={1.25} cursor="pointer" />
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleAddSubtasks} variant="outline">
            + Add New Subtask
          </Button>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className=" block">
              Status
            </Label>
            <Dropdown value={status} setValue={setStatus} list={list} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleAddTask} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
