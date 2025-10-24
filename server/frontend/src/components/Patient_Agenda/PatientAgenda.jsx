import './PatientAgenda.css'

import Section from '../Section/Section'
import PatientCalendar from './PatientCalendar'
import { useState } from 'react'
import WindowContainer from '../Window_Container/WindowContainer'

function PatientAgenda(){
    const [windowVisibility, setWindowVisibility] = useState(true)

    return(
        <>
            <div className='patient-agenda-cont'>
                <PatientCalendar windowVisibility={windowVisibility} setWindowVisibility={setWindowVisibility}/>
                <Section headingText={"Date Notes"}>
                    <div className='patient-agenda-datenotes'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin, justo vel maximus sodales, mi metus pretium tortor, ac pharetra leo velit eget ante. Sed lacinia ex vel ante bibendum aliquet. Suspendisse lobortis interdum ligula, et sagittis nisl consectetur sit amet. Ut lobortis felis vel ante iaculis, eget ullamcorper enim varius. Sed luctus est sit amet hendrerit porttitor. Integer accumsan felis faucibus ex tincidunt sagittis. Nullam at dapibus dolor, vulputate interdum arcu. Integer vel tincidunt neque, ut laoreet metus. Integer a consectetur magna, sit amet molestie magna. Integer sodales, mi id efficitur rhoncus, orci nunc elementum lorem, varius eleifend neque augue non urna. Cras metus nisi, tincidunt a porta eget, commodo consectetur tellus. Nullam venenatis ex ac lacus consequat rhoncus. Suspendisse pharetra, odio in finibus pharetra, felis turpis rutrum leo, et vestibulum leo leo sed nisl. In hac habitasse platea dictumst.
                    </div>
                </Section>

                <WindowContainer windowTitle={"Appointments"} showWindow={[windowVisibility, setWindowVisibility]}>
                  <input placeholder='Search your doctor' ></input>
                  <button>Search</button>
                  <p>Resultado de doctor aqui!</p>
                  <select option={["00:00","01:00","02:00"]}>
                    <option>00:00</option>
                    <option>01:00</option>
                    <option>02:00</option>
                    <option>03:00</option>
                    <option>04:00</option>
                    <option>05:00</option>
                    <option>06:00</option>
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                  </select>
                </WindowContainer>

            </div>
        </>
    )
}

export default PatientAgenda