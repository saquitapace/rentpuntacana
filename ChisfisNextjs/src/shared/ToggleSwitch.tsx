
import Switch from 'react-switch';
import Input from './Input';
import { useState } from 'react';

const ToggleSwitch = ({ label }) => {

    const [checked, setChecked] = useState(true)
    const handleClick = () =>  {
      setChecked(!checked)
    }

    const handleChange = () =>  {
    //setChecked(!checked)
    }
    return (
      <div className="container" onClick={handleClick}>
            {label}{" "}<i className='las la-map-marked text-2xl w-5 h-5 lg:w-7 lg:h-7'></i>
            <div className="toggle-switch">
                <input
                    onChange={handleChange}
                    checked={checked}
                    type="checkbox"
                    className="checkbox"
                    name={label}
                    id={label}
                    onClick={handleClick}
                />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
      
    );
};

export default ToggleSwitch