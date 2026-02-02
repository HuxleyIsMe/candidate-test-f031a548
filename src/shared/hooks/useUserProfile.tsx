import { useEffect, useState } from "react";

/**
 * This allows us to send events from one MF to another regarding
 * UserProfile changes
 */
export const useUserProfile = (state) => {

    const [userState, setUserState] = useState(state)

    console.log('my status is', status)

    const dispatchUserEvent = (status: string) => {
        const event = new CustomEvent("work-status-change", {
        detail: { status },
    });
    window.dispatchEvent(event);
    }

    useEffect(()=> {
        dispatchUserEvent(userState)
    },[userState])

  useEffect(() => {

    const handleUserStatusEvent = (event: CustomEvent<{ status: string }>) => {
      setUserState(event.detail.status);
    };

    window.addEventListener(
      "work-status-change",
      handleUserStatusEvent as EventListener
    );

    // Clean up
    return () => {
      window.removeEventListener(
        "work-status-change",
        handleUserStatusEvent as EventListener
      );
    };
  }, []);

  return [userState, setUserState];
};
