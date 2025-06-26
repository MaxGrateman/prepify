import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 }
};

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 2 },
  pressed: { scale: 0.95, strokeWidth: 4 },
  checked: { stroke: "#FFFFFF" },
  unchecked: { stroke: "#FFFFFF", strokeWidth: 1 }
};

interface CheckboxMotionProps {
  id: string;
  isChecked: boolean;
}

export const CheckboxMotion: React.FC<CheckboxMotionProps> = ({ id, isChecked }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.svg
    initial={false}
    animate={isChecked ? "checked" : "unchecked"}
    whileHover="hover"
    whileTap="pressed"
    width="40"
    height="40"
    id={id}
    >
      <motion.rect
        x="2"
        y="2"
        width="37"
        height="37"
        rx="5"
        fill="transparent"
        strokeWidth="3"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={boxVariants}
      />

      <motion.path
        d="M 5 20 L 15 30 L 35 10"
        fill="transparent"
        strokeWidth="4"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={tickVariants}
        animate={isChecked ? "checked" : "unchecked"}
        style={{ pathLength, opacity }}
        custom={isChecked}
        width="25"
        height="25"
      />
  </motion.svg>
  );
};
