import SubmitButton from "./SubmitButton"
export default function Form ({submitFunction,submitBtnTitle ,submitBtnIsDisabled,children ,maxWidth = 'md:max-w-sm'}){
    return (
        <form className={`max-w-full  mx-auto px-2 md:px-0  ${maxWidth}`} onSubmit={submitFunction}>
            {children}
            <SubmitButton
                disabled={submitBtnIsDisabled}
                title={submitBtnTitle}
            />
        </form>
    )
}