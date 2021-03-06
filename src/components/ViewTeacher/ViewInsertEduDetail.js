import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';



const ViewInsertEduDetail = ({ id }) => {
    const initEdudetail = {
        id_edu_detail: "",
        number_of_edu: "",
        GPA: "",
        id_curriculum: "",
        note_condi: "",
        id_course: "",
        id_faculty: "",
        id_education: "",
        id_major: "",

    };

    const [edudetail, setEdudetail] = useState(initEdudetail);
    const [submited, setSumited] = useState(false)
    const [faculty, setFaculty] = useState([])
    const [course, setCourse] = useState([])
    const [curriculum, setCurriculum] = useState([])
    const [major, setMajor] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/Education/" + id)
            .then((response) => {
                setEdudetail(response.data);
            });
    }, [id]);


    //Faculty
    const updateFaculty = () => {
        axios.get("http://localhost:8080/faculty").then((response) => {
            console.log(response);
            setFaculty(response.data.faculty);
            console.log("Updating .....");
        });
    };
    useEffect(() => {
        updateFaculty();
    }, []);

    //Course
    const updateCourse = () => {
        axios.get("http://localhost:8080/Course").then((response) => {
            console.log(response);
            setCourse(response.data.course);
            console.log("Updating .....");
        });
    };
    useEffect(() => {
        updateCourse();
    }, []);

    //Curriculum
    const updateCurriculum = () => {
        axios.get("http://localhost:8080/Curriculum").then((respond) => {
            console.log(respond);
            setCurriculum(respond.data.curriculum);
            console.log("Update...")
        });
    };
    useEffect(() => {
        updateCurriculum();
    }, []);

    //Major
    const updateMajor = () => {
        axios.get("http://localhost:8080/groupmajor").then((respond) => {
            console.log(respond);
            setMajor(respond.data.major);
            console.log("Update...")
        });
    };
    useEffect(() => {
        updateMajor();
    }, []);


    const handleInputChange = (event) => {
        let { name, value } = event.target;
        // if (name === "tags") {
        //     value = value.split(",");
        // }
        setEdudetail({ ...edudetail, [name]: value });
    };

    const saveEdudetail = () => {
        var data = {
            number_of_edu: edudetail.number_of_edu,
            GPA: edudetail.GPA,
            id_curriculum: edudetail.id_curriculum,
            note_condi: edudetail.note_condi,
            id_course: edudetail.id_course,
            id_faculty: edudetail.id_faculty,
            id_education: edudetail.id_education,
            id_major: edudetail.id_major,
        }
        axios.post("http://localhost:8080/eduDetail/createEduDetail", data)
            .then((response) => {
                console.log(response.data);
                setSumited(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const newEdudetail = () => {
        setEdudetail(initEdudetail);
        setSumited(false);
    };


    return (
        <Container>
            <Form>

{submited ? (
   Swal.fire(

    '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
    ' ',
     'success',
 )
 (window.location.assign("/edudetailall/" + edudetail.id_education))
                ) : (
<Form>
                        <center><h3> ????????????????????????????????????????????????????????????????????????????????????????????? </h3></center>

                        <Row>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_faculty">???????????????????????????????????????</Label>
                                    <Input type="select" name="id_faculty" id="id_faculty"
                                        onChange={handleInputChange} value={edudetail.id_faculty || ""} >
                                        <option></option>
                                        {faculty.map((faculty) => {
                                            return (
                                                <option key={faculty.id_faculty} value={faculty.id_faculty}>
                                                    {faculty.name_faculty}</option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_course">??????????????????????????????????????????</Label>
                                    <Input type="select" name="id_course" id="id_course"
                                        value={edudetail.id_course || ""}
                                        onChange={handleInputChange}>
                                        <option></option>
                                        {course.map((course) => {
                                            return (
                                                <option key={course.id_course} value={course.id_course}>
                                                    {course.name_course}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="">???????????????????????????????????????</Label>
                                    <Input type="select" name="id_major" id="id_major" value={edudetail.id_major}
                                        onChange={handleInputChange}>
                                        <option></option>
                                            {major.map((major) => {
                                                return (
                                                    <option key={major.id_major} value={major.id_major}>
                                                        {major.name_major}</option>
                                                )
                                            })}
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="number_of_edu">????????????????????????????????????????????????????????????</Label>
                                    <Input type="text" name="number_of_edu" id="number_of_edu" value={edudetail.number_of_edu || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="GPA">?????????????????????????????????</Label>
                                    <Input type="text" name="GPA" id="GPA" value={edudetail.GPA || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_curriculum">?????????????????????????????????</Label>
                                    <Input type="select" name="id_curriculum" id="id_curriculum" value={edudetail.id_curriculum || ""}
                                        onChange={handleInputChange}>
                                        <option></option>
                                        <option>????????????????????????</option>
                                        {curriculum.map((curri) => {
                                            return (
                                                <option key={curri.id_curriculum} value={curri.id_curriculum}>
                                                    {curri.name_curriculum}</option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_education"></Label>
                                    <Input type="hidden" name="id_education" id="id_education"
                                        onChange={handleInputChange} value={edudetail.id_education || ""}>
                                    </Input>

                                </FormGroup></Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="note_condi">?????????????????????????????????????????????????????????</Label>
                                    <Input type="textarea" name="note_condi" id="note_condi" value={edudetail.note_condi || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                        </Row>
                        <Button className="btn btn-success" onClick={saveEdudetail}>??????????????????</Button>
                    </Form>
                )}
            </Form>
        </Container >
    );
}

export default ViewInsertEduDetail;