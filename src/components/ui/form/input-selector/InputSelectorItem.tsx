import classNames from "classnames";
import { IoMdCheckmark } from "react-icons/io";
import { IItem } from "./InputSelector";

interface InputAreaItemProps {
  item: IItem;
  isSelected: boolean;
  onSelect: (item: string) => void;
}

const InputAreaItem = ({ item, isSelected, onSelect }: InputAreaItemProps) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={classNames(
        "mr-4 flex h-11 cursor-pointer items-center rounded-full border-[0.1rem] px-5 py-1",
        isSelected
          ? "border-primary-300 bg-primary-100 font-semibold text-primary-900 hover:bg-primary-200"
          : "border-neutral-300 bg-neutral-500 hover:bg-neutral-400"
      )}
    >
      {isSelected && (
        <div className="group -ml-2 mr-2 flex h-full items-center justify-end font-semibold text-text-extra-light transition-all">
          <IoMdCheckmark className="text-primary-900" />
        </div>
      )}

      {item}
    </div>
  );
};

export default InputAreaItem;
