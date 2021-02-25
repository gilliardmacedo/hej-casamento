import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import md5 from 'md5';
import validtickets from './data/validtickets';

function TicketForm() {
  const { register, handleSubmit, errors } = useForm();
  const [hashToRender, setHashToRender] = useState("");

  if (hashToRender) {
    return <Redirect to={`/view/${hashToRender}`} />;
  }  

  const onSubmit = data => {
    console.log(data);
    const validator = `${data.phone}${data.token.toUpperCase()}`;
    console.log(`Validator: ${validator}`);
    const hash = md5(validator).toUpperCase();
    console.log(`Hash: ${hash}`);
    if (validtickets.includes(hash)){
      console.log("Hash encontrado!");
      setHashToRender(hash);
      return;
    }
    console.log("Hash nao encontrado.");
    return;
  }

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Ingresso</h1>
      <p>Para acessar seu ingresso, insira o número de telefone que você usou para confirmar presença</p>
      <div className="container"> 
        <input type="tel" placeholder="Seu telefone (com DDD)" name="phone" aria-invalid={errors.phone ? "true" : "false"} ref={register({required: true, minLength:11, maxLength: 11})} />
        {errors.phone && errors.phone.type === "required" && (
          <span role="alert">O número de telefone é obrigatório</span>
        )}
        {errors.phone && errors.phone.type === "minLength" && (
          <span role="alert">Insira o número com DDD. Ex.: 61988884444</span>
        )}
      </div>
      <div className="container"> 
        <input type="text" placeholder="Senha que você recebeu por mensagem" name="token" aria-invalid={errors.token ? "true" : "false"} ref={register({required: true, minLength:6, maxLength: 6})} />
        {errors.token && errors.token.type === "required" && (
          <span role="alert">O token é obrigatório</span>
        )}
        {errors.token && (errors.token.type === "minLength" || errors.token.type === "maxLength") && (
          <span role="alert">Os tokens enviados possuem 6 caracteres</span>
        )}
      </div>
      <input type="submit" value="Acessar"/>
    </form>
  );
}

export default TicketForm;
