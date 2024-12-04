const { useState, useEffect, useRef } = React;
const { Link } = ReactRouterDOM;

export function LongText({ txt, length = 100 }) {
    const [longTxtButtonPressed, setLongTxtButtonPressed] = useState(false);
    const isTextLonger = txt.length > length;
    
	function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        const truncated = text.substring(0, maxLength);
        return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
    }

    const shownTxt = isTextLonger && !longTxtButtonPressed
        ? truncateText(txt, length)
        : txt;


    return (
        <section className='long-text-container'>
            <p>{shownTxt}</p>
            {isTextLonger && (
                <button onClick={() => setLongTxtButtonPressed(!longTxtButtonPressed)}>
                    {longTxtButtonPressed ? "Read less" : "Read more"}
                </button>
            )}
        </section>
    );
}
