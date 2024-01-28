import { changeColumnTitle } from "@/redux/features/board/boardSlice";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function Header({
  columnTitle: columnHeaderText,
  id,
}: {
  columnTitle: string;
  id: string;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [columnTitle, setColumnTitle] = useState<string>(
    columnHeaderText || ""
  );
  const [showInput, setShowInput] = useState<boolean>(false);

  const dispacth = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowInput(false);

    const item = {
      columnTitle,
      id,
    };
    dispacth(changeColumnTitle(item));
  };

  useEffect(() => {
    if (showInput) {
      ref.current?.focus();
    }
  }, [showInput]);
  return (
    <header>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => {
          setShowInput(true);
        }}
      >
        {showInput ? (
          <input
            ref={ref}
            value={columnTitle}
            className="focus-within:border px-2 rounded-md py-1 dark:bg-inherit focus:outline-none "
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setColumnTitle(event.currentTarget.value)
            }
          />
        ) : (
          <>
            <span className="bg-green-400 w-2 h-2 rounded-full inline-block" />
            {columnHeaderText}
          </>
        )}
      </form>
    </header>
  );
}

export default Header;
