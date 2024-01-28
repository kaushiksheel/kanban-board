import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sidebar } from "./sidebar";
import { MoreVertical, PanelRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AddTaskModal } from "./add-task-modal";
import { RemoveBoardModal } from "./remove-board-modal";

export const Navbar = () => {
  const boards = useSelector((state: RootState) => state.boards.boards);
  const { title } = useSelector(
    (state: RootState) => state.boards.selectedBoard
  );
  return (
    <div className="border-b sticky border-[#EBEBED] top-0 h-fit dark:border-[#232326] bg-white dark:bg-[#040712] ">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center space-x-6">
          <Link to="/">Task Management</Link>
          {title && <p>{title}</p>}
        </div>

        <div className="flex items-center space-x-6">
          <Sidebar>
            <div className="flex items-center gap-x-2">
              Open Sidebar <PanelRight />
            </div>
          </Sidebar>
          <ModeToggle />
          <AddTaskModal>
            <Button disabled={boards.length === 0 ? true : false}>
              + Add New Task
            </Button>
          </AddTaskModal>
          {boards.length > 0 && (
            <RemoveBoardModal>
              <MoreVertical size={20} cursor="pointer" />
            </RemoveBoardModal>
          )}
        </div>
      </div>
    </div>
  );
};
