import { useEffect } from 'react'
import CurrencySwapForm from './components/CurrencySwapForm'
import { RootState, useAppDispatch } from 'store'
import { getCurrencyList } from './currency.slice'
import { useSelector } from 'react-redux'

export default function CurrencySwap() {
  const dispatch = useAppDispatch() // Redux hook to get dispatch function

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        await dispatch(getCurrencyList())
      } catch (error) {
        console.error('Error fetching currency list:', error)
      }
    }

    fetchCurrencyList()
  }, [dispatch])

  return (
    <div className='welcome w-screen h-screen bg-white relative'>
      {/* Currency swap form section */}
      <CurrencySwapForm />

      {/* Background section */}
      <div className='h-1/2 w-full bg-gradient-to-l from-blue-800 to-indigo-900 text-center p-4 lg:p-10 shadow-lg absolute top-0 left-0'>
        <p className='text-white text-4xl font-bold'>Quick Assets Swap</p>
        <p className='text-white text-xl p-2'>Swap assets with live exchange rate</p>
      </div>

      {/* Credit section */}
      <p className='absolute bottom-0 w-full text-center text-sm p-2'>y.contact.here@gmail.com</p>
    </div>
  )
}
