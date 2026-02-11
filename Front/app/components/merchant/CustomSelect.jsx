import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  label,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (opt) => opt.value === value,
  );
  
  // 优先显示 value（用于 disabled 状态），其次显示匹配的 label，最后显示 placeholder
  const displayText = value || (selectedOption ? selectedOption.label : placeholder);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* 选择框按钮 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          text-left bg-white
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"}
          ${!value ? "text-gray-400" : "text-gray-900"}
        `}
      >
        {displayText}
      </button>

      {/* 下拉图标 */}
      <div
        className={`
          absolute right-3 top-[42px] w-5 h-5 text-gray-400 pointer-events-none
          transition-transform duration-200
          ${isOpen ? "rotate-180" : ""}
        `}
      >
        <ChevronDown className="w-full h-full" />
      </div>

      {/* 下拉列表 - 始终向下展开 */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-100 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-400 text-sm">
              {placeholder}
            </div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-4 py-2.5 cursor-pointer transition-colors
                  ${
                    option.value === value
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}