import { TaskCard } from "@/components/task-card";

import Header from "./header";
import { Droppable } from "react-beautiful-dnd";
import { Content } from "@/types";

function Column({
  columnTitle,
  content,
  id,
}: {
  columnTitle: string;
  content: Content[];

  id: string;
}) {
  return (
    <div className="">
      <Header id={id} columnTitle={columnTitle} />
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col space-y-4 mt-3 min-w-[350px] max-w-[360px]"
          >
            {content?.map((contentTitle, index) => (
              <TaskCard
                id={contentTitle.id}
                index={index}
                key={index}
                cardTitle={contentTitle.taskName}
                taskCardData={contentTitle}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
