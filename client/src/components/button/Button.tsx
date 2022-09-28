import './Button.sass'

interface ButtonProps {
    children?: React.ReactNode,
    btnType?: string,
    onSomething: () => void
}

const Button = ({ children, btnType, onSomething }: ButtonProps) => {
    return (
        <button
            className={`button button-${btnType}`}
            onClick={() => onSomething()}
        >
            {children}
        </button>
    )
}

export default Button