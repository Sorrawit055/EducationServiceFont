import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewEducationStudentAll = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [year, setYear] = useState([]);
    //ไปดึง api ของอันเก่ามาใช้จาก url
    useEffect(() => {
      axios.get("http://localhost:8080/Teacher/getClass").then((response) => {
        console.log(response);
        setYear(response.data.class);
      });
    }, []);
    return (
        <div>
     <div class="container">
<br />
        <Row>
<Col xs="12"> 
  <FormGroup>
    <br />  <br />  <br />  <br />
       <center> <Label for="exampleSelect">ดูข้อมูลนักเรียน</Label></center>
      </FormGroup>
      
</Col>

        </Row>
</div>    
<br />
<div class="container">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        
        <br/>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>ห้องเรียน</th>
              <th>ดูข้อมูลรายชื่อนักเรียน</th>
            </tr>
          </thead>
          <tbody>
            {year.map((year) => {
              return (
                <tr key={year.class}>
                  <td>{year.year_class} / {year.class}</td>
                  <td>
                    <Button href={"/EducationStudentData/" + year.class}>
                      <FontAwesomeIcon icon={faEdit} />ดูข้อมูลรายชื่อนักเรียน
                   </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>




    </div>
  );
}
  
  export default ViewEducationStudentAll;