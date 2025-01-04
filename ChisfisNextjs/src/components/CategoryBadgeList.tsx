import React, { FC } from "react";
import Badge from "@/shared/Badge";
import { PostDataType } from "@/dataTypes/PostDataType";
import { Route } from "next";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: PostDataType["categories"];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {categories.map((item, index) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.name}
          href={item.href as Route}
          color={item.color as any}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
