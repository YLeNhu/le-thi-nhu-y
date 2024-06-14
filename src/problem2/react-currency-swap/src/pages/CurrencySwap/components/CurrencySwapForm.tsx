import { background } from 'assets';

const CurrencySwapForm = () => {
    const inputClasses = "shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const labelClasses = "block text-gray-700 text-sm font-bold mb-2";

    return (
        <div className="welcome w-screen h-screen bg-white relative">
            <div className="bg-white z-10 w-full max-w-5xl rounded-lg shadow-lg shadow-black/20 px-10 py-10 text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* AMOUNT TO SEND SECTION */}
                <div className="flex space-x-4 mb-4">
                    <div className="w-2/3">
                        <label className={labelClasses} htmlFor="input-amount">
                            Amount to send
                        </label>
                        <input
                            className={inputClasses}
                            id="input-amount"
                            type="number"
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="w-1/3">
                        <label className={labelClasses} htmlFor="send-currency">
                            Currency
                        </label>
                        <select
                            className={inputClasses}
                            id="send-currency"
                        >
                        </select>
                    </div>
                </div>

                {/* AMOUNT TO RECEIVE SECTION */}
                <div className="flex space-x-4 mb-4">
                    <div className="w-2/3">
                        <label className={labelClasses} htmlFor="output-amount">
                            Amount to receive
                        </label>
                        <input
                            className={inputClasses}
                            id="output-amount"
                            type="number"
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="w-1/3">
                        <label className={labelClasses} htmlFor="receive-currency">
                            Currency
                        </label>
                        <select
                            className={inputClasses}
                            id="receive-currency"
                        >
                            {/* Add currency options here */}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            $2367
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            CONFIRM SWAP
                        </button>
                    </div>
                </div>
            </div>

            {/* Background section */}
            <div
                className="h-1/2 w-full p-4 lg:p-10 flex items-center justify-center shadow-lg absolute top-0 left-0"
                style={{ backgroundImage: `url(${background})` }}
            >
            </div>
        </div>
    );
};

export default CurrencySwapForm;