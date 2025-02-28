import { FunctionComponent, ReactNode } from "react"

const ErrorText: FunctionComponent<{ className?: string | null, children: ReactNode }> = ({ className = '', children }) => {
    return <p className={`text-center text-red-500 ${className}`}>{children}</p>
}

export default ErrorText
