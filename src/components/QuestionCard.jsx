import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const QuestionCard = ({ title, answer }) => {
    const [isOpen, setIsOpen] = useState(false)
    const changeState = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            {
                isOpen ?
                    // this is for when it's open
                    <div onClick={changeState} className="question">
                        <div className="questionHeader">
                            <h3>{title}</h3>
                            <FaAngleUp />
                        </div>
                        <p>{answer}</p>
                    </div>
                    :
                    // this is for when it's closed
                    <div onClick={changeState} className="question">
                        <div className="questionHeader">
                            <h3>{title}</h3>
                            <FaAngleDown />
                        </div>
                    </div>
            }
        </>
    );
}

export default QuestionCard;