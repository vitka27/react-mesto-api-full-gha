import { useState } from "react";

export default function useInputForm(initial = {}) {
  const [values, setValues] = useState(initial);

  const onChange = (event) => {
    // setValue(event.target.value)
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, onChange, setValues };
}
