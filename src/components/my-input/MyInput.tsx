import "./my-input.sass";

type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export default function MyInput({
  label,
  type,
  value,
  error,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div className="my-input">
      {label && (
        <div>
          <label className="my-input-label">{label}</label>{" "}
          {error && <span className="my-input-error-sign">!</span>}
        </div>
      )}
      <input
        className={` my-input-field ${error ? "my-input-field-error" : ""} ${disabled ? "my-input-disabled" : ""}`}
        type={type}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        disabled={disabled}
        //onBlur={(e) => onChange && onChange(e.target.value)}
      ></input>
      {error && <p className="my-input-error-text">This field is required</p>}
    </div>
  );
}
