import classNames from "classnames";
import { IoMdTrash } from "react-icons/io";
import { IconButton } from "../../buttons";

interface InputAddItemProp {
  item: string;
  handleDelete: (item: string) => void;
}

const InputAddItem = ({ item, handleDelete }: InputAddItemProp) => {
  return (
    <div
      className={classNames(
        "mb-4 mr-4 flex h-11 cursor-pointer items-center rounded-full border-[0.1rem] px-5 py-1",
        "border-neutral-300 bg-neutral-500 hover:bg-neutral-400"
      )}
    >
      <p className="">{item}</p>
      <IconButton
        icon={
          <IoMdTrash className="text-text-xx-light group-hover:text-text-extra-light" />
        }
        onClick={() => handleDelete(item)}
        className="group -mr-3"
        intent={"tertiary"}
        size={"small"}
      />
    </div>
  );
};

export default InputAddItem;
