import React from "react";

type LoginFormSecondaryOptionProps = {
    text: string,
    href: string
}

const LoginRouteForm: React.FC = ({ children }) => {
    return (
        <div style={{ width: "50vw", minWidth: "250px" }}>
            {children}
        </div >
    );
}

const LoginFormSecondaryOption: React.FC<LoginFormSecondaryOptionProps> = ({ href, text }) => {
    return (
        <a href={href} style={{ textAlign: "center", padding: "1rem 0" }}>{text}</a>
    );
}


export { LoginRouteForm, LoginFormSecondaryOption };