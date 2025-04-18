import { useRef } from 'react';

const FloatingLabelInput = ({
  id,
  type = 'text',
  value,
  onChange,
  label,
  required = true,
  autoComplete
}) => {
  const inputRef = useRef(null);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        className="block w-full px-3 py-3 text-gray-900 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black peer"
      />
      <label
        htmlFor={id}
        onClick={() => inputRef.current?.focus()}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-black left-1 pointer-events-none cursor-text"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
