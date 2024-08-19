'use client';

import React from 'react';
import styles from "@/app/components/controls/toggle-syscalls-switch.module.scss";

interface ToggleSyscalls {
  isChecked: boolean;
  onToggle: () => void;
}

const ToggleSyscalls: React.FC<ToggleSyscalls> = ({ isChecked, onToggle }) => {
    return (
        <button
          className={`${styles.toggleButton} ${styles["toggle-" + isChecked]}`}
          onClick={onToggle}
          aria-label={isChecked ? "Show all functions" : "Show only syscalls"}
          title={isChecked ? "Show all functions" : "Show only syscalls"}
        >
          SYSCALL
        </button>
      );
};

export default ToggleSyscalls;
