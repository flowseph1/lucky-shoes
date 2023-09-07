"use client";

import { cx } from "class-variance-authority";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Switch() {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div>
      <div
        onClick={handlePress}
        className={cx(
          "flex h-9 w-20 cursor-pointer rounded-full ",
          isActive
            ? "justify-end bg-primary-200"
            : "justify-start bg-neutral-600"
        )}
      >
        <motion.div
          layout
          className={cx(
            "h-9 w-9 rounded-full shadow-md",
            isActive ? "bg-primary-500" : "bg-neutral-400"
          )}
        />
      </div>
    </div>
  );
}

export default Switch;
