import { usePatient } from '../../hooks/usePatient'
import DashboardProfile from '../Dash_Profile/DashboardProfile'

function PatientDashboardProfile() {
    // Reusar el componente de perfil del doctor
    return <DashboardProfile doctorView={false} />
}

export default PatientDashboardProfile