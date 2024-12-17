'use client';
import { RootState } from "@/store/store";
import { getCurrencies, getCurrPref } from "@/utils/helpers";
import React, { FC, useState } from "react";
import { useSelector } from 'react-redux';

export interface PriceProps {
  className?: string;
  currency?: string;
  price?: any;
}

const defaultCurrencies = {
  base: "USD",
  date: "2024-12-05 00:00:00+00",
  rates : 
    {DOP : "60.4305" }
}
const Price: FC<PriceProps> = ({
  className = "",
  currency = "RD",
  price = 0,
}) => {
  const { translations, isLoading, error } = useSelector(
    (state: RootState) => state.translations
  );

  // need to get this from redux @Ezra  - see currency slice
  const localStorageCurrPref = getCurrPref();
  const locStorageCurrencies = getCurrencies();
  const cur = JSON.parse(locStorageCurrencies);

  const [selectedCurrency,setSelectedCurrency]= useState(localStorageCurrPref); //temp
  const [currencies,setCurrencies]= useState(cur); //temp

  if(localStorageCurrPref){ 
   // console.log("currPref IS set")
   // setSelectedCurrency(locStorageCurrencies);
  } else {
   // console.log("currPref IS NOT set")
    //setSelectedCurrency(localStorageCurrPref);
  }

  if(locStorageCurrencies){
   // console.log("currencies IS set")
   // const cur = JSON.parse(locStorageCurrencies);
   // setCurrencies(cur);
   } else {
   // console.log("currencies IS NOT set")
  // setSelectedCurrency(locStorageCurrencies);
  }

  const currencySymbol = "$";
  
  const formatPrice = (p) =>{
    const exchangeRates = currencies.rates;
    const rate = exchangeRates[selectedCurrency];
    const newPrice = Math.round((parseInt(price)*Number(rate)));

    // console.log(exchangeRates);
    // console.log("localstorage/selected currency: ", selectedCurrency);
    // console.log("rate: ", Number(rate));
    // console.log(Number(rate));
    // console.log(newPrice);

    // console.log("double check conversion");
    // console.log(price +"*"+ Number(rate) + "=" + newPrice);

    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      trailingZeroDisplay:'stripIfInteger'
    });

    let pounds = Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      trailingZeroDisplay:'stripIfInteger'
    });

    let rupee = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      trailingZeroDisplay:'stripIfInteger'

    });

    let euro = Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR',
        trailingZeroDisplay:'stripIfInteger'
      });
    
    let formattedNewPrice = new Intl.NumberFormat().format(newPrice);
    switch(selectedCurrency){
      case "EUR":
        formattedNewPrice = euro.format(newPrice);
      break;
      case "GBP":
        formattedNewPrice = pounds.format(newPrice);
      break;
      case "INR":
        formattedNewPrice = rupee.format(newPrice);
      break;

      default: //USD,CAD,DOP have the same dollar symbol
        formattedNewPrice = USDollar.format(newPrice);
    }

    return formattedNewPrice;
  }


  return (
    <div
      className={`nc-Price flex items-center space-x-1 ${className}`}
      data-nc-id="Price"
    >
    {/* <span className={`flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none font-medium text-secondary-500 ${className}`} > */}
    <span className={`flex items-center justify-center px-2.5 py-1.5 border-2 border-primary-6000 rounded-lg leading-none font-medium text-primary-6000 ${className}`} >
    
      {price >0 && (
        currencySymbol + price
      )}

      {!price && (
          <span>{translations.noPriceSet}</span>
      )}

    </span>
    </div>
  );
};

export default Price;