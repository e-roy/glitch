import { ethers } from "ethers"
import { useEffect, useState } from "react"

type UseHashProps = {
	address: string
	hash?: string
}

export const useHash = ({ address, hash }: UseHashProps) => {
	const secret = process.env.SECRET || "coolstreams"
	const [hashedAddress, setHashedAddress] = useState('')
	const [isEqual, setIsEqual] = useState(false)

	useEffect(() => {
		if (encrypt() === hash) setIsEqual(true)
	}, [hash])

	useEffect(() => {
		setHashedAddress(encrypt())
	}, [address])
	
	const encrypt  = () => {
		return ethers.utils.hashMessage(`${address}::${secret}`);
	}

	return {
		isEqual,
		hashedAddress
	}
}