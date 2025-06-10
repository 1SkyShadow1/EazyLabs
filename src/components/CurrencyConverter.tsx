
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDown } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '₿' }
];

export const CurrencyConverter = () => {
  const [currentCurrency, setCurrentCurrency] = useState('ZAR');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchExchangeRates();
    initializePrices();
  }, []);

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      // Using ExchangeRate-API with ZAR as base
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/ZAR');
      if (!response.ok) {
        throw new Error('Primary API failed');
      }
      const data = await response.json();
      
      // Add Bitcoin rate
      const ratesWithBTC = {
        ...data.rates,
        BTC: 0.0000015, // Mock Bitcoin rate relative to ZAR
        ZAR: 1 // Base currency
      };
      
      setExchangeRates(ratesWithBTC);
    } catch (error) {
      console.error('Primary exchange rate API failed:', error);
      
      // Fallback to Fixer.io or other service
      try {
        const fallbackResponse = await fetch('https://api.fixer.io/latest?base=ZAR');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setExchangeRates({
            ...fallbackData.rates,
            ZAR: 1,
            BTC: 0.0000015
          });
        } else {
          throw new Error('Fallback API also failed');
        }
      } catch (fallbackError) {
        console.error('All currency APIs failed, using mock rates:', fallbackError);
        // Use mock rates as last resort
        const mockRates = {
          ZAR: 1,
          USD: 0.054,
          EUR: 0.049,
          GBP: 0.042,
          JPY: 8.1,
          CAD: 0.074,
          AUD: 0.082,
          CHF: 0.048,
          CNY: 0.39,
          INR: 4.5,
          BTC: 0.0000015
        };
        setExchangeRates(mockRates);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const initializePrices = () => {
    // Set default prices in ZAR and store original values
    const priceElements = document.querySelectorAll('[data-price]');
    priceElements.forEach(element => {
      const price = element.getAttribute('data-price');
      if (price && !element.getAttribute('data-original-price')) {
        element.setAttribute('data-original-price', price);
        element.textContent = `R${price}`;
      }
    });
  };

  const convertCurrency = (targetCurrency: string) => {
    if (targetCurrency === currentCurrency || Object.keys(exchangeRates).length === 0) return;
    
    // Get all price elements and convert them
    const priceElements = document.querySelectorAll('[data-price]');
    
    priceElements.forEach(element => {
      const originalPrice = parseFloat(element.getAttribute('data-original-price') || '0');
      const targetRate = exchangeRates[targetCurrency] || 1;
      
      const convertedPrice = originalPrice * targetRate;
      const currency = currencies.find(c => c.code === targetCurrency);
      
      if (currency) {
        if (targetCurrency === 'BTC') {
          element.textContent = `${currency.symbol}${convertedPrice.toFixed(8)}`;
        } else {
          element.textContent = `${currency.symbol}${convertedPrice.toLocaleString('en-US', { 
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0 
          })}`;
        }
      }
    });
    
    setCurrentCurrency(targetCurrency);
  };

  return (
    <div className="flex items-center space-x-2">
      <ArrowDown className="text-green-400" size={18} />
      <Select value={currentCurrency} onValueChange={convertCurrency}>
        <SelectTrigger className="w-[140px] bg-black/60 border-green-400/30 text-green-300 font-mono">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-green-400/30">
          {currencies.map((currency) => (
            <SelectItem 
              key={currency.code} 
              value={currency.code}
              className="text-green-300 hover:bg-green-400/20 font-mono"
            >
              <span className="flex items-center space-x-2">
                <span>{currency.flag}</span>
                <span>{currency.symbol} {currency.code}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isLoading && (
        <div className="text-green-400 text-sm font-mono">Loading...</div>
      )}
    </div>
  );
};
