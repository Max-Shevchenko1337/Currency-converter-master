import React from 'react'

export default function CurrencyOutput(props) {
    const {
        from,
        to,
        amount,
        exchangeRate,
        errorMessage,
        usd,
        eur
    } = props

 const usdCurrency = (1 * usd)
    const eurCurrency = (1 * eur)
    function formatCurrencyResult(exchangeRate) {
        if (errorMessage == '' && amount > 0 && amount) {
            const currencyResult = (Number(amount).toFixed(2) * exchangeRate).toString().split('.')
            if (!currencyResult[1])
                currencyResult[1] = '00'
            const currencyFirstPart = Number(currencyResult[0]).toLocaleString() + '.' + currencyResult[1].toString().slice(0, 2)
            const currencySecondtPart = currencyResult[1].toLocaleString().slice(2)
            return [currencyFirstPart, currencySecondtPart]
        }
        return ['', '']
    }

    const [currencyFirstPart, currencySecondtPart] = formatCurrencyResult(exchangeRate);
    const currencyAmount = formatCurrencyResult(1)[0]

    return (
        <div className='to-currency-result-converter'>
            <div className='from-currency-result'>{(currencyAmount) ? currencyAmount : '0.00'} {from} =</div>
            <div className='to-currency-result'>{(currencyFirstPart) ? currencyFirstPart : '0.00'}<span>{currencySecondtPart}</span> {to}</div>
            <div className='exchange-rate-reverse'>1 {to} = {(1 / exchangeRate).toFixed(5)} {from}</div>
<div className="uah">
    <div className="usd">
    $  {usdCurrency}
</div>
    <div className="eur">
        € {eurCurrency}
    </div>
</div>
        </div>
    )
}