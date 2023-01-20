import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function MyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const data = [
    { name:'Badru', email: 'badru@github.com' },
    { name:'Bob', email: 'bob@gmail.com' }
  ]

  const validate = (e: any) => {
    let isValid = true;
    if (e.target.name === 'name' && e.target.value.length === 0) {
      isValid = false;
    }
    if (e.target.name === 'email' && !/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      isValid = false;
    }
    if (e.target.name === 'password' && e.target.value.length < 6) {
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate(e)) {
      // send form data to server here
      console.log("Form Data", { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <InputText id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={validate} />
          {submitted && name.length === 0 && <div className="error">Name is required</div>}
        </div>
        <div className="form-group mt-5">
          <label htmlFor="email">Email:</label>
          <InputText id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validate} />
          {submitted && !/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && <div className="error">Email is invalid</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <InputText id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validate} />
          {submitted && password.length < 6 && <div className="error">Password must be at least 6 characters long</div>}
        </div>
        <div className="form-group">
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </form>
      <h1>{name} {email}</h1>
      <DataTable value={data} >
        <Column field='name' header="Name" />
        <Column field='email' header="Email" />
      </DataTable>
    </div>
  );
}

export default MyForm;
