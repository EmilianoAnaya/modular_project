import ConsultWindow from './ConsultWindow'
import './ProblemsCont.css'

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

            <ConsultWindow showWindow={window}/>
        </>
    )
}

export default ProblemsCont