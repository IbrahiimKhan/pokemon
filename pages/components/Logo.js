import Image from "next/image"
import Link from "next/link"
import logo from "../../public/Logo.png"
const Logo = () => {
  return (
    <div>
        <Link href='/'>
        <Image className=" logo mb-5 text-center d-flex" style={{margin:"0 auto"}} src={logo} ></Image>
        </Link>
    </div>
  )
}

export default Logo