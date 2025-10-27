import './DashboardHome.css'
import Section from '../Section/Section'
import DashboardCalendar from './DashboardCalendar'

function DashboardHome({setWindowVisibility, selectedDate, setSelectedDate}) {
    return (
        <>
            <div id='dash-home'>
                <div id='dash-home-notifs'>
                    <Section headingText={"Notifications"}>
                        <div className='basic-container notifs-cont'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lectus id sem dapibus pulvinar. Cras varius sodales placerat. Nullam tempor sollicitudin sapien rutrum sollicitudin. Donec molestie sapien enim, lobortis consequat ante fermentum eget. Sed hendrerit est nec nibh porta malesuada. Donec ut sem eleifend, cursus justo quis, pellentesque nisi. Curabitur rutrum, libero at pulvinar faucibus, purus tortor pellentesque dui, ac euismod tellus diam ut sem. Morbi arcu orci, scelerisque ut sem non, congue accumsan dolor. Ut ut mi interdum, commodo nulla vitae, ornare lacus. Morbi ultrices lorem ut quam aliquam, et rutrum felis vehicula. Mauris egestas interdum hendrerit. Vivamus vitae lacinia justo. Sed eget malesuada dui. Praesent in neque ac purus pharetra volutpat. Sed et sagittis ante. Sed consectetur turpis eu sapien lobortis, vitae semper neque laoreet. Integer mattis maximus consectetur. Nulla congue sodales neque, id finibus arcu malesuada ac. Ut a quam pulvinar, fringilla justo sit amet, fermentum arcu. Aliquam quis turpis libero. Cras ultricies libero sit amet elit accumsan, id porta dolor faucibus. Quisque vel est urna. Sed varius tortor erat. Vivamus aliquam lorem dui, sed ultricies felis dictum ut.
                        </div>
                    </Section>
                </div>
                <div id='dash-home-calendar'>
                    <DashboardCalendar
                      setWindowVisibility={setWindowVisibility}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardHome