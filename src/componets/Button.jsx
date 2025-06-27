import ButtonLoading from "./ButtonLoading"

const Button = ({ type, text, color = 'blue', loading, onClick }) => {
    if (loading) return <ButtonLoading color={color} />

    return (
        <button
            onClick={onClick}
            type={type}
            className={`
                text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800
            `}
        >
            {text}
        </button>
    )
}
export default Button
