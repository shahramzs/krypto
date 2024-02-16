import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../../images/logo2.png'
import {useState} from 'react'

const NavbarItems = ({title, classProps}) => {
    return (
        <li className={`mx-4  cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='w-full  flex flex-initial justify-between items-center '>
                <img src={logo} alt = 'logo' className='place-items-start w-8 flex cursor-pointer mr-10'/>
                <ul className='w-full text-white md:flex hidden list-nine flex-row justify-space items-center flex-initial'>
                    {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                        <NavbarItems key={item + index} title={item} classProps={'mx-5 hover:text-slate-500 '}/>
                    ))}
                    <li className='w-full mx-10  justify-end'>
                        <FaRegUserCircle fontSize={23} className='cursor-pointer float-right  hover:text-slate-500'/>
                    </li>
                </ul>
                <div className='flex  relative'>
                    {toggleMenu
                        ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)}/>
                        : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)}/>
                    }
                    {toggleMenu && (
                        <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                            <li className='text-xl w-full my-2'> 
                                <AiOutlineClose onClick={()=>setToggleMenu(false)}/>
                            </li>
                            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                                <NavbarItems key={item + index} title={item} classProps="my-2 text-lg"/>
                            ))}
                             <li className='mx-4 rounded-full cursor-pointer'>
                               <FaRegUserCircle fontSize={28} />
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;