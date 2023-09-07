import { Button } from "@/components/ui";
import Image from "next/image";
import React, { ChangeEvent, memo, useRef } from "react";
import { FiUpload } from "react-icons/fi";

interface AdminProductImageProps {
  gridPictureURL: string;
  id: string;
  setValue: any;
}

const AdminProductImage = ({
  gridPictureURL,
  setValue,
  id,
}: AdminProductImageProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      setValue("gridPictureURL", reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const cancelImage = () => {
    setValue("gridPictureURL", "");
  };

  return (
    <div className="relative mr-8 flex flex-[0.5] items-center justify-center overflow-hidden rounded-2xl border-[0.1rem] border-neutral-50 bg-neutral-700">
      {gridPictureURL ? (
        <div className="group">
          <Image src={gridPictureURL} alt="" fill className="object-contain" />
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-neutral-700/90 opacity-0 transition-all group-hover:opacity-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                intent={"tertiary"}
                title="Cambiar"
                size={"small"}
                rounded={"full"}
                onClick={() => inputRef.current!.click()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-3 text-xs">Sin Imagen</p>
          <Button
            intent={"tertiary"}
            title="Subir"
            size={"small"}
            rounded={"full"}
            leftIcon={<FiUpload />}
            onClick={() => inputRef.current!.click()}
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        onChange={handleImageChange}
        className="hidden"
      />

      {id && (
        <div className="absolute left-5 top-5 rounded-full bg-neutral-100 px-5 py-1 text-xxs">
          {id}
        </div>
      )}
    </div>
  );
};

export default memo(AdminProductImage);
