import { FC, useState } from 'react';

export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  checked?: boolean;
}

  const ToggleSwitch: FC<ButtonProps> = ({
    label = "",
    onClick = (e) => {},
    checked = true
  }) => {
    
    return (

    <label className="inline-flex items-center me-5 cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" defaultChecked={checked} onClick={onClick} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
      </label>    
    );
};

export default ToggleSwitch