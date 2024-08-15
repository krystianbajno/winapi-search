'use client';

import React from 'react';
import styles from "@/app/components/controls/toggle-dll-contents-switch.module.scss";

interface ToggleDllContentsSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

const ToggleDllContentsSwitch: React.FC<ToggleDllContentsSwitchProps> = ({ isChecked, onToggle }) => {
  return (
    <button
      className={styles.toggleButton}
      onClick={onToggle}
      aria-label={isChecked ? "Hide all DLL Contents" : "Show all DLL Contents"}
      title={isChecked ? "Hide all DLL Contents" : "Show all DLL Contents"}
    >
      <img
        src={isChecked ? "/icons/eye-open.svg" : "/icons/eye-closed.svg"}
        alt={isChecked ? "Hide DLL Contents" : "Show DLL Contents"}
        className={styles.icon}
      />
    </button>
  );
};

export default ToggleDllContentsSwitch;
