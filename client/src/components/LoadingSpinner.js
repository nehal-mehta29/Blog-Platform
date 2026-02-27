/*===================== Loading Spinner Animation =====================*/

export default function LoadingSpinner(){
    return(
        <div className="flex items-center justify-center h-screen">

            {/*Loading spinner using Tailwind CSS */}
            <div className="
                w-12 h-12   /* Size of spinner */
                border-4 border-t-4
                border-gray-200  
                border-t-blue-500 
                rounded-full   /*To make the spinner circular*/
                animate-spin  /*To add rotating/spinning animation*/
            ">
            </div>
        </div>
    );
}