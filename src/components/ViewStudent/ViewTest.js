import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem
} from 'reactstrap';

const ViewUniversity = () => {
  const [searchuniversity, setSearchUniversity] = useState("");
  const [showdata, setshowdata] = useState([]);


  const handleChange = (event) => {
    setSearchUniversity(event.target.value);
  };

    useEffect(() => {
 const load = async () => {
    const url = "http://localhost:8080/university/searchUniversity?keyword="

    const response = await axios.get(url)
    console.log(response.data);
    setshowdata(response.data)
 }
 load()
}, []);


  return (
    <div>
      <Container>
        <br /> <br /> <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <br />
              <UncontrolledDropdown>
              <Label for="id_university">ค้นหาชื่อมหาวิทยาลัย</Label>
              <Input onChange={handleChange} type="text" name="id_university" id="id_university" >
              </Input>
              <DropdownMenu>
              <div>
      {showdata.filter((showuniversity) =>{
        if (searchuniversity === ""){
          return searchuniversity;
        }else if (
          showuniversity.id_university.toLowerCase().includes(searchuniversity.toLowerCase())
        ){
          return searchuniversity;
        }
      }).map((s) =>{
        <>
        <DropdownItem>
        <a href ={"/EditUniversity/"+s.id_university}> {s.name_uni} </a>
        </DropdownItem>
        </>
      })}
</div>
</DropdownMenu>
</UncontrolledDropdown>
            </FormGroup>
          </Col>
        </Row>

      </Container>
      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><NavLink href="./insertuniversity">เพิ่มมหาวิทยาลัย</NavLink>
          </Col>
        </Row>
        <Row>


          <h3>รายชื่อมหาลัยมหาวิทยาลัย</h3>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>ชื่อมหาวิทยาลัย</th>
                <th>รายละเอียด</th>
                <th>ลิงค์</th>
                <th></th>
              </tr>
            </thead>
           
          </Table>
        </Row>
      </Container>




    </div>
  );
}

export default ViewUniversity;