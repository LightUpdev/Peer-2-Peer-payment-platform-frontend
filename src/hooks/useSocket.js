// src/hooks/useSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../utils/socket";
import { addNotification } from "../features/notifications/notificationsSlice";

const useSocket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // Emit userLogin event with user ID
      socket.emit("userLogin", user.id);
    }

    // Listen for notification events
    socket.on("transactionInitiated", (data) => {
      dispatch(addNotification({ type: "info", message: data.message }));
    });

    socket.on("transactionCompleted", (data) => {
      dispatch(addNotification({ type: "success", message: data.message }));
    });

    socket.on("transactionFailed", (data) => {
      dispatch(addNotification({ type: "error", message: data.message }));
    });

    socket.on("transactionReceived", (data) => {
      dispatch(addNotification({ type: "success", message: data.message }));
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("transactionInitiated");
      socket.off("transactionCompleted");
      socket.off("transactionFailed");
      socket.off("transactionReceived");
    };
  }, [user, dispatch]);

  return socket;
};

export default useSocket;
