import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import md5 from 'md5';
import validtickets from './data/validtickets';
import InputMask from "react-input-mask";

function TicketForm() {
  const { register, handleSubmit, errors, control } = useForm();
  const [hashToRender, setHashToRender] = useState("");

  if (hashToRender) {
    return <Redirect to={`/view/${hashToRender}`} />;
  }  

  const onSubmit = data => {
    console.log(data);
    const phone = data.phone.replace(/\D/g,'');
    const validator = `${phone}${data.token.toUpperCase()}`;
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
        <Controller as={InputMask}
          control={control}
          mask="(99)99999-9999"
          name="phone"
          placeholder="Seu telefone (com DDD)" 
          defaultValue={""}
        />
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
