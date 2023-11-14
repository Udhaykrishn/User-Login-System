import React from "react";

type Button={
    className:string;
    type:"submit";
    children:React.ReactNode
}

const Button = ({type,className,children}:Button) => {
  return (
    <>
        <button type={type} className={className} >
            {children}
        </button>
    </>
  )
}

export default Button