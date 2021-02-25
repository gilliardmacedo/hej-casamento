import React from 'react';
import { useParams } from 'react-router-dom';
import invitees from "./data/invitees";
import checkCircle from './assets/check-circle.png';

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

function TicketValidation() {
  const { hash } = useParams();
  const ticketData = invitees[hash];
  return (
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
  );
}

export default TicketValidation;
