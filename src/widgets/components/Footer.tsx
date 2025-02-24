import Link from "next/link";

function Footer() {

    return(
        <footer className="w-[98%] h-64 flex justify-center text-white bg-transparent mt-96">
            <p className="text-white font-bold text-5xl w-full mx-auto max-w-screen-xl p-5 md:flex md:items-start md:justify-betweens">Prepify</p>
            <div className="w-[90%] flex flex-wrap items-start justify-between sm:mt-0 p-5 tracking-widest">
                <div className="text-2xl flex flex-col gap-4">
                    <p className="hover:underline">Almaty, Kazakhstan</p>
                    <p className="hover:underline">contactus@gmail.com</p>
                </div>
                <div className="text-2xl flex flex-col justify-between gap-4">
                    <Link className="hover:underline me-4 md:me-6" href="#">Telegram</Link>
                    <Link className="hover:underline me-4 md:me-6" href="#">Xcom</Link>
                    <Link className="hover:underline me-4 md:me-6" href="#">LinkedIn</Link>
                </div>
                <div className="text-2xl flex flex-col justify-between gap-4">
                    <Link className="hover:underline me-4 md:me-6" href="/about">About us</Link>
                    <Link className="hover:underline me-4 md:me-6" href="#">Support</Link>
                    <Link className="hover:underline me-4 md:me-6" href="#">Contect</Link>
                </div>
                <div className="text-2xl flex flex-col justify-between gap-4">
                    <Link className="hover:underline me-4 md:me-6" href="#">Terms</Link>
                    <Link className="hover:underline me-4 md:me-6" href="#">Coockies</Link>
                    <Link className="hover:underline me-4 md:me-6" href="#">Settings</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;