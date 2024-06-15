import { Input, Select } from "antd";
import { useState } from "react"
import currencyList from "./initialCurrencyList";

const initialFormData = {
  currencyList: currencyList,
  inputAmount: 1.0,
  outputAmount: 1.0,
  loading: false,
  currentRequestCurrencyId: 1
}

const seenCurrencies = new Set();
interface Option {
  value: string;
  label: string;
}

const optionList: Option[] = [];

currencyList.forEach(item => {
  if (!seenCurrencies.has(item.currency)) {
    seenCurrencies.add(item.currency);
    optionList.push({
      value: item.currency,
      label: item.currency
    });
  }
});

const CurrencySwapForm = () => {
  const [formData, setFormData] = useState(initialFormData);


  const inputClasses =
    'shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  const labelClasses = 'block text-gray-700 text-sm font-bold mb-2'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  }

  const handleInputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);

    setFormData((prev) => ({
      ...prev,
      inputAmount: inputValue,
      outputAmount: inputValue * 5,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white z-10 w-full max-w-5xl rounded-lg shadow-lg shadow-black/20 px-10 py-10 text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' >
      {/* AMOUNT TO SEND SECTION */}
      < div className='flex space-x-4 mb-4' >
        <div className='w-2/3'>
          <label className={labelClasses} htmlFor='input-amount'>
            Amount to send
          </label>

          <Input
            id='input-amount'
            size="large"
            type='number'
            placeholder='Enter amount'
            value={formData.inputAmount}
            onChange={handleInputAmount}
          />
        </div>

        <div className='w-1/3 h-full'>
          <label className={labelClasses} htmlFor='send-currency'>
            Currency
          </label>
          <Select
            defaultValue={optionList[0].value}
            style={{ width: '100%', height: '100%' }}
            onChange={(value: string) => {
              console.log(`selected ${value}`);
            }}
            size="large"
            options={optionList}
          />
        </div>
      </ div>

      {/* AMOUNT TO RECEIVE SECTION */}
      <div className='flex space-x-4 mb-4' >
        <div className='w-2/3'>
          <label className={labelClasses} htmlFor='output-amount'>
            Amount to receive
          </label>

          <Input
            id='output-amount'
            size="large"
            type='number'
            disabled
            placeholder='Amount to receive'
            value={formData.outputAmount}
          />
        </div>

        <div className='w-1/3 h-full'>
          <label className={labelClasses} htmlFor='receive-currency'>
            Currency
          </label>
          <Select
            defaultValue={optionList[1].value}
            style={{ width: '100%', height: '100%' }}
            onChange={(value: string) => {
              console.log(`selected ${value}`);
            }}
            size="large"
            options={optionList}
          />
        </div>
      </div >

      <div className='flex flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='inline-flex items-center text-base font-semibold text-gray-900'>$2367</div>

          {/* Swap button */}
          <button type='submit' className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
            CONFIRM SWAP
          </button>
        </div>
      </div>
    </form >
  )
}

export default CurrencySwapForm
