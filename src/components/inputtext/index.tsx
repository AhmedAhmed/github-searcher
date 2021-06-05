import React, {useState} from 'react';

const InputText = (props:any) => {
  const [value, setValue] = useState('');
  return (
    <input 
      type="text" 
      className={props.className} 
      onChange={(e) => {setValue(e.target.value); props.onChange(e)}}
      value={value}
      placeholder={props.placeholder}
    />
  );
}

export default InputText;
