import React, { useState, useEffect } from 'react'

export default function CurrencyRow(currencies) {
    const {
        currencyCodes,
        to,
        from,
        onChangeCode,
        onChangeAmount,
        onFocusAmount,
        onBlurAmount,
        onClickReverse,
        errorMessage,
        amount
    } = currencies


    return (
        <div className='currency-input-fields'>

            <div className='fields-container'>
                <label htmlFor='amount'>Amount</label>
                <div className='input-container'>
                    <input id='amount' className='input input-fields' maxLength="13" value={(amount == null) ? '' : amount} onChange={onChangeAmount} onFocus={onFocusAmount} onBlur={onBlurAmount} />
                    <div className='error-message'>{errorMessage}</div>
                </div>
            </div>

            <div className='fields-container'>
                <label htmlFor='from'>From</label>
                <select id='from' className='input-fields' value={from} onChange={onChangeCode} >
                    {currencyCodes
                        .map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                </select>
            </div>
            <div className='fields-container fields-container-reverse'>
                <label className='hidden-message' htmlFor='reverse'>Reverse</label>
                <button id='reverse' className='reverse' onClick={onClickReverse}><img src='icons/reverse.png' alt="reverse" /></button>
            </div>

            <div className='fields-container'>
                <label htmlFor='to'>To</label>
                <select id='to' className='input-fields' value={to} onChange={onChangeCode} >
                    {currencyCodes
                        .map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                </select>
            </div>
        </div>
    )
}