import React from 'react';

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    unit?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, unit }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                className="form-input"
            />
            {/* Checkea si la unidad existe y la muestra */}
            {unit && <span className="form-unit">{unit}</span>}
        </div>
    );
};

export default FormInput;