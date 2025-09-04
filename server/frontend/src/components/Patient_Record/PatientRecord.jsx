import React from 'react'
import './PatientRecord.css'
import Heading from '../Heading/Heading'

function PatientRecord(){

    const recordsPatient = [
        { 
            consultName : "Consult - 20/02/2025",  
            madeBy : "David Bisbal F.",
            category : "Document",
            dateCreated : "03/09/2025"
        }
    ]

    return (
        <>
            <div className='patient-records-container'>
                <div className='patient-records-item'>
                    <Heading headingText={"Record"} />
                    <div className='patient-record-sub-cont records-table'>
                        <p>Name</p>
                        <p>Made by</p>
                        <p>Category</p>
                        <p>Date Created</p>
                        <p>Actions</p>

                        {recordsPatient.map((record, index) => (
                            <React.Fragment key={index}>
                                <p>{record.consultName}</p>
                                <p>{record.madeBy}</p>
                                <p>{record.category}</p>
                                <p>{record.dateCreated}</p>
                                <div className='patient-record-buttons'>
                                    <button className='basic-button icon-button table-button'>
                                        <img src='/assets/glasses.svg'/>
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}

                    </div>
                </div>
                <div className='patient-records-item'>
                    <Heading headingText={"Summary"} />
                    <div className='patient-record-sub-cont records-summary'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non metus metus. Morbi nulla tortor, pulvinar ut laoreet quis, pellentesque nec nisi. Pellentesque nulla nisl, varius ac est ac, dapibus consequat erat. Aliquam fermentum lobortis nulla ac venenatis. Mauris nisi urna, vehicula at bibendum sit amet, aliquam quis elit. Vivamus ac eros ut ante dapibus suscipit. Integer congue aliquam nulla ut vehicula. Phasellus sed quam turpis. Integer sit amet nisi in sapien egestas imperdiet in vitae arcu.
                                            
                        Vestibulum at eros tortor. Aenean gravida pretium nibh, quis tincidunt magna placerat at. Integer semper tristique volutpat. Pellentesque tempus accumsan tincidunt. Donec cursus maximus felis, vitae faucibus libero rhoncus sit amet. Maecenas erat est, facilisis eget erat et, lacinia pellentesque velit. Praesent tempor ornare convallis. Cras tincidunt erat in eros vulputate placerat. Suspendisse est augue, ultricies ac lacinia in, commodo eu leo. Suspendisse pharetra interdum nulla, vel malesuada sem varius quis. Fusce sed rutrum felis, lacinia facilisis mauris.
                                            
                        In ullamcorper tempor libero a vehicula. Quisque vitae viverra neque. Sed eget turpis diam. In venenatis justo nibh, vel cursus magna fermentum sed. Aenean suscipit risus et faucibus tincidunt. Maecenas vestibulum purus mauris, id volutpat quam dignissim a. Curabitur condimentum justo eget hendrerit facilisis. Donec convallis tincidunt dolor, eu molestie mi tincidunt sit amet. Ut blandit justo tincidunt pretium posuere. Sed sodales finibus sapien, at vehicula purus pretium id. Donec sed leo arcu. Quisque semper ex mauris, id mattis neque dignissim non. Maecenas eu enim at eros fringilla aliquet. Vivamus non porta enim.
                                            
                        Phasellus nec lacus interdum est eleifend commodo eget a dolor. Ut pretium eget nibh vel tincidunt. Sed pulvinar hendrerit hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum interdum varius leo, eu ornare felis vestibulum scelerisque. Curabitur eu semper sapien. Morbi arcu nisi, pellentesque in pulvinar in, consequat ac sem. Donec in neque eu mauris porttitor fringilla. Mauris vel mauris et eros dictum imperdiet. Integer auctor, leo congue placerat volutpat, arcu enim tincidunt tortor, sed tincidunt augue arcu sed velit. Proin vulputate orci eu augue tristique commodo. Aenean placerat velit at odio mollis, vitae eleifend arcu ornare. Phasellus elit dolor, tincidunt sed euismod dapibus, blandit sit amet dolor. Duis mauris augue, elementum at efficitur et, bibendum nec ex. In et leo sed velit aliquam sodales sit amet in dui.
                                            
                        Donec vestibulum elit at pharetra iaculis. Maecenas fringilla massa a dolor malesuada, vel tempor purus egestas. Aliquam ut elit eu purus bibendum aliquet vulputate a nulla. Mauris eu porta mi, quis varius quam. Sed bibendum, lectus nec convallis placerat, arcu diam mollis tortor, sed convallis tellus felis ut ante. Aliquam erat volutpat. Nam ac dolor vel felis accumsan blandit ac vitae erat. Suspendisse vitae feugiat nisi. Ut ac est eros. Nulla non aliquam urna. Proin placerat massa ac felis aliquam fringilla. 
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientRecord