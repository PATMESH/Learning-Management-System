export function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  icon
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-1"
      >
        {label}
      </label>

      <div className="flex items-center gap-3">
        {/* Icon outside the box */}
        {icon && <span className="text-gray-500">{icon}</span>}

        {/* Input */}
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="flex-1 block w-full px-3 py-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            text-gray-900 placeholder-gray-300"
        />
      </div>
    </div>
  );
}
