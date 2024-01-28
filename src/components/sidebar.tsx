// import { LayoutPanelLeft } from "lucide-react";
// import { BoardModalWrapper } from "./board-modal-wrapper";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutPanelLeft } from "lucide-react";
import { ReactNode } from "react";
import { BoardModalWrapper } from "./board-modal-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectBoard } from "@/redux/features/board/boardSlice";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const boards = useSelector((state: RootState) => state.boards.boards);
  const selectedBoard = useSelector(
    (state: RootState) => state.boards.selectedBoard
  );
  const dispatch = useDispatch();
  return (
    <>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent side={"left"}>
          <div className="">
            <header className="p-3">
              <p>Task Mangement</p>
            </header>
            <div className="p-3 mt-2">
              <p className="uppercase">All Boards ({boards?.length})</p>
            </div>
            <div className="flex flex-col">
              <div className="pr-3 mt-3 ">
                {boards.map((board) => (
                  <div
                    onClick={() => dispatch(selectBoard(board))}
                    key={board.id}
                    className={`${
                      selectedBoard.id == board.id && "bg-primary text-white"
                    }  py-2 px-2 rounded-lg cursor-pointer`}
                  >
                    <p className="flex items-center gap-x-2">
                      <span>
                        <LayoutPanelLeft size={20} />
                      </span>{" "}
                      {board.title}
                    </p>
                  </div>
                ))}
              </div>

              <BoardModalWrapper>
                <div className=" text-primary  py-2 px-2 rounded-r-lg cursor-pointer">
                  <p className="flex items-center gap-x-2">
                    <span>
                      <LayoutPanelLeft size={20} />
                    </span>{" "}
                    + Create New Board
                  </p>
                </div>
              </BoardModalWrapper>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
