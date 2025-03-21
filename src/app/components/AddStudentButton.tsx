'use client';

import { Tooltip, ActionIcon } from "@mantine/core";
import { HiPlus } from "react-icons/hi2";

export default function AddStudentButton() {
  return (
    <Tooltip label='Add Student'>
      <ActionIcon onClick={() => console.log('clicked')} color="myColor">
        <HiPlus size={16}/>
      </ActionIcon>
    </Tooltip>
  );
} 
