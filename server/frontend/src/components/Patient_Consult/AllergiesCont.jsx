import ConsultWindow from './ConsultWindow'
import WindowContentDefault from './WindowContentDefault'
import BasicInput from '../Basic_Input/BasicInput'
import './AllergiesCont.css'
import Section from '../Section/Section'

function AllergiesCont({ window }){
    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table allergies-table'>
                    <div><h4>Allergen</h4></div>
                    <div><h4>Reaction</h4></div>

                    <div className='consult-cell centered'>Paracetamol</div>
                    <div className='consult-cell'>Headache</div>
                    
                    <div className='consult-cell centered'>Ibuprofen</div>
                    <div className='consult-cell'>Red skin / Salpullido</div>
                    
                </div>
            </div>

            <ConsultWindow windowTitle={"Allergies"} showWindow={window}>
                <WindowContentDefault title_list='Allergens List' items_list={["Paracetamol","Ibuprofen"]}>
                    <div className='content-default-name'>
                        <BasicInput label={"Allergen"} />
                    </div>

                    <div className='default-information-description allergies-description'>
                        <Section headingText={"Reaction Description"} color='black' font_size='1.1em'>
                            <textarea>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus tempor urna ac sagittis. Maecenas sit amet libero vitae nibh laoreet rutrum. Vestibulum dignissim leo sed nisi bibendum, quis hendrerit felis convallis. Nam pellentesque nisi eu urna ultricies tincidunt. Proin vehicula quis dolor non scelerisque. Fusce fringilla magna non ex accumsan egestas. In hac habitasse platea dictumst. Nam aliquet pretium eros a congue. Praesent vulputate urna ac sollicitudin pharetra. In hac habitasse platea dictumst. Aenean bibendum imperdiet nisl ut mollis. Mauris efficitur risus a est rhoncus, ut maximus urna consectetur. Donec ac erat fringilla, pretium elit eu, dignissim risus. Sed at ante eget turpis porta tristique in nec neque.
                                Phasellus rhoncus sem dapibus, cursus nunc blandit, facilisis mauris. Quisque ut odio nisl. Maecenas id neque urna. Mauris semper enim et turpis congue, in sodales mi venenatis. Phasellus imperdiet vestibulum turpis vitae finibus. Quisque sodales risus vitae luctus pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam ut justo aliquet, bibendum lectus rutrum, condimentum elit. Duis commodo enim gravida sapien congue, ac vestibulum arcu dignissim. Vivamus mollis mauris in tellus volutpat molestie. Nulla erat nulla, blandit ac aliquam vitae, laoreet vitae elit. 
                            </textarea>
                        </Section>
                    </div>
                </WindowContentDefault>
            </ConsultWindow>
        </>
    )
}

export default AllergiesCont