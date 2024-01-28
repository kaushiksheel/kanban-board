import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Draggable } from "react-beautiful-dnd";
import { ViewTaskModal } from "./view-task-modal";
import { Task } from "@/types";
import { useDispatch } from "react-redux";
import { selectTask } from "@/redux/features/board/boardSlice";

export const TaskCard = ({
  cardTitle,
  index,
  id,
  taskCardData,
}: {
  cardTitle: string;
  index: number;
  id: string;
  taskCardData: Task;
}) => {
  const dispatch = useDispatch();

  const handleTaskCardData = () => {
    dispatch(selectTask(taskCardData));
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <ViewTaskModal>
          <Card
            onClick={handleTaskCardData}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className=""
          >
            <CardHeader>
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription>0 of 3 substasks</CardDescription>
            </CardHeader>
          </Card>
        </ViewTaskModal>
      )}
    </Draggable>
  );
};
