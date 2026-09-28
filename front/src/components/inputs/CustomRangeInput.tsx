import React from "react";
import "./customRangeInput.css";

interface CustomRangeInputProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  unit?: string;
}

export default function CustomRangeInput({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  unit = "",
}: CustomRangeInputProps) {
  return (
    <div className="custom-range-wrapper">
      {label && (
        <div className="custom-range-header">
          <span className="custom-range-label typo-body">{label}</span>
          <span className="custom-range-value">{value} {unit}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="custom-range-input"
      />
    </div>
  );
}