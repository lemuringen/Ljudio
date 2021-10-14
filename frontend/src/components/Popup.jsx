import React from 'react'
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons/lib';

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <IconContext.Provider value={{ color: '#fff' }} />
                <div className="close-btn" onClick={() => props.setTrigger(false)}><AiIcons.AiOutlineClose /></div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup
