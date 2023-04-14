interface InputProps {
  label: string;
  name: string;
}

export function Input({ label, name }: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input type="text" name={name} id={name} />
    </div>
  );
}
