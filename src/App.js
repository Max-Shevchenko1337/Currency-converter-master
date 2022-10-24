
import './VariablesLightTheme.css'
import './App.css';
import CurrencyInputFields from './CurrencyInputFields';
import CurrencyOutput from './CurrencyOutput';
import NavigationBar from './NavigationBar';
import Header from './Header'
import React, { useEffect, useState } from 'react'
const REQUEST_URL = 'https://api.exchangerate.host/latest';


function App() {
  const [currencyCode, setCurrencyCode] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState((1).toFixed(2))
  const [exchangeRate, setExchangeRate] = useState()
  const [amountChanged, setAmountChanged] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetch(REQUEST_URL, { method: "GET" })
      .then(res => res.json())
      .then(result => {
        const firstCurrency = Object.keys(result.rates)[149]
        setCurrencyCode(Object.keys(result.rates))
        setFromCurrency(result.base)
        setToCurrency(firstCurrency)
        setExchangeRate(result.rates[firstCurrency])
      })
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${REQUEST_URL}?symbols=${toCurrency}&base=${fromCurrency}`, { method: "GET" })
        .then(response => response.json())
        .then(result => { setExchangeRate(result.rates[toCurrency]) })
    }

  }, [fromCurrency, toCurrency])

  function onFocusAmount() {
    if (amountChanged == false) {
      setAmount(null)
    }
  }

  function checkAmountIsCorrect(checkAmount) {
    if (checkAmount <= 0) {
      setAmount('')
      setErrorMessage('Please enter an amount greater than 0')
      return false
    }
    if (!checkAmount) {
      setAmount('')
      setErrorMessage('Please enter a valid amount')
      return false
    }
    setErrorMessage('')
    return true
  }

  function onChangeAmount(e) {
    setAmount(e.target.value)
    setAmountChanged(true)
  }

  function onBlurAmount(e) {
    if (amountChanged == false) {
      setAmount((1).toFixed(2))
      return
    }
    const checkAmount = parseFloat(e.target.value)
    if (checkAmountIsCorrect(checkAmount)) {
      setAmount(checkAmount.toFixed(2))
    }
  }
  function onClickReverse() {
    const temporaryFromCode = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temporaryFromCode)
  }

  return (
    <>
      <div className='nav-header-full-width'></div>
      <section className='body-section'>
        <div className='main-container'>

          <NavigationBar />
          <Header/>

          <div className='converter-container'>
            <div className='converter-container-items'>
              <CurrencyInputFields
                currencyCodes={currencyCode}
                from={fromCurrency}
                to={toCurrency}
                amount={amount}
                onChangeCode={e => e.target.id == 'from' ? setFromCurrency(e.target.value) : setToCurrency(e.target.value)}
                onChangeAmount={onChangeAmount}
                onFocusAmount={onFocusAmount}
                onBlurAmount={onBlurAmount}
                errorMessage={errorMessage}
                onClickReverse={onClickReverse}
              />
              <CurrencyOutput
                amount={amount}
                from={fromCurrency}
                to={toCurrency}
                exchangeRate={exchangeRate}
                errorMessage={errorMessage}
                usd = {37.191455}
                eur = {36.90679}

              />



            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default App;
