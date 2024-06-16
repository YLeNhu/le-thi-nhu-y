import React, { useState, useEffect, useCallback } from 'react'
import { InputNumber, Select, Button } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { Currency } from 'types/currency.type'
import sanitizeCurrencyData from 'utils/sanitizeData'
import CurrencyFormSkeleton from '../Skeleton'
import { CurrencyFormData } from 'types/currency-form.type'
import { labelClasses } from 'constants/common-classes'

const CurrencySwapForm = () => {
  const currencyList: Currency[] = useSelector((state: RootState) => state.currency.currencyList)
  const loading: boolean = useSelector((state: RootState) => state.currency.loading)
  const currencyOptions = sanitizeCurrencyData(currencyList)

  const [inputAmount, setInputAmount] = useState<number | null>(1)
  const [outputAmount, setOutputAmount] = useState<number | null>(1)
  const [inputCurrency, setInputCurrency] = useState('ETH')
  const [outputCurrency, setOutputCurrency] = useState('USDC')
  const [conversionRate, setConversionRate] = useState<string>('')

  const calculateBasedOnRate = useCallback(
    (data: CurrencyFormData, reverse: boolean = false) => {
      const inputCurrencyData = currencyList.find((item) => item.currency === data.inputCurrency)
      const outputCurrencyData = currencyList.find((item) => item.currency === data.outputCurrency)

      if (inputCurrencyData && outputCurrencyData) {
        const rate: number = outputCurrencyData.price !== 0 ? inputCurrencyData.price / outputCurrencyData.price : 0

        if (reverse) {
          const convertedInputAmount = data.outputAmount ? parseFloat((data.outputAmount / rate).toPrecision(7)) : 0
          setInputAmount(convertedInputAmount)
        } else {
          const convertedOutputAmount = data.inputAmount ? parseFloat((rate * data.inputAmount).toPrecision(7)) : 0
          setOutputAmount(convertedOutputAmount)
        }

        setConversionRate(`1 ${data.inputCurrency} ≈ ${rate.toPrecision(7)} ${data.outputCurrency}`)
      }
    },
    [currencyList]
  )

  useEffect(() => {
    calculateBasedOnRate({ inputAmount, outputAmount, inputCurrency, outputCurrency }, false)
  }, [inputAmount, inputCurrency, outputCurrency, calculateBasedOnRate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setInputCurrency(outputCurrency)
    setOutputCurrency(inputCurrency)
    setInputAmount(outputAmount)
    setOutputAmount(inputAmount)
  }

  const handleInputAmountChange = (value: number | null) => {
    setInputAmount(value)
    calculateBasedOnRate({ inputAmount: value, outputAmount, inputCurrency, outputCurrency }, false)
  }

  const handleOutputAmountChange = (value: number | null) => {
    setOutputAmount(value)
    calculateBasedOnRate({ inputAmount, outputAmount: value, inputCurrency, outputCurrency }, true)
  }

  return (
    <>
      {loading ? (
        <CurrencyFormSkeleton />
      ) : (
        <form
          onSubmit={handleSubmit}
          className='bg-white z-10 w-full max-w-5xl rounded-lg shadow-lg shadow-black/20 px-10 py-10 text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        >
          <AmountInputSection
            label='Amount to send'
            amount={inputAmount}
            onAmountChange={handleInputAmountChange}
            currency={inputCurrency}
            onCurrencyChange={setInputCurrency}
            currencyOptions={currencyOptions}
          />
          <AmountInputSection
            label='Amount to receive'
            amount={outputAmount}
            onAmountChange={handleOutputAmountChange}
            currency={outputCurrency}
            onCurrencyChange={setOutputCurrency}
            currencyOptions={currencyOptions}
          />
          <div className='flex flex-col space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='inline-flex items-center text-base font-semibold text-gray-900'>{conversionRate}</div>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
              >
                CONFIRM SWAP
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

interface AmountInputSectionProps {
  label: string
  amount: number | null
  onAmountChange: (value: number | null) => void
  currency: string
  onCurrencyChange: (value: string) => void
  currencyOptions: { label: string; value: string }[]
}

const AmountInputSection: React.FC<AmountInputSectionProps> = ({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencyOptions
}) => (
  <div className='flex space-x-4 mb-4'>
    <div className='w-2/3'>
      <label className={labelClasses} htmlFor={`${label.toLowerCase().replace(/ /g, '-')}`}>
        {label}
      </label>
      <InputNumber
        id={`${label.toLowerCase().replace(/ /g, '-')}`}
        size='large'
        placeholder='Enter amount'
        min={0}
        style={{ width: '100%' }}
        value={amount}
        onChange={onAmountChange}
      />
    </div>
    <div className='w-1/3 h-full'>
      <label className={labelClasses} htmlFor={`${label.toLowerCase().replace(/ /g, '-')}-currency`}>
        Currency
      </label>
      <Select
        id={`${label.toLowerCase().replace(/ /g, '-')}-currency`}
        options={currencyOptions}
        style={{ width: '100%' }}
        size='large'
        value={currency}
        showSearch
        onChange={onCurrencyChange}
        allowClear
        autoClearSearchValue
      />
    </div>
  </div>
)

export default CurrencySwapForm
