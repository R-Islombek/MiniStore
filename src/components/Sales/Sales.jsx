import React from 'react'
import { useTranslation } from "react-i18next";
import iphone from "../Sales/images/iphone.webp"
import "./Sales.css"

const Sales = () => {
  const { t } = useTranslation();

  const handleButtonClick = () => {
    // Sotuvga yo'naltirish logikasi
    console.log("Sotuv boshlanishi");
    // window.location.href = "/shop" yoki boshqa navigation
  };

  return (
    <section className='sales' aria-label="Special offers">
      <div className='container'>
        <div className='sales__container'>
          <div className='sales__content'>
            <h3>{t("sale.title")}</h3>
            <p>{t("sale.text")}</p>
            <button 
              onClick={handleButtonClick}
              aria-label={t("sale.button")}
            >
              {t("sale.button")}
            </button>
          </div>
          <img 
            src={iphone} 
            alt={t("sale.imageAlt") || "Smartphone"} 
            loading="lazy"
          />
        </div>
      </div>       
    </section>
  )
}

export default Sales