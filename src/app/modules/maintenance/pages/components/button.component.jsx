/* eslint-disable react/prop-types */
import LoadingButton from '@mui/lab/LoadingButton';


export default function ButtonAction({ handleButton, variant, color, icon, label, loading = false }) {
  return (
    <div>
      <LoadingButton
        onClick={handleButton}
        size="large"
        loading={loading}
        variant={variant}
        color={color}
        endIcon={icon}
      >
        <span>{label}</span>
      </LoadingButton>
    </div>
  )
}