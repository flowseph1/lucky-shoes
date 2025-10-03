import type React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button } from "../buttons";

const Modal = ({
	children,
	title,
	onCloseModal,
}: {
	children: React.ReactNode;
	title: string | number;
	onCloseModal: () => void;
}) => {
	return (
		<div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.8)]">
			{/* Modal Container */}
			<div className="flex h-[65%] w-7xl flex-col overflow-hidden rounded-2xl border-[0.1rem] border-background-border">
				{/* Modal Header */}
				<div className="flex justify-between border-neutral-300 border-b-[0.1rem] bg-background px-14 py-10">
					<div className="font-bold text-lg text-text-base">{title}</div>
					<div
						className="flex cursor-pointer items-center transition-all hover:scale-110"
						onClick={() => onCloseModal()}
					>
						<AiFillCloseCircle size={20} />
					</div>
				</div>

				{/* Modal Body */}
				<div className="flex-1 overflow-auto bg-background px-16 py-12">{children}</div>

				{/* Footer */}
				<div className="flex items-center justify-end border-background-border border-t-[0.1rem] bg-background px-14 py-8">
					<div className="flex space-x-7">
						<Button title="Cancelar" intent="secondary" onClick={() => onCloseModal()} />
						<Button title="Guardar" intent="primary" onClick={() => {}} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
