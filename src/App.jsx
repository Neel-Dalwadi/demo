import './App.css'
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (amount <= 0) return;
    setLoading(true);
    setError('');
    setConvertedAmount(0);

    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      // console.log(res)
      const data = await res.json();
      // console.log(data)
      const rate = data.rates[toCurrency];
      // console.log(rate)
      const result = amount * rate;
      console.log(result);
      setConvertedAmount(result);
    } catch (err) {
      setError('Failed to fetch conversion rate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-8">
          💱 Currency Converter
        </h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="currency_amount" className="block text-gray-700 font-semibold mb-2">
              Enter Amount
            </label>
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 font-medium shadow-sm 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="currency_from" className="block text-gray-700 font-semibold mb-2">
                From
              </label>
              <select
                id="currency_from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 font-medium shadow-sm 
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
              </select>
            </div>

            <div>
              <label htmlFor="currency_to" className="block text-gray-700 font-semibold mb-2">
                To
              </label>
              <select
                id="currency_to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 font-medium shadow-sm 
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConvert}
            disabled={loading || amount <= 0}
            className={`w-full font-semibold py-3 rounded-lg shadow-md transition-all duration-200
              ${loading || amount <= 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}
            `}
          >
            {loading ? 'Converting...' : 'Convert Currency'}
          </button>
        </form>

        <div>
          <hr className="my-6 border-gray-300" />

          {convertedAmount > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold text-green-700">
                {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
              </h2>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <h2 className="text-red-700 font-semibold">{error}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
