import { Label, Select } from "flowbite-react";
import { useState } from "react";

const SelectInput = ({ id, label, options, value, onChange, overrideHidden = false }) => {
  const [selectedOption, setSelectedOption] = useState(
    () => options.find((option) => option.value === value) || options[0]
  );
  const handleChange = (event) => {
    setSelectedOption(
      options.find((option) => option.value === event.target.value)
    );
    event.target.name = id;
    onChange(event);
  };
  return (
    <div className="w-full" id="select">
      <div className="mt-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Select
        id={id}
        value={selectedOption.value}
        onChange={handleChange}
        
      >
        {options.map((option) => (
          <option
            key={option.value}
            className={option.value === selectedOption.value && !overrideHidden ? "hidden" : ""}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
