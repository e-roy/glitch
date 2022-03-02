import { useEffect, useState } from 'react'
import Router from 'next/router'

export const useUser = () => {
  const [address, setAddress] = useState<string>()
  useEffect(() => {
    fetch('/api/wallet/me')
    .then(value => value.json())
    .then(data => setAddress(data.address))
    .catch(_ => setAddress(''))
  }, [])
  return { address }
}