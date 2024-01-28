import { Button } from "@/components/ui/button";
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
import { removeBoard } from "@/redux/features/board/boardSlice";
import { RootState } from "@/redux/store";

import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const RemoveBoardModal = ({ children }: { children: ReactNode }) => {
  const selectedBoard = useSelector(
    (state: RootState) => state.boards.selectedBoard
  );
  const dipsatch = useDispatch();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle color="red">Delete this board?</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete the ${selectedBoard.title} board? This action will remove all columns and tasks and cannot be reversed.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-red-500 hover:bg-none"
              type="submit"
              onClick={() => dipsatch(removeBoard(selectedBoard))}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
