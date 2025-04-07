import React from 'react';

type InputFieldProps = {
    label: string;
    type: string;
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   type,
                                                   value,
                                                   onChange,
                                                   placeholder = '',
                                                   className = '',
                                               }) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-gray-300 text-sm font-medium mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#117378]"
            />
        </div>
    );
};

export default InputField;