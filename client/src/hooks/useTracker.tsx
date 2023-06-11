import { useState, useEffect } from "react";
import { createEntry } from "../routes/routes";
import useTagInput from "../hooks/useTagInput";
import { TimeEntryModel } from "../common/TimeEntryModel";

export function useTracker(
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isTrackerRunning, setIsTrackerRunning] = useState(false);
  const [isTrackerPause, setIsTrackerPause] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [tag, setTag] = useTagInput("");

  let TimeTracked: TimeEntryModel = {
    duration,
    tag,
  };

  const startTimer = () => {
    setStartTime(Date.now());
    setIsTrackerRunning(true);
    setIsTrackerPause(false);
  };

  const pauseTimer = () => {
    setStartTime(Date.now());
    setIsTrackerPause(true);
  };

  const stopTimer = () => {
    setIsTrackerRunning(false);
    setIsTrackerPause(false);
    setDuration(0);
    TimeTracked = {
      ...TimeTracked,
      duration: duration,
      tag: tag,
    };
    setTimerId(0);
    setTag("");
    createEntry(TimeTracked);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    let timer: any = null;
    if (isTrackerRunning && !isTrackerPause) {
      timer = setInterval(() => {
        setDuration((duration) => duration + 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isTrackerRunning, isTrackerPause]);

  function toggleTimeTracker() {
    if (isTrackerRunning) {
      TimeTracked = {
        ...TimeTracked,
        duration: duration,
        tag: tag,
      };
      setDuration(0);
      setTimerId(0);
      setIsTrackerRunning(false);
      setTag("");
      clearInterval(timerId);

      createEntry(TimeTracked);

      setRefresh((prev) => !prev);
    } else {
      const startTimestamp = Date.now() - duration;
      const id = setInterval(() => {
        const currentDuration = Date.now() - startTimestamp;
        setDuration(currentDuration);
      }, 1000);

      setTimerId(id);
      setIsTrackerRunning(true);
    }
  }

  return {
    duration,
    isTrackerRunning,
    isTrackerPause,
    toggleTimeTracker,
    tag,
    setTag,
    startTime,
    startTimer,
    pauseTimer,
    stopTimer,
  };
}
