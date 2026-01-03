import { useState } from "react";

import Image from "next/image";

import { NodeType } from "@/app/Constants/types";

import { PopupMenu } from "./PopupMenu";

type ThreeDotsType = {
  isHovered: boolean;
  id: string;
  type: NodeType;
  parentId?: string;
};

export const ThreeDots = (props: ThreeDotsType) => {
  const { isHovered, id, type, parentId = "" } = props;
  const [imageSrc, setImageSrc] = useState("/assets/threeDots.png");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImageSrc("/assets/threeDotsSelected.png");
  };

  const handleMouseUp = () => {
    setImageSrc("/assets/threeDots.png");
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });

    setEditMode(!editMode);
  };

  return (
    <div onClick={onClick}>
      {isHovered && (
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={imageSrc}
            alt="Closed Folder Icon"
            width={22}
            height={22}
          />
        </div>
      )}
      {editMode && (
        <PopupMenu
          isHovered={isHovered}
          setEditMode={setEditMode}
          editMode={editMode}
          id={id}
          type={type}
          parentId={parentId}
          top={menuPosition.top}
          left={menuPosition.left}
        />
      )}
    </div>
  );
};
