import { toast } from "react-toastify";

// Success Message
export const S = (message) => {
    toast.success(message);
};

// Error Message
export const Errormessage = (message) => {
    toast.error(message);
};

// Loading / Pending Message
export const Pendingmessage = (message) => {
    toast.loading(message);
};