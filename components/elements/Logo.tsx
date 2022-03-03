import Image  from 'next/image'
export const Logo = () => {
  return <Image src={'/assets/logo.png'} width={200} height={70} alt="Logo Image"/>
}