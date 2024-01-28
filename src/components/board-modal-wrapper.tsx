import { ChangeEvent, ReactNode, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { X } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addNewBoard } from "@/redux/features/board/boardSlice";
import { Board } from "@/types";

export const BoardModalWrapper = ({ children }: { children: ReactNode }) => {
  const [boardTitle, setBoardTitle] = useState("");
  const dispatch = useDispatch();

  const [columns, setColumns] = useState([
    {
      id: uuid(),
      content: [],
      columnTitle: "",
    },
  ]);

  const handleInputChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index].columnTitle = value.toString();
    setColumns(newColumns);
  };
  const handleAddNewColumns = () => {
    const newColumn = {
      columnTitle: "",
      content: [],
      id: uuid(),
    };
    setColumns([...columns, newColumn]);
  };
  const handleCreateBoard = () => {
    const board = {
      id: uuid(),
      title: boardTitle,
      columns,
    };
    dispatch(addNewBoard(board as Board));
  };

  const handleRemoveColumns = (columnId: string) => {
    setColumns(columns.filter(({ id }) => id !== columnId));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
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
              value={boardTitle}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setBoardTitle(event.currentTarget.value)
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className=" block">Columns</Label>
            {columns.map(({ columnTitle, id }, index) => (
              <div key={id} className="flex items-center space-x-2">
                <Input
                  value={columnTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, e.currentTarget.value)
                  }
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
                <Button variant="outline" size="icon">
                  <X
                    onClick={() => handleRemoveColumns(id)}
                    strokeWidth={1.25}
                    cursor="pointer"
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddNewColumns} variant="outline" type="submit">
            + Add New Column
          </Button>
          <DialogClose asChild>
            <Button onClick={handleCreateBoard} type="submit">
              Create New Board
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
