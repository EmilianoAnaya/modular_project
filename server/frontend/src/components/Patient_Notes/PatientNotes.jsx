import { useState } from 'react'
import PatientNav from "../Patient_Navbar/PatientNav";
import "./PatientNotes.css"

function PatientNotes() {
  const [activeSection, setActiveSection] = useState('Allergies')

  return (
    <div className="notes-page">
        <PatientNav 
          activeSection = {activeSection}
          setActiveSection = {setActiveSection}
    />

      <div className="notes-container">
        <div className="notes-card">
          <h1>{activeSection}</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, unde, tempora ipsa nobis, ab non suscipit explicabo aliquam ullam dolorem libero! Explicabo aperiam maxime provident magnam doloribus saepe minus excepturi.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, voluptas aliquid! Iste, dolor accusantium quam molestias, debitis obcaecati, ullam nobis magnam voluptates temporibus maxime beatae delectus recusandae est omnis qui.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quaerat nihil praesentium error, asperiores veritatis ut modi fuga facilis. Error saepe tempore quidem a! Placeat dicta molestiae pariatur eos rem.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam asperiores veniam corporis atque debitis quidem. Sint rerum fugiat possimus! Dolores sed, nostrum similique voluptas doloribus aspernatur veniam debitis quis totam.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto dolore deserunt cum, similique vel neque sit. Ea rem consectetur vitae, dolor deserunt dolores perspiciatis reprehenderit at magnam sit hic minus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae at, culpa eaque, totam exercitationem aliquam aut beatae alias debitis sunt maxime harum neque. Exercitationem similique nulla consectetur perspiciatis architecto qui?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum architecto temporibus aliquid perferendis corrupti animi ipsam, voluptates eum illo in provident iste culpa omnis nesciunt dolorum molestias. Earum, consectetur corporis?</p>
        </div>
      </div>
    </div>
  );
}

export default PatientNotes
