'use client'

import { useState, useEffect, useCallback } from 'react'

const IPINFO_TOKEN = 'fe1ca889193aac'

// Base prices in USD
const BASE_PRICES_USD = {
  basic: 499,
  pro: 999,
  enterprise: 1499,
}

// Country → Currency mapping
const COUNTRY_CURRENCY_MAP = {
  US: { currency: 'USD', symbol: '$', rate: 1, label: 'US Dollar' },
  CA: { currency: 'CAD', symbol: 'CA$', rate: 1.38, label: 'Canadian Dollar' },
  MX: { currency: 'MXN', symbol: 'MX$', rate: 17.5, label: 'Mexican Peso' },
  GB: { currency: 'GBP', symbol: '£', rate: 0.79, label: 'British Pound' },
  DE: { currency: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  FR: { currency: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  IT: { currency: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  ES: { currency: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  NL: { currency: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  PT: { currency: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  KE: { currency: 'KES', symbol: 'KSh ', rate: 130, label: 'Kenyan Shilling' },
  NG: { currency: 'NGN', symbol: '₦', rate: 1600, label: 'Nigerian Naira' },
  ZA: { currency: 'ZAR', symbol: 'R', rate: 18.5, label: 'South African Rand' },
  CN: { currency: 'CNY', symbol: '¥', rate: 7.24, label: 'Chinese Yuan' },
  JP: { currency: 'JPY', symbol: '¥', rate: 150, label: 'Japanese Yen' },
  IN: { currency: 'INR', symbol: '₹', rate: 83.5, label: 'Indian Rupee' },
  BR: { currency: 'BRL', symbol: 'R$', rate: 4.95, label: 'Brazilian Real' },
  AR: { currency: 'ARS', symbol: 'AR$', rate: 850, label: 'Argentine Peso' },
  AU: { currency: 'AUD', symbol: 'A$', rate: 1.52, label: 'Australian Dollar' },
  NZ: { currency: 'NZD', symbol: 'NZ$', rate: 1.63, label: 'New Zealand Dollar' },
  CH: { currency: 'CHF', symbol: 'CHF ', rate: 0.88, label: 'Swiss Franc' },
  SE: { currency: 'SEK', symbol: 'kr', rate: 10.5, label: 'Swedish Krona' },
  NO: { currency: 'NOK', symbol: 'kr', rate: 10.8, label: 'Norwegian Krone' },
  DK: { currency: 'DKK', symbol: 'kr', rate: 6.9, label: 'Danish Krone' },
  AE: { currency: 'AED', symbol: 'د.إ', rate: 3.67, label: 'UAE Dirham' },
  SA: { currency: 'SAR', symbol: '﷼', rate: 3.75, label: 'Saudi Riyal' },
  SG: { currency: 'SGD', symbol: 'S$', rate: 1.34, label: 'Singapore Dollar' },
  KR: { currency: 'KRW', symbol: '₩', rate: 1350, label: 'South Korean Won' },
  DEFAULT: { currency: 'USD', symbol: '$', rate: 1, label: 'US Dollar' },
}

// Manual currency switcher options (shown in UI)
export const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', label: 'USD - US Dollar' },
  { code: 'EUR', symbol: '€', label: 'EUR - Euro' },
  { code: 'GBP', symbol: '£', label: 'GBP - British Pound' },
  { code: 'KES', symbol: 'KSh', label: 'KES - Kenyan Shilling' },
  { code: 'BRL', symbol: 'R$', label: 'BRL - Brazilian Real' },
  { code: 'CNY', symbol: '¥', label: 'CNY - Chinese Yuan' },
  { code: 'INR', symbol: '₹', label: 'INR - Indian Rupee' },
  { code: 'NGN', symbol: '₦', label: 'NGN - Nigerian Naira' },
]

// Get currency info by currency code
function getCurrencyByCode(code) {
  for (const country of Object.values(COUNTRY_CURRENCY_MAP)) {
    if (country.currency === code) return country
  }
  return COUNTRY_CURRENCY_MAP.DEFAULT
}

// Detect user's currency via IP
async function detectUserCurrency() {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
    if (!response.ok) throw new Error('IP detection failed')
    
    const data = await response.json()
    const countryCode = data.country
    
    return COUNTRY_CURRENCY_MAP[countryCode] || COUNTRY_CURRENCY_MAP.DEFAULT
  } catch (error) {
    console.log('IP detection failed, using USD:', error.message)
    return COUNTRY_CURRENCY_MAP.DEFAULT
  }
}

// Format price based on currency
export function formatPrice(amountUSD, currencyInfo) {
  const converted = Math.round(amountUSD * currencyInfo.rate)
  
  // Handle currencies that don't use decimals (JPY, KRW)
  const noDecimalCurrencies = ['JPY', 'KRW']
  
  if (noDecimalCurrencies.includes(currencyInfo.currency)) {
    return `${currencyInfo.symbol}${converted.toLocaleString()}`
  }
  
  // Format with commas for thousands
  return `${currencyInfo.symbol}${converted.toLocaleString()}`
}

// Hook to use currency throughout the app
export default function useCurrency() {
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize currency
  useEffect(() => {
    const initCurrency = async () => {
      // Check localStorage first
      const savedCurrency = localStorage.getItem('preferred_currency')
      
      if (savedCurrency) {
        const parsed = JSON.parse(savedCurrency)
        setCurrencyInfo(parsed)
        setLoading(false)
        return
      }

      // Detect from IP
      const detected = await detectUserCurrency()
      setCurrencyInfo(detected)
      localStorage.setItem('preferred_currency', JSON.stringify(detected))
      setLoading(false)
    }

    initCurrency()
  }, [])

  // Change currency manually
  const changeCurrency = useCallback((currencyCode) => {
    const newCurrency = getCurrencyByCode(currencyCode)
    setCurrencyInfo(newCurrency)
    localStorage.setItem('preferred_currency', JSON.stringify(newCurrency))
  }, [])

  // Get price for a specific plan
  const getPrice = useCallback((plan) => {
    if (!currencyInfo) return ''
    const basePrice = BASE_PRICES_USD[plan]
    if (!basePrice) return ''
    return formatPrice(basePrice, currencyInfo)
  }, [currencyInfo])

  return {
    currencyInfo,
    loading,
    changeCurrency,
    getPrice,
    basePrices: BASE_PRICES_USD,
  }
}