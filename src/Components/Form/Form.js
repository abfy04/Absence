import SubmitButton from "./SubmitButton"
export default function Form ({
  submitFunction,
  submitBtnTitle ,
  submitBtnIsDisabled,
  children ,
  maxWidth = 'md:max-w-sm', 
  isIncludeSubmitBtn = true,
  isBtnHidden = false
}) {
  return (
      <form className={`max-w-full  mx-auto px-2 md:px-0  ${maxWidth}`} onSubmit={submitFunction}>
          {children}
          <div className="flex justify-end">
          {
              isIncludeSubmitBtn &&
              <SubmitButton
                  disabled={submitBtnIsDisabled}
                  title={submitBtnTitle}
                  isBtnHidden = {isBtnHidden}
              />
          }

          </div>
         
          
      </form>
  )
}