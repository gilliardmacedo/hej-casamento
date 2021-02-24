import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
  }

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Ingresso</h1>
      <p>Insira as informações para gerar os seus ingressos</p>
      <div className="container"> 
        <input type="tel" placeholder="Seu telefone (com DDD)" name="phone" ref={register({required: true, minLength:11, maxLength: 11})} />
      </div>
      <div className="container"> 
        <input type="text" placeholder="Senha que você recebeu por mensagem" name="token" ref={register({required: true, minLength:5, maxLength: 5})} />
      </div>
      <input type="submit" value="Gerar"/>
    </form>
  );
}

export default App;
