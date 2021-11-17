import { useCallback, useState } from 'react'
//useInput
export function useInput(init = "") {
    let [value, setValue] = useState(init);

    let onChange = useCallback(function onChange(e) {
        setValue(e.target.value);
    }, []);


    return { value: { value, onChange }, setValue };
}

// export function useDiv(init = "") {
// let [html, setValue] = useState(init);

// let onChange = useCallback(function onChange(e) {
//     setValue(e.target.value);
// }, []);


// return { value: { html, onChange }, setValue };
// }




//useDiv
export function useDiv(att, placeText, datas, idx, changeEvent) {
    let className = att
    let html = isNaN(idx) ? placeText : datas[idx][att]
    let disabled = isNaN(idx) ? true : false
    let onBlur = (e) => {
        changeEvent(idx, att, e.target.textContent);
    }
    let onKeyPress = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            changeEvent(idx, att, e.target.textContent);
        }

    }

    return { className, html, disabled, onBlur, onKeyPress }
}
