import './PatientAgenda.css'

import Section from '../Section/Section'
import PatientCalendar from './PatientCalendar'

function PatientAgenda(){
    return(
        <>
            <div className='patient-agenda-cont'>
                <PatientCalendar />
                <Section headingText={"Date Notes"}>
                    <div className='patient-agenda-datenotes'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin, justo vel maximus sodales, mi metus pretium tortor, ac pharetra leo velit eget ante. Sed lacinia ex vel ante bibendum aliquet. Suspendisse lobortis interdum ligula, et sagittis nisl consectetur sit amet. Ut lobortis felis vel ante iaculis, eget ullamcorper enim varius. Sed luctus est sit amet hendrerit porttitor. Integer accumsan felis faucibus ex tincidunt sagittis. Nullam at dapibus dolor, vulputate interdum arcu. Integer vel tincidunt neque, ut laoreet metus. Integer a consectetur magna, sit amet molestie magna. Integer sodales, mi id efficitur rhoncus, orci nunc elementum lorem, varius eleifend neque augue non urna. Cras metus nisi, tincidunt a porta eget, commodo consectetur tellus. Nullam venenatis ex ac lacus consequat rhoncus. Suspendisse pharetra, odio in finibus pharetra, felis turpis rutrum leo, et vestibulum leo leo sed nisl. In hac habitasse platea dictumst. 
                    </div>
                </Section>
            </div>
        </>
    )
}

export default PatientAgenda