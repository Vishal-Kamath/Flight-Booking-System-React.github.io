import React from 'react';

const FormGroup = (props) => {
  const { formType,  formName, formValue } = props;
  if (formType === 'formInput') {
    const { formInputType } = props;
    if (formInputType ==='date') {
      const { formMax, formDefaultValue } = props;
      return (
        <div className="formGroup">
          <input type={formInputType} className={formType} name={formName} id={formName} placeholder=' ' max={formMax} defaultValue={formDefaultValue}/>
          <label htmlFor={formName} className="formLabel">{formValue}</label>
        </div>
      );
    }
    return (  
      <div className="formGroup">
        <input type={formInputType} className={formType} name={formName} id={formName} placeholder=' '/>
        <label htmlFor={formName} className="formLabel">{formValue}</label>
      </div>
    );
  }

  if (formType === 'formSelect') {
    const {formOptionValues} = props;
    return (
      <div className="formGroup">
        <select name={formName} id={formName} className={formType}>
          <option value='' selected disabled hidden></option>
          {
            formOptionValues.map(optionValue => (
              <option className="formOption" value={optionValue}>{optionValue}</option>
            ))
          }
        </select>
        <label htmlFor={formName} className="formLabel">{formValue}</label>
      </div>
    );
  }
}
 
export default FormGroup;