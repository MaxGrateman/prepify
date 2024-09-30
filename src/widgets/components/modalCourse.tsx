import {useState} from "react";
import './../styles/modalCourse.css'
import {useRouter} from "next/navigation";

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
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0, 0, 0.6)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg" >
                <div className="modal-content my-2 p-4" style={{ backgroundColor: 'rgba(217,217, 217, 100)' }}>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
                        <h5 className="modal-title fs-5 text fw-bold p-4">{name}</h5>
                        <button type="button" className="btn-close mb-5" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        <h3 className="fs-2 text fw-bold mt-2">Choose your level</h3>
                        <div>
                            <div className="d-flex flex-row justify-content-md-between mt-5">
                                {/* Card 1 */}
                                <div className="col-sm-4">
                                    <div
                                        className={`card modal-card ${selectedCard === 'Junior' ? 'active' : ''}`}
                                        onClick={() => handleCardSelect('Junior')}
                                        style={{ cursor: 'pointer', opacity: selectedCard && selectedCard !== 'Junior' ? 0.5 : 1 }}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">Junior</h5>
                                            <p className="card-text">{description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="col-sm-4">
                                    <div
                                        className={`card modal-card ${selectedCard === 'Middle' ? 'active' : ''}`}
                                        onClick={() => handleCardSelect('Middle')}
                                        style={{ cursor: 'pointer', opacity: selectedCard && selectedCard !== 'Middle' ? 0.5 : 1 }}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">Middle</h5>
                                            <p className="card-text">{description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="col-sm-4">
                                    <div
                                        className={`card modal-card ${selectedCard === 'Senior' ? 'active' : ''}`}
                                        onClick={() => handleCardSelect('Senior')}
                                        style={{ cursor: 'pointer', opacity: selectedCard && selectedCard !== 'Senior' ? 0.5 : 1 }}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">Senior</h5>
                                            <p className="card-text">{description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Start Button */}
                            <button
                                className="btn modal-button mt-4 fs-4"
                                disabled={!selectedCard}
                                onClick={handleStart}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCourse;