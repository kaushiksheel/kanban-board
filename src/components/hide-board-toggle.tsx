import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { openSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";




export const HideSidebarToggle = () => {
  const {isOpen}=useSelector((state:RootState)=>state.sidebar)
  const dispatch=useDispatch()
  return (
    <>
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" checked={isOpen}  onClick={()=>dispatch(openSidebar(!isOpen))}/>
      <Label htmlFor="airplane-mode">Hide Sidebar</Label>
    </div>
   
    </>
  );
};
