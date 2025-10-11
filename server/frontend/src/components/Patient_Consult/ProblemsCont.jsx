import ConsultWindow from './ConsultWindow'
import Heading from '../Heading/Heading'
import Section from '../Section/Section'
import BasicInput from '../Basic_Input/BasicInput'
import BasicSelect from '../BasicSelect/BasicSelect'
import './ProblemsCont.css'
import WindowContentDefault from './WindowContentDefault'

function ProblemsCont({ window }){
    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table problems-table'>
                    <div><h4>Problem Description</h4></div>
                    <div><h4>Comments</h4></div>
                    <div><h4>Onset</h4></div>
                    <div><h4>Severety</h4></div>
                    <div><h4>Duration</h4></div>

                    <div className='consult-cell centered'>Knee Pain</div>
                    <div className='consult-cell justified'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis arcu ut diam aliquam auctor. Cras pulvinar nisi quis lacus finibus, in  pellentesque ipsum consectetur. Curabitur quis sollicitudin metus, et  varius felis. Aliquam erat volutpat. Fusce eu diam ex. Duis ut magna  quis odio ullamcorper pretium eget id elit. Vestibulum dapibus, velit  sit amet facilisis volutpat, nisi velit faucibus ligula, nec interdum  massa neque non massa. Vestibulum hendrerit lacus tortor, nec congue  nisl auctor at. Phasellus ac sagittis urna. Quisque sodales, urna ut  varius dapibus, lacus nunc dictum turpis, sed aliquam ante nisi et eros. Vivamus auctor quam elit. Nunc vitae felis eu libero eleifend efficitur ullamcorper ac lectus. Aenean erat ligula, congue eget metus eget,  mattis venenatis dolor. Aenean eleifend rhoncus elit vel venenatis.  Vestibulum luctus in diam eget ornare. Nullam vitae augue nunc.</div>
                    <div className='consult-cell centered'>xx/xx/xxxx</div>
                    <div className='consult-cell centered'>moderated</div>
                    <div className='consult-cell centered'>constant</div>

                    <div className='consult-cell centered'>Knee Pain</div>
                    <div className='consult-cell justified'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis arcu ut diam aliquam auctor. Cras pulvinar nisi quis lacus finibus, in  pellentesque ipsum consectetur. Curabitur quis sollicitudin metus, et  varius felis. Aliquam erat volutpat. Fusce eu diam ex. Duis ut magna  quis odio ullamcorper pretium eget id elit. Vestibulum dapibus, velit  sit amet facilisis volutpat, nisi velit faucibus ligula, nec interdum  massa neque non massa. Vestibulum hendrerit lacus tortor, nec congue  nisl auctor at. Phasellus ac sagittis urna. Quisque sodales, urna ut  varius dapibus, lacus nunc dictum turpis, sed aliquam ante nisi et eros. Vivamus auctor quam elit. Nunc vitae felis eu libero eleifend efficitur ullamcorper ac lectus. Aenean erat ligula, congue eget metus eget,  mattis venenatis dolor. Aenean eleifend rhoncus elit vel venenatis.  Vestibulum luctus in diam eget ornare. Nullam vitae augue nunc.</div>
                    <div className='consult-cell centered'>xx/xx/xxxx</div>
                    <div className='consult-cell centered'>moderated</div>
                    <div className='consult-cell centered'>constant</div>

                    <div className='consult-cell centered'>Knee Pain</div>
                    <div className='consult-cell justified'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis arcu ut diam aliquam auctor. Cras pulvinar nisi quis lacus finibus, in  pellentesque ipsum consectetur. Curabitur quis sollicitudin metus, et  varius felis. Aliquam erat volutpat. Fusce eu diam ex. Duis ut magna  quis odio ullamcorper pretium eget id elit. Vestibulum dapibus, velit  sit amet facilisis volutpat, nisi velit faucibus ligula, nec interdum  massa neque non massa. Vestibulum hendrerit lacus tortor, nec congue  nisl auctor at. Phasellus ac sagittis urna. Quisque sodales, urna ut  varius dapibus, lacus nunc dictum turpis, sed aliquam ante nisi et eros. Vivamus auctor quam elit. Nunc vitae felis eu libero eleifend efficitur ullamcorper ac lectus. Aenean erat ligula, congue eget metus eget,  mattis venenatis dolor. Aenean eleifend rhoncus elit vel venenatis.  Vestibulum luctus in diam eget ornare. Nullam vitae augue nunc.</div>
                    <div className='consult-cell centered'>xx/xx/xxxx</div>
                    <div className='consult-cell centered'>moderated</div>
                    <div className='consult-cell centered'>constant</div>
                </div>
            </div>

            <ConsultWindow windowTitle={"Problems"} showWindow={window}>
                <WindowContentDefault title_list='Problems list' items_list={["Knee Pain", "Anal Destruction :0"]}>
                    <div className='problem-name'>
                        <BasicInput label={"Problem Name"} />
                    </div>
                    
                    <div className='problems-information-description'>
                        <Section headingText={"Problems Description"} color='black' font_size='1.1em'>
                            <textarea>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus tempor urna ac sagittis. Maecenas sit amet libero vitae nibh laoreet rutrum. Vestibulum dignissim leo sed nisi bibendum, quis hendrerit felis convallis. Nam pellentesque nisi eu urna ultricies tincidunt. Proin vehicula quis dolor non scelerisque. Fusce fringilla magna non ex accumsan egestas. In hac habitasse platea dictumst. Nam aliquet pretium eros a congue. Praesent vulputate urna ac sollicitudin pharetra. In hac habitasse platea dictumst. Aenean bibendum imperdiet nisl ut mollis. Mauris efficitur risus a est rhoncus, ut maximus urna consectetur. Donec ac erat fringilla, pretium elit eu, dignissim risus. Sed at ante eget turpis porta tristique in nec neque.
                                Phasellus rhoncus sem dapibus, cursus nunc blandit, facilisis mauris. Quisque ut odio nisl. Maecenas id neque urna. Mauris semper enim et turpis congue, in sodales mi venenatis. Phasellus imperdiet vestibulum turpis vitae finibus. Quisque sodales risus vitae luctus pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam ut justo aliquet, bibendum lectus rutrum, condimentum elit. Duis commodo enim gravida sapien congue, ac vestibulum arcu dignissim. Vivamus mollis mauris in tellus volutpat molestie. Nulla erat nulla, blandit ac aliquam vitae, laoreet vitae elit. 
                            </textarea>
                        </Section>
                    </div>
                    <div className='problems-information-entries'>
                        <BasicInput label={"Onset"} inputType="date" width='12em'/>
                        <BasicSelect label={"Severity"} options={["Mild", "Moderated", "Severe"]} width='12em'/>
                        <BasicInput label={"Duration"} width='12em'/>
                    </div>
                </WindowContentDefault>
            </ConsultWindow>
        </>
    )
}

export default ProblemsCont