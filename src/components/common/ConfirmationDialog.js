import Swal from "sweetalert2";
const ConfirmationDialog = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel",
  confirmButtonColor = "#ff4d4d",
  cancelButtonColor = "#1da1f2",
  onConfirm,
  onCancel,
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
    background: "rgba(255, 255, 255, 0.3)",
    color: "#fff",
    backdrop: "rgba(0, 0, 0, 0.85)",
    customClass: {
      popup: "swal-custom",
    },
  });

  if (result.isConfirmed && onConfirm) {
    onConfirm();
  } else if (result.isDismissed && onCancel) {
    onCancel();
    Swal.close();
  }
};

export default ConfirmationDialog;
