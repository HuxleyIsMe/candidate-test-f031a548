import { useSelector, useDispatch } from "react-redux";
import { useUserWorkStatusGlobal } from "../../shared/hooks";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import { useEffect } from "react";
import workStatusLooking from "../assets/workstatus_looking.png"
import workStatusPassive from "../assets/workstatus_passive.png"
import workStatusNotLooking from "../assets/workstatus_not_looking.png"


const imageMap = {
  looking: workStatusLooking,
  passive: workStatusPassive,
  not_looking: workStatusNotLooking
}
const STATUS_LABELS: Record<WorkStatus, string> = {
  looking: "Currently looking for work",
  passive: "Passively looking for work",
  not_looking: "Don't want to hear about work",
};


interface WorkCardInterface {
  label: WorkStatus
  key: number
  isChecked: boolean
  onChange: (status: WorkStatus) => void
}
const WorkCard = ({label, key, isChecked, onChange} : WorkCardInterface ) => {
  return (
    <div key={key} onClick={(e) => { e.stopPropagation(); onChange(label)}} className={`rounded-lg shadow-sm  w-full p-2 cursor-pointer h-28 hover:bg-red-100 transition-colors mt-2 mb-2 mb-2 flex flex-row items-center justify-around ${isChecked && 'border border-red-500'}`}>
        <input
          type="radio"
          id={label}
          name="profile_status"
          value={label}
          checked={isChecked}
          onChange={(e) => { e.stopPropagation(); onChange(label)}}
        />
      <label htmlFor={label} className="w-36 p-2">
        {STATUS_LABELS[label]}
      </label>

      <div className="h-full flex items-center">
        <img src={imageMap[label]} className="max-h-full max-w-full object-contain"  alt={`Cat illustrations ${label}`} />;
      </div>
    </div>
  )


}

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  const [globalWorkStatus, setGlobalWorkStatus] = useUserWorkStatusGlobal({status:profile.workStatus as WorkStatus})

  useEffect(()=> {
    dispatch(updateWorkStatus(globalWorkStatus))
  }, [globalWorkStatus])

  const handleStatusChange = (nextStatus: WorkStatus) => {
    dispatch(updateWorkStatus(nextStatus));
    setGlobalWorkStatus(nextStatus)
  };

  const Cards = Object.keys(STATUS_LABELS).map((entry, index) => WorkCard({key:index, label: entry as WorkStatus, isChecked: profile.workStatus === entry , onChange: handleStatusChange}))

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <form className="py-2">
        <p>Update your availability for new opportunities:</p>
      </form>
        {...Cards}
        <p className="mt-4 text-gray-500">
          Your current status:{" "}
          <strong>{STATUS_LABELS[profile.workStatus]}</strong>
        </p>
    </div>
  );
};
