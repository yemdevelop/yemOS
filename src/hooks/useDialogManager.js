import { useState } from "react";

export const useDialogManager = () => {
    const [dialog, setDialog] = useState(null);

    const openDialog = ({
        title = "yemOS",
        message,
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        onConfirm,
        onCancel,
        danger = false,
    }) => {
        setDialog({
            title,
            message,
            confirmLabel,
            cancelLabel,
            onConfirm,
            onCancel,
            danger,
        });
    };

    const closeDialog = () => {
        setDialog(null);
    };

    const confirmDialog = () => {
        if (!dialog) return;

        dialog.onConfirm?.();
        closeDialog();
    };

    const cancelDialog = () => {
        if (!dialog) return;

        dialog.onCancel?.();
        closeDialog();
    };

    return {
        dialog,
        openDialog,
        closeDialog,
        confirmDialog,
        cancelDialog,
    }
};