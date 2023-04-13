export function Input({ label, name }) {

  return (
    <div >
      <label htmlFor={name}>{label}:</label>
      <input type="text" name={name} id={name} />
    </div>
  )
}
