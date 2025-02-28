import {useState} from "react";
import {useRouter} from "next/navigation";
import { motion } from "motion/react";

interface ModalCourseProps {
    id: number;
    name: string | null,
    description: string,
    show: boolean,
    onClose: () => void;
}

const ModalCourse: React.FC<ModalCourseProps> = ({id, name, description, show, onClose}) => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const router = useRouter();

    const handleCardSelect = (level: any) => {
        setSelectedCard(level);
    };

    const handleStart = () => {
        if (selectedCard) {
            router.push(`/questions/${selectedCard.toLowerCase()}`);
        }
    }

    if (!show) return null;
    

    return(
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        tabIndex={-1}
        aria-hidden={!show}
        className={`${show ? "flex bg-black/50" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
        <div className="relative w-full max-w-md max-h-full backdrop-blur-xl">
            <div className="relative bg-transparent border border-neutral-100 shadow-sm shadow-neutral-100/50 rounded-lg">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {name}
                    </h3>
                    <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">SELECT YOUR DESIRED LEVEL:</p>
                    <ul className="space-y-4 mb-4 mt-2">

                        {/* Card 1 */}
                        <li onClick={() => handleCardSelect('Junior')}>
                            <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
                            <label htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5  text-gray-900 bg-transparent border border-white rounded-lg cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-violet-500 peer-checked:border-violet-600 dark:peer-checked:border-violet-600 peer-checked:text-violet-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-transparent dark:hover:bg-gray-600">                           
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Junior</div>
                                    <div className="w-full text-gray-500 dark:text-gray-400">{description}</div>
                                </div>
                                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                            </label>
                        </li>
                        
                        {/* Card 2 */}
                        <li onClick={() => handleCardSelect('Middle')}>
                            <input type="radio" id="job-2" name="job" value="job-2" className="hidden peer"/>
                            <label htmlFor="job-2" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-transparent border border-white rounded-lg cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-violet-500 peer-checked:border-violet-600 dark:peer-checked:border-violet-600 peer-checked:text-violet-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-transparent dark:hover:bg-gray-600">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Middle</div>
                                    <div className="w-full text-gray-500 dark:text-gray-400">{description}</div>
                                </div>
                                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                            </label>
                        </li>
                        
                        {/* Card 3 */}
                        <li onClick={() => handleCardSelect('Senior')}>
                            <input type="radio" id="job-3" name="job" value="job-3" className="hidden peer"/>
                            <label htmlFor="job-3" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-transparent border rounded-lg cursor-pointer dark:hover:text-gray-300 border-white dark:peer-checked:text-violet-500 peer-checked:border-violet-600 dark:peer-checked:border-violet-600 peer-checked:text-violet-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-transparent dark:hover:bg-gray-600">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Senior</div>
                                    <div className="w-full text-gray-500 dark:text-gray-400">{description}</div>
                                </div>
                                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                            </label>
                        </li>
                    </ul>

                    {/* Start Button */}
                    <button className="text-white inline-flex w-full cursor-pointer justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                            disabled={!selectedCard}
                            onClick={handleStart}>
                        Start
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
    )
}

export default ModalCourse;