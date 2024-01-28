import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "@/components/ui/column";
import { useDispatch } from "react-redux";
import { updateColoumn } from "@/redux/features/board/boardSlice";

function Dashboard() {
  const selectedBoard = useSelector(
    (state: RootState) => state.boards.selectedBoard
  );
  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.boards.boards);

  const { columns, id: ColumnId } = selectedBoard ?? null;
  // check if board has content
  const boardHasContent = boards.length === 0 ? false : true;

  // changes postion of task when dragged
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const coloumn = selectedBoard.columns.find(
      (col) => col.id === source.droppableId
    );

    const newTaskIds = Array.from(coloumn?.content ?? []);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    console.log(draggableId);

    const newColumn = {
      ...coloumn,
      content: newTaskIds,
    };
    // dispatch(updateColoumn(newColumn));
  };

  return (
    <div className="">
      <Navbar />
      <div
        className={`container w-screen ${
          !boardHasContent && "grid place-content-center"
        }  h-screen`}
      >
        {!boardHasContent && (
          <>
            <p className="mb-2">
              This board is empty. Create a new column to get started.
            </p>
            <Button className="w-fit mx-auto">+ Add New Column</Button>
          </>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={ColumnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="board-column mt-5 flex  space-x-3 overflow-x-auto"
              >
                {columns?.map(({ columnTitle, content, id }) => (
                  <Column
                    columnTitle={columnTitle}
                    content={content}
                    key={id}
                    id={id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Dashboard;
