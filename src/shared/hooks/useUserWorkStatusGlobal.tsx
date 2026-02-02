import { useEffect, useState } from "react";
import type { WorkStatus } from "../types";

/**
 * Allows us to share the users work status across micro frontend apps
 * using event messaging.
 */

type UseUserWorkStatusGlobalReturn = readonly [
  WorkStatus,
  React.Dispatch<React.SetStateAction<WorkStatus>>
]
export const useUserWorkStatusGlobal = ({status} : {status: WorkStatus}):UseUserWorkStatusGlobalReturn => {

    const [globalWorkStatus, setGlobalWorkStatus] = useState<WorkStatus>(status)

    const dispatchUserEvent = (status: string) => {
        const event = new CustomEvent("work-status-change", {
            detail: { status },
        });
        window.dispatchEvent(event);
    }

    useEffect(()=> {
        dispatchUserEvent(globalWorkStatus)
    },[globalWorkStatus])

  useEffect(() => {

    const handleUserStatusEvent = (event: CustomEvent<{ status: WorkStatus }>) => {
      setGlobalWorkStatus(event.detail.status);
    };

    window.addEventListener(
      "work-status-change",
      handleUserStatusEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        "work-status-change",
        handleUserStatusEvent as EventListener
      );
    };
  }, []);


  return [globalWorkStatus, setGlobalWorkStatus];
};
