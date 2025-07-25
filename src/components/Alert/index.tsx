import { useState } from "react";

const Alert = (props: any) => {
     const { message } = props;
     const [isVisible, setIsVisible] = useState(true);

     if (!isVisible) {
          return null;
     }

     return (
          <div className="text-red-800 fixed top-3 left-0 right-0 flex justify-center">
               <div className="p-4 bg-red-100 w-56 text-center rounded-md relative">
                    <p>{message}</p>
                    <button
                         className=" text-red-900 text-xl rounded-sm absolute bottom-2 right-2 cursor-pointer"
                         onClick={() => {
                              setIsVisible(false);
                         }}
                    >
                         ×
                    </button>
               </div>
          </div>
     );
};

export default Alert;
