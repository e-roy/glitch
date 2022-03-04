import MicImage from './mic.png'
import Image from 'next/image'

export const Hero = () => (
    <div className='flex px-10'>
        <div className="font-oxanium text-2xl md:text-6xl self-center z-10">
            Stream and create on Chain with <span className="text-secondary">Video NFTs!</span>
        </div>
        <div className='sm:bg-backgroundLight bg-backgroundLight/20 sm:-ml-14 p-8 sm:-mt-16 lg:-ml-28'> 
            <Image src={MicImage} width={620}/>
        </div>
    </div>
)