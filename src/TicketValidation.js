import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import invitees from "./data/invitees";
import checkCircle from './assets/check-circle.png';
import alertCircle from './assets/alert-circle.png';
import config from './data/config';
import ticketValidationService from './data/ticketValidationService';

const styles = {
  mainStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  blueStyle: {
    height: "20vh",
    width: "100%",
    backgroundColor: "#153D95",
    borderRadius: "0px 0px 30px 30px"
  },
  titleInviteesStyle: {
    color: "gray",
    fontWeight: "bold",
  },
  othersInviteesStyle: {
    alignItems: "center",
    color: "gray"
  },
  titleStyle: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  sucessStyle: {
    width: "116px",
    height: "116px",
    left: "129px",
    top: "209px",
    paddingTop: "5vh",
    paddingBottom: "5vh",
  },
};

const sucess = ticketData => (
  <div style={styles.mainStyle}>
    <div style={styles.blueStyle}/>
    <div style={styles.sucessStyle}>
      <img alt="Sucesso!" src={checkCircle}/>
    </div>
    <div style={styles.titleStyle}>Entrada confirmada!</div>
    <h2>{ticketData.main}</h2>
    {(ticketData.others && ticketData.others.length > 0) && <div style={styles.titleInviteesStyle}>Acompanhantes:</div>}
    <div style={styles.othersInviteesStyle}>
      {ticketData.others && ticketData.others.length > 0 ? ticketData.others.join(", ") : ""}
    </div>
  </div>
)

const formatDate = dateString => {
  try {
    return new Date(Date.parse(dateString)).toLocaleString('pt-BR');
  } catch {
    return dateString;
  }
}

const alert = (ticketData, lastTimeUsed) => (
  <div style={styles.mainStyle}>
    <div style={styles.blueStyle}/>
    <div style={styles.sucessStyle}>
      <img alt="Alerta" src={alertCircle}/>
    </div>
    <div style={styles.titleStyle}>QR Code já utilizado</div>
    <h2>{ticketData.main}</h2>
    <div style={styles.titleInviteesStyle}>Data/hora da leitura anterior:</div>
    <div style={styles.othersInviteesStyle}>
      {formatDate(lastTimeUsed)}
    </div>
  </div>
)

const markUsedAndSucess = (hash, ticketData) => {
  ticketValidationService.markUsed(hash);
  return sucess(ticketData);
}

function TicketValidation() {
  const { hash } = useParams();
  const ticketData = invitees[hash];

  const [ready, setReady] = useState(false);
  const [lastTimeUsed, setLastTimeUsed] = useState(null);

  useEffect(() => {
    if (config.useDatabase) {
      ticketValidationService.lastTimeUsed(hash).then(data => {
        setLastTimeUsed(data);
        setReady(true);
      });
    }
  }, [ready, lastTimeUsed, hash]);

  if (!config.useDatabase){
    return sucess(ticketData);
  }

  if (!ready) {
    return null;
  }
  
  if (lastTimeUsed){
    return alert(ticketData, lastTimeUsed);
  } else{
    return markUsedAndSucess(hash, ticketData);
  }
  
}

export default TicketValidation;
