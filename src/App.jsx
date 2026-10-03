import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./style.css";


/* ==================================================
   RECEIPT DATA
================================================== */

const cards = [
  {
    id: "ticket",
    color: "#F5A400",
    dark: "#D67F00",

    title: "Thank you!",
    subtitle: "Your ticket has been issued successfully",

    idLabel: "TICKET ID",
    idValue: "0128034399434",

    amount: "$99.99",
    date: "19 Aug 2026 • 20:17",

    status: "CONFIRMED",

    person: "Aravind Kumar",
    number: "•••• 8237",

    type: "barcode",
  },

  {
    id: "apple",
    color: "#3E6FB6",
    dark: "#28518D",

    title: "Apple Store",
    subtitle: "Your order has been confirmed successfully",

    idLabel: "ORDER ID",
    idValue: "AP982034812",

    amount: "$1,799.00",
    date: "20 Aug 2026 • 18:42",

    status: "CONFIRMED",

    person: "Aravind Kumar",
    number: "•••• 5412",

    type: "qr",
  },

  {
    id: "artisan",
    color: "#D94A45",
    dark: "#A92E2A",

    title: "Artisan Roasters",
    subtitle: "Your payment has been completed successfully",

    idLabel: "ORDER ID",
    idValue: "AR730918221",

    amount: "$54.50",
    date: "21 Aug 2026 • 21:08",

    status: "PAID",

    person: "Aravind Kumar",
    number: "•••• 6218",

    type: "barcode",
  },
];


/* ==================================================
   TIMINGS
================================================== */

const PRINT_TIME = 2.8;
const HOLD_TIME = 1.15;
const DROP_TIME = 0.8;
const GAP_TIME = 0.25;


/* ==================================================
   CONFETTI
================================================== */

function fireConfetti(color) {
  confetti({
    particleCount: 90,

    spread: 95,

    startVelocity: 30,

    gravity: 0.8,

    scalar: 0.85,

    ticks: 100,

    decay: 0.94,

    colors: [
      color,
      "#ffffff",
      "#FFD166",
      "#FF6B6B",
    ],

    origin: {
      x: 0.5,
      y: 0.15,
    },
  });


  setTimeout(() => {
    confetti({
      particleCount: 45,

      spread: 75,

      startVelocity: 24,

      gravity: 0.9,

      scalar: 0.7,

      ticks: 85,

      colors: [
        color,
        "#ffffff",
        "#FFD166",
      ],

      origin: {
        x: 0.5,
        y: 0.18,
      },
    });
  }, 120);
}


/* ==================================================
   BARCODE
================================================== */

function Barcode() {
  return (
    <div className="barcode">

      <i />
      <i className="big" />
      <i className="small" />
      <i />

      <i className="big" />
      <i className="small" />
      <i />

      <i />
      <i className="big" />
      <i className="small" />
      <i />

      <i className="big" />
      <i />
      <i className="small" />
      <i />

      <i className="big" />
      <i />
      <i className="small" />
      <i />

    </div>
  );
}


/* ==================================================
   FAKE QR CODE
================================================== */

function QRCode() {
  return (
    <div className="qr">

      <div className="qr-pattern">

        {Array.from({ length: 64 }).map((_, i) => (
          <span key={i} />
        ))}

      </div>

    </div>
  );
}


/* ==================================================
   RECEIPT
================================================== */

