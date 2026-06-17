import { useEffect } from "react";

function useBeforeUnload(shouldWarn: boolean, message: string = "You have unsaved changes. Are you sure you want to leave?") {
  useEffect(() => {
    if (!shouldWarn) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldWarn, message]);
}

export default useBeforeUnload;
