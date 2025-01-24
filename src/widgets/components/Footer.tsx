import Link from "next/link";

function Footer() {

    return(
        <footer className="w-[100%] h-64 flex justify-center text-white bg-transparent mt-96">
            <div className="w-[95%] grid grid-cols-8 gap-60">
                <p className="text-white font-bold text-5xl cursor-pointer col-span-2">Prepify</p>
                <div className="grid grid-rows-4 gap-2 text-xl col-span-2">
                    <p>Almaty, Kazakhstan</p>
                    <p>contactus@gmail.com</p>
                </div>
                <div className="grid grid-rows-4 gap-2 text-xl">
                    <Link href="#">Telegram</Link>
                    <Link href="#">Xcom</Link>
                    <Link href="#">LinkedIn</Link>
                </div>
                <div className="grid grid-rows-4 gap-2 text-xl">
                    <Link href="#">About us</Link>
                    <Link href="#">Support</Link>
                    <Link href="#">Contect</Link>
                </div>
                <div className="grid grid-rows-4 gap-2 text-xl">
                    <Link href="#">Terms</Link>
                    <Link href="#">Coockies</Link>
                    <Link href="#">Settings</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;