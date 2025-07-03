import SubmitButton from "./SubmitButton";  // Fix import syntax

// Component for showing the error message
export const ErrorMsg = ({ value }) => {
  return value ? (
    <span className="my-1 w-full text-xs font-semibold text-red-600">{value}</span>
  ) : null;
};

// The container of the input, the label and the error message
export const FieldContainer = ({ label, children, error }) => {
  return (
    <div className="w-full mt-3">
      <div className="relative">
        <span className="px-1 mb-2 block text-sm font-medium">{label}</span>
        {children}
      </div>
      <ErrorMsg value={error} />
    </div>
  );
};

export function FormContainer({ children, title, icon: Icon }) {
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-600 dark:text-purple-400 rounded-t-lg px-8 py-4">
        <Icon className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="px-8 py-4 dark:bg-gray-900 bg-white rounded-b-lg">{children}</div>
    </div>
  );
}

export function Form({
  submitFunction,
  submitBtnTitle,
  submitBtnIsDisabled,
  children,
  maxWidth = "md:max-w-sm",
  isIncludeSubmitBtn = true,
  isBtnHidden = false,
}) {
  return (
    <form
      className={`max-w-full mx-auto px-2 md:px-0 ${maxWidth}`}
      onSubmit={submitFunction}
      autoComplete="off"
      method="POST"
    >
      {children}
      <div className="flex justify-end">
        {isIncludeSubmitBtn && (
          <SubmitButton disabled={submitBtnIsDisabled} title={submitBtnTitle} isBtnHidden={isBtnHidden} />
        )}
      </div>
    </form>
  );
}
