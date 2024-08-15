'use client';

import React from 'react';
import styles from "@/app/components/controls/toggle-dll-contents-switch.module.scss";

interface ToggleDllContentsSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

const ToggleDllContentsSwitch: React.FC<ToggleDllContentsSwitchProps> = ({ isChecked, onToggle }) => {
  return (
    <div className={styles.toggleContainer}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        Show all DLL Contents
      </label>
    </div>
  );
};

export default ToggleDllContentsSwitch;
