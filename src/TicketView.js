import React from 'react';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import invitees from "./data/invitees";

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
  qrStyle: {
    marginTop: "-5vh",
    alignItems: "center",
  },
  titleInviteesStyle: {
    color: "gray",
    fontWeight: "bold",
  },
  othersInviteesStyle: {
    alignItems: "center",
    color: "gray"
  },
  instructionsStyle: {

  }
};

function TicketView() {
  const { hash } = useParams();
  const urlTicket = `https://gilliardmacedo.github.io/hej-casamento/validate/${hash}`;
  const ticketData = invitees[hash];
  return (
    <div style={styles.mainStyle}>
      <div style={styles.blueStyle}/>
      <div style={styles.qrStyle}>
        <QRCode value={urlTicket} />
      </div>
      <h2>{ticketData.main}</h2>
      {(ticketData.others && ticketData.others.length > 0) && <div style={styles.titleInviteesStyle}>Acompanhantes:</div>}
      <div style={styles.othersInviteesStyle}>
        {ticketData.others && ticketData.others.length > 0 ? ticketData.others.join(", ") : ""}
      </div>
      <h3>Como usar?</h3>
      <div style={styles.instructionsStyle}>
        <p>- Apresente esse QR Code na entrada da recepção</p>
        <p>- O segurança irá ler e confirmar as pessoas vinculadas a esse ingresso</p>
        <p>- Aproveite a festa!</p>
      </div>
    </div>
  );
}

export default TicketView;
