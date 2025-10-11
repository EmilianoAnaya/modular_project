import ConsultWindow from './ConsultWindow'
import WindowContentDefault from './WindowContentDefault'
import Section from '../Section/Section'
import BasicInput from '../Basic_Input/BasicInput'
import './MedicinesCont.css'

function MedicinesCont({ window }){
    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table medicines-table'>
                    <div><h4>Medicine</h4></div>
                    <div><h4>Quantity</h4></div>
                    <div><h4>Instructions</h4></div>
                    
                    <div className='consult-cell centered'>Paracetamol</div>
                    <div className='consult-cell centered'>500mg</div>
                    <div className='consult-cell'>1 tableta. Via oral. 2 veces al día. Por 30 días</div>
                    
                    <div className='consult-cell centered'>Cefalexina (Septilisin)</div>
                    <div className='consult-cell centered'>500mg</div>
                    <div className='consult-cell'>Tomar via oral 8 (uno) c/6 (seis) hs por 7/(siete) días</div>
                    
                </div>
            </div>

            <ConsultWindow windowTitle={"Medicines"} showWindow={window}>
                <WindowContentDefault title_list='Medicines List' items_list={["Paracetamol"]}>
                    <div className='medicine-name'>
                        <BasicInput label={"Medicine Name"} />
                    </div>
        
                    <div className='medicines-information-description'>
                        <Section headingText={"Medicine Instructions"} color='black' font_size='1.1em'>
                            <textarea>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus tempor urna ac sagittis. Maecenas sit amet libero vitae nibh laoreet rutrum. Vestibulum dignissim leo sed nisi bibendum, quis hendrerit felis convallis. Nam pellentesque nisi eu urna ultricies tincidunt. Proin vehicula quis dolor non scelerisque. Fusce fringilla magna non ex accumsan egestas. In hac habitasse platea dictumst. Nam aliquet pretium eros a congue. Praesent vulputate urna ac sollicitudin pharetra. In hac habitasse platea dictumst. Aenean bibendum imperdiet nisl ut mollis. Mauris efficitur risus a est rhoncus, ut maximus urna consectetur. Donec ac erat fringilla, pretium elit eu, dignissim risus. Sed at ante eget turpis porta tristique in nec neque.
                                Phasellus rhoncus sem dapibus, cursus nunc blandit, facilisis mauris. Quisque ut odio nisl. Maecenas id neque urna. Mauris semper enim et turpis congue, in sodales mi venenatis. Phasellus imperdiet vestibulum turpis vitae finibus. Quisque sodales risus vitae luctus pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam ut justo aliquet, bibendum lectus rutrum, condimentum elit. Duis commodo enim gravida sapien congue, ac vestibulum arcu dignissim. Vivamus mollis mauris in tellus volutpat molestie. Nulla erat nulla, blandit ac aliquam vitae, laoreet vitae elit. 
                            </textarea>
                        </Section>
                    </div>
                    <div className='problems-information-entries'>
                        <BasicInput label={"Quantity"} width='12em'/>
                    </div>
                </WindowContentDefault>
            </ConsultWindow>
        </>
    )
}

export default MedicinesCont