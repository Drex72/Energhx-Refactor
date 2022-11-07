import { CircularProgress } from "@mui/material"

export const Loader = () => {
    return (
         <div className="flex items-center justify-center h-[100vh] w-[80%] my-0 mx-[auto] bg-[#112518]">
          <CircularProgress size={120} sx={{color:'#2DAD00'}} />
        </div>
    )
}