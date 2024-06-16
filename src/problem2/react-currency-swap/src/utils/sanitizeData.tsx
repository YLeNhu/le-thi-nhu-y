import { Currency } from "types/currency.type";
interface CurrencyOption {
    value: string
    label: string
}

const sanitizeCurrencyData = (currencyList: Currency[]): CurrencyOption[] => {
    const seenCurrencies = new Set()

    const currencyOptions: CurrencyOption[] = []

    currencyList.forEach((item) => {
        if (!seenCurrencies.has(item.currency) && item.price) {
            seenCurrencies.add(item.currency)
            currencyOptions.push({
                value: item.currency,
                label: item.currency
            })
        }
    })
    return currencyOptions;
}

export default sanitizeCurrencyData;