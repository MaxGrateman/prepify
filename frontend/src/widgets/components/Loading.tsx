import { CgSpinnerTwo, CgSpinnerTwoAlt } from "react-icons/cg";


function Loading() {
    return(
        <div className="relative flex items-center justify-center w-[100%] h-auto mt-52">
            <CgSpinnerTwo className="absolute size-20 animate-spinReverse text-gray-400" />
            <CgSpinnerTwoAlt className="absolute size-20 animate-spin text-gray-500" />
        </div>
    )
}

export default Loading;