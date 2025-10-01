import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IconButton } from "../../buttons";

interface InputAddInputBoxProps {
	placeholder: string;
	handleAddTag: (tagValue: string) => void;
	notification: string | null;
}

function InputAddInputBox({ placeholder, handleAddTag, notification }: InputAddInputBoxProps) {
	const [tagValue, setTagValue] = useState("");

	const handleClick = () => {
		handleAddTag(tagValue);
		setTagValue("");
	};

	return (
		<div className="mb-6 flex items-center">
			<input
				type="text"
				placeholder={placeholder}
				value={tagValue}
				onChange={(e) => setTagValue(e.target.value)}
				className="bg-transparent outline-none placeholder:text-text-xx-light"
				autoCapitalize="on"
				onKeyDown={(e) => e.key === "Enter" && handleClick()}
			/>

			<IconButton
				icon={<AiOutlineCheck />}
				intent={"tertiary"}
				size={"small"}
				onClick={() => handleClick()}
				disabled={tagValue === ""}
				rounded={"full"}
				className="mr-2"
			/>
			<p className="text-text-extra-light">{notification}</p>
		</div>
	);
}

export default InputAddInputBox;
