import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditEducation = ({ id }) => {
  const initEducation = {
    id_education: "",
    year_edu: "",
    id_round: "",
    id_university: "",
    tcas: "",
    open_date: "",
    close_date: "",
    list_day: "",
    general: "",
    doculment_edu: "",
    note_edu: "",
    url_doculment: "",

  };

  const [education, setEducation] = useState(initEducation);
  const [submited, setSumited] = useState(false)
  const [university, setUniversity] = useState([])
  const [round, setRound] = useState([])


  useEffect(() => {
    axios.get("http://localhost:8080/Education/" + id)
      .then((response) => {
        console.log(response);
        setEducation(response.data);
      });
  }, [id]);


  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setEducation({ ...education, [name]: value });
  };


  const saveEducation = () => {
    var data = {
      year_edu: education.year_edu,
      id_round: education.id_round,
      id_university: education.id_university,
      tcas: education.tcas,
      open_date: education.open_date,
      close_date: education.close_date,
      list_day: education.list_day,
      general: education.general,
      doculment_edu: education.doculment_edu,
      note_edu: education.note_edu,
      url_doculment: education.url_doculment,

    }
    axios.put("http://localhost:8080/Education/updateEducation/" + education.id_education, data)
      .then((response) => {
        console.log(response.data);
        setEducation({ ...education, data });
        setSumited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const newEducation = () => {
    setSumited(false);
  };
  const updateUniversity = () => {
    axios.get("http://localhost:8080/university").then((response) => {
      console.log(response);
      setUniversity(response.data.university);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateUniversity();
  }, []);
  const updateRound = () => {
    axios.get("http://localhost:8080/Round").then((response) => {
      console.log(response);
      setRound(response.data.round);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateRound();
  }, []);

  return (
    <Container>
     <Form>

{submited ? (
   Swal.fire(

    '?????????????????????????????????????????????',
    ' ',
     'success',
 )
 (window.location.assign("/educationall"))
                ) : (
<Form>

            <center><h3> ????????????????????????????????????????????????????????????????????????????????????????????? </h3></center>
            <hr></hr>
            <br></br>
            <Row>
              <Col xs="2">
                <FormGroup>
                  <Label for="year_edu">???????????????????????????????????????????????????</Label>
                  <Input type="select" name="year_edu" id="year_edu" value={education.year_edu || ""}
                    onChange={handleInputChange}>
                    <option></option>
                    <option value="2021" >2021</option>
                    <option value="2022" >2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </Input>
                </FormGroup></Col>

              <Col xs="3">
                <FormGroup>
                  <Label for="id_round">?????????</Label>
                  <Input type="select" name="id_round" id="id_round" placeholder="??????????????????????????????????????????????????????" value={education.id_round || ""}
                    onChange={handleInputChange}>
                    <option></option>
                    {round.map((round) => {
                      return (
                        <option key={round.id_round} value={round.id_round}>{round.name_round}</option>
                      )
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="7">
                <FormGroup>
                  <Label for="id_university">?????????????????????????????????</Label>
                  <Input type="select" name="id_university" id="id_university" placeholder="??????????????????????????????????????????????????????????????????????????????"
                    onChange={handleInputChange} value={education.id_university || ""}>
                    {university.map((university) => {
                      return (
                        <option key={university.id_university} value={university.id_university}>
                          {university.name_uni}</option>
                      )
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="3">
                <FormGroup>
                  <Label for="tcas">Tcas</Label>
                  <Input type="select" name="tcas" id="tcas" onChange={handleInputChange} value={education.tcas || ""} >
                    <option>{education.tcas}</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label for="open_ date">?????????????????????????????????????????????</Label>
                  <Input type="date" name="open_date" id="open_date" onChange={handleInputChange}
                    value={education.open_date} >
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="3">
                <FormGroup>
                  <Label for="close_ date">??????????????????????????????????????????</Label>
                  <Input type="date" name="close_date" id="close_date" onChange={handleInputChange}
                    value={education.close_date}>
                  </Input>
                </FormGroup></Col>
              <Col xs="3" >
                <FormGroup>
                  <Label for="list_day">??????????????????????????????????????????????????????????????????????????????????????????????????????</Label>
                  <Input type="date" name="list_day" id="list_day" onChange={handleInputChange} value={education.list_day || ""}>
                  </Input>
                </FormGroup></Col>
              <Col xs="6"></Col>
            </Row>
            <FormGroup >
              <Label for="general">???????????????????????????</Label>
              <Input style={{ height: 150 }} type="textarea" name="general" id="general" onChange={handleInputChange} value={education.general || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="doculment_edu">????????????????????????????????????</Label>
              <Input style={{ height: 150 }} type="textarea" name="doculment_edu" id="doculment_edu" onChange={handleInputChange} value={education.doculment_edu || ""} />

            </FormGroup>
            <FormGroup>
              <Label for="note_edu">???????????????????????????????????????</Label>
              <Input type="textarea" name="note_edu" id="note_edu" onChange={handleInputChange} value={education.note_edu || ""} />
            </FormGroup>

            <Col xs="7">
              <FormGroup>
                <Label for="url_doculment">URL</Label>
                <Input type="text" name="url_doculment" id="url_doculment" onChange={handleInputChange} placeholder="???????????????????????? URL" value={education.url_doculment || ""} />
              </FormGroup>
            </Col>

            <Button className="btn btn-success" onClick={saveEducation}>??????????????????</Button>
          </Form>
        )}
      </Form>
    </Container >
  );
}
export default ViewEditEducation;