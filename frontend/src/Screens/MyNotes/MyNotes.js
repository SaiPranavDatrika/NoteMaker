
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { Accordion, Badge, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import { useEffect, useState } from 'react';
import axios from 'axios';


const MyNotes = () => {

 
   const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
     // dispatch(deleteNoteAction(id));
    }
  };

  const [notes, setNotes] = useState([]);
  
  const fetchdata = async() =>{
      const { data }=await axios.get("api/notes");
      setNotes(data);
  }
    console.log(notes);
   useEffect(() => {
     fetchdata();
   }, [])

  function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );
   
  return ( 
   <h1 style={{     
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}onClick={decoratedOnClick}>{children}</h1>
  );
}
  
  
  return (<>
  <MainScreen title='Welcome..'>
        <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      
        {
          notes.map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }}>
                <Card.Header style={{display:"flex"}}>
                    <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 10,
                    }}
                  >
                    <CustomToggle as={Card.Text}  eventKey="0">{note.title}</CustomToggle>
                   
                     
                  </span>

                <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                 <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>Delete</Button>
                </div>
             </Card.Header>     
      <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <h4>
                      <Badge>
                        Category - {note.category}
                      </Badge>
                    </h4>
                     <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        
                      </footer>
                    </blockquote>

                </Card.Body>
      </Accordion.Collapse>
    </Card>
     </Accordion>
    ))
   }
   
      </MainScreen>
      </>
  ) ;
}

export default MyNotes
