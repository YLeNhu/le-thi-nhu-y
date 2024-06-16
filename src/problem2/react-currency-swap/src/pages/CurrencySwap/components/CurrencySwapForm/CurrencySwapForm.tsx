import { InputNumber, InputNumberProps, Select } from 'antd'
import { useState } from 'react'
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

  const currencyOptions = sanitizeCurrencyData(currencyList);

  const [inputAmount, setInputAmount] = useState<number | null>(1);
  const [outputAmount, setOutputAmount] = useState<number | null>(1);

  const [inputCurrency, setInputCurrency] = useState('ETH');
  const [outputCurrency, setOutputCurrency] = useState('USDC');

  const calculateBasedOnRate = (data: CurrencyFormData) => {

    const inputPrice = currencyList.filter((item) => item.currency == data.inputCurrency)[0].price;
    const outputPrice = currencyList.filter((item) => item.currency == data.outputCurrency)[0].price;
    const rate = outputPrice !== 0 ? inputPrice / outputPrice : 0;

    const convertedOutputAmount = data.inputAmount ? parseFloat((rate * data.inputAmount).toFixed(5)) : 0;
    setOutputAmount(convertedOutputAmount);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData: CurrencyFormData = {
      inputAmount: inputAmount,
      outputAmount: outputAmount,
      inputCurrency: inputCurrency,
      outputCurrency: outputCurrency,
    }
    console.log(formData);
    calculateBasedOnRate(formData);
  }

  const onInput: InputNumberProps['onInput'] = (value) => {
    const inputValue = parseFloat(value);
    setInputAmount(inputValue);

    const formData = {
      inputAmount: inputValue,
      outputAmount: outputAmount,
      inputCurrency: inputCurrency,
      outputCurrency: outputCurrency,
    };

    calculateBasedOnRate(formData);
  };

  return (
    <>
      {loading ? (
        <CurrencyFormSkeleton />
      ) : (
        <form
          onSubmit={handleSubmit}
          className='bg-white z-10 w-full max-w-5xl rounded-lg shadow-lg shadow-black/20 px-10 py-10 text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        >
          {/* AMOUNT TO SEND SECTION */}
          <div className='flex space-x-4 mb-4'>
            <div className='w-2/3'>
              <label className={labelClasses} htmlFor='input-amount'>
                Amount to send
              </label>

              <InputNumber
                id='input-amount'
                size='large'
                placeholder='Enter amount'
                type='number'
                min={0}
                style={{ width: '100%' }}
                value={inputAmount}
                // onChange={(value) => handleChangeCurrency(value as number, 'inputAmount')}
                onInput={onInput}
              />
            </div>

            <div className='w-1/3 h-full'>
              <label className={labelClasses} htmlFor='send-currency'>
                Currency
              </label>

              <Select
                id='send-currency'
                options={currencyOptions}
                style={{ width: '100%' }}
                size='large'
                value={inputCurrency}
                showSearch
                onChange={(value) => setInputCurrency(value)}
                allowClear
                autoClearSearchValue
              />

            </div>
          </div>

          {/* AMOUNT TO RECEIVE SECTION */}
          <div className='flex space-x-4 mb-4'>
            <div className='w-2/3'>
              <label className={labelClasses} htmlFor='output-amount'>
                Amount to receive
              </label>

              <InputNumber
                id='output-amount'
                size='large'
                placeholder='Enter amount'
                type='number'
                min={0}
                style={{ width: '100%' }}
                value={outputAmount}
                onChange={(value) => setOutputAmount(value as number)}
              />
            </div>

            <div className='w-1/3 h-full'>
              <label className={labelClasses} htmlFor='receive-currency'>
                Currency
              </label>

              <Select
                id='receive-currency'
                style={{ width: '100%' }}
                size='large'
                value={outputCurrency}
                showSearch
                options={currencyOptions}
                onChange={(value) => setOutputCurrency(value)}
                allowClear
                autoClearSearchValue
              />
            </div>
          </div>

          <div className='flex flex-col space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='inline-flex items-center text-base font-semibold text-gray-900'>$2367</div>

              {/* Swap button */}
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
              >
                CONFIRM SWAP
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default CurrencySwapForm