function Receipt({ card }) {
  return (
    <motion.div
      className="receipt"

      /*
        The receipt starts far above
        the black printer slot.

        It slowly travels down and
        becomes visible exactly from
        the slot position.
      */

      initial={{
        x: -160,
        y: -480,
        opacity: 1,
      }}

      animate={{
        x: -160,
        y: 0,
        opacity: 1,
      }}

      exit={{
        x: -160,
        y: 620,
        opacity: 0,
        rotate: 2.5,
      }}

      transition={{
        y: {
          duration: PRINT_TIME,

          ease: [
            0.22,
            0.65,
            0.25,
            1,
          ],
        },

        opacity: {
          duration: DROP_TIME,

          ease: "easeOut",
        },

        rotate: {
          duration: DROP_TIME,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        },
      }}
    >

      {/* =========================================
          RECEIPT HEADER
      ========================================= */}

      <div className="receipt-header">

        <div
          className="small-icon"
          style={{
            color: card.dark,
            borderColor: card.color,
          }}
        >
          ✦
        </div>

        <h1>
          {card.title}
        </h1>

        <p>
          {card.subtitle}
        </p>

      </div>


      {/* =========================================
          DOTTED CUT LINE
      ========================================= */}

      <div className="cut-line">

        <span />
        <span />

      </div>


      {/* =========================================
          RECEIPT CONTENT
      ========================================= */}

      <div className="receipt-content">

        {/* FIRST ROW */}

        <div className="two-column">

          <div>

            <label>
              {card.idLabel}
            </label>

            <strong>
              {card.idValue}
            </strong>

          </div>


          <div className="right">

            <label>
              AMOUNT
            </label>

            <strong>
              {card.amount}
            </strong>

          </div>

        </div>


        {/* SECOND ROW */}

        <div className="two-column second">

          <div>

            <label>
              DATE & TIME
            </label>

            <strong>
              {card.date}
            </strong>

          </div>


          <div className="right">

            <label>
              STATUS
            </label>

            <span
              className="status"
              style={{
                backgroundColor:
                  `${card.color}25`,

                color:
                  card.dark,
              }}
            >
              {card.status}
            </span>

          </div>

        </div>


        {/* =====================================
            USER
        ===================================== */}

        <div className="user-row">

          <div
            className="avatar"
            style={{
              backgroundColor:
                card.color,
            }}
          >
            A
          </div>


          <div className="user-text">

            <strong>
              {card.person}
            </strong>

            <span>
              {card.number}
            </span>

          </div>

        </div>


        {/* =====================================
            BARCODE / QR
        ===================================== */}

        <div className="code-area">

          {card.type === "qr" ? (
            <QRCode />
          ) : (
            <Barcode />
          )}

          <small>
            2 889217 271610
          </small>

        </div>

      </div>


      {/* =========================================
          BOTTOM TEAR
      ========================================= */}

      <div className="receipt-bottom">

        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />

      </div>

    </motion.div>
  );
}


/* ==================================================
   PRINTER
================================================== */

function Printer({ card }) {
  return (
    <motion.div
      className="printer"

      animate={{
        backgroundColor:
          card.color,
      }}

      transition={{
        duration: 0.45,

        ease: "easeInOut",
      }}
    >

      {/* TOP HIGHLIGHT */}

      <div className="printer-highlight" />


      {/* =========================================
          BLACK PRINTING SLOT
      ========================================= */}

      <div className="printer-slot">

        <div className="slot-dark" />

      </div>

    </motion.div>
  );
}


/* ==================================================
   APP
================================================== */

export default function App() {

  const [current, setCurrent] =
    useState(0);

  const [showCard, setShowCard] =
    useState(true);


  const card =
    cards[current];


  /* ==================================================
     CARD ANIMATION SEQUENCE
  ================================================== */

  useEffect(() => {

    let hideTimer;

    let nextTimer;

    let confettiTimer;


    /* ================================================
       CONFETTI AFTER PRINTING
    ================================================ */

    confettiTimer = setTimeout(() => {

      fireConfetti(
        card.color
      );

    }, (PRINT_TIME + 0.25) * 1000);


    /* ================================================
       HOLD CARD
    ================================================ */

    hideTimer = setTimeout(() => {

      setShowCard(false);

    }, (
      PRINT_TIME +
      HOLD_TIME
    ) * 1000);


    /* ================================================
       NEXT CARD
    ================================================ */

    nextTimer = setTimeout(() => {

      setCurrent(
        (old) =>
          (old + 1) %
          cards.length
      );

      setShowCard(true);

    }, (
      PRINT_TIME +
      HOLD_TIME +
      DROP_TIME +
      GAP_TIME
    ) * 1000);


    /* ================================================
       CLEANUP
    ================================================ */

    return () => {

      clearTimeout(
        hideTimer
      );

      clearTimeout(
        nextTimer
      );

      clearTimeout(
        confettiTimer
      );

    };

  }, [current, card.color]);


  /* ==================================================
     UI
  ================================================== */

  return (
    <div className="page">

      <div className="scene">


        {/* ==========================================
            BACKGROUND
        ========================================== */}

        <div className="background">

          <div className="blur-light one" />

          <div className="blur-light two" />

          <div className="blur-light three" />

          <div className="fake-table" />

        </div>


        {/* ==========================================
            PAPER WINDOW
        ========================================== */}

        <div className="paper-window">

          <AnimatePresence mode="wait">

            {showCard && (

              <Receipt
                key={card.id}
                card={card}
              />

            )}

          </AnimatePresence>

        </div>


        {/* ==========================================
            PRINTER
        ========================================== */}

        <Printer
          card={card}
        />

      </div>

    </div>
  );
}