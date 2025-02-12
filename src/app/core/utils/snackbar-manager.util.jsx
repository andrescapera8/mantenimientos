import { toast } from 'sonner';


export const SnackBarUtlities = {
  success(mssg, duration = 4000) {
    toast.success(mssg, { duration: duration });
  },
  error(mssg, duration = 4000) {
    toast.error(mssg, { duration: duration });
  },
  warning(mssg, duration = 4000) {
    toast.warning(mssg, { duration: duration });
  },
  info(mssg, duration = 4000) {
    toast.info(mssg, { duration: duration });
  }
}