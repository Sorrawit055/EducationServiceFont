import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';

import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewInsertUniversity = () => {
    const initProduct = {
    name_uni: "",
    url_uni: "",
    file: "",
    detail_uni: "",

    };
    
    const [progress, setProgress] = useState(0); //เซต progress
    const uploadFileToFirebase = (file) => {
        const useId = "u001"; //ตั้งชื่อไฟล์
        const timestamp = Math.floor(Date.now() / 1000);
        const newName = useId + "_" + timestamp;
        const uploadTask = storage.ref(`images/${newName}`).put(file); //เปลี่ยนชื่อไฟล์ใน ref
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploadProgress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(newName)
                    .getDownloadURL()
                    .then((imagesURL) => {
                        console.log(imagesURL);
                        saveProduct(imagesURL);
                    })
            }
        );
    }
    const FILE_SIZE = 2000 * 1224;
    const SUPPORTED_TYPE = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "applivation/pdf",

    ]
    const formik = useFormik({
        initialValues: initProduct, //
        validationSchema: yup.object().shape({ //เงื่อนไข
            name_uni: yup.string().required("กรุณากรอกข้อมูล"),
            url_uni: yup.string().required("กรุณากรอกข้อมูล"),
            detail_uni: yup.string().required("กรุณากรอกข้อมูล"),
            file: yup
                .mixed()
                .test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                })
                .test("fileType", "รองรับเฉพสะรูปภาพ", (file) => {
                    if (file) {
                        return SUPPORTED_TYPE.includes(file.type);
                    } else {
                        return true;
                    }
                }),
        }),
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file);
            } else {
                saveProduct("");
            }
        },
    })
    const [product, setProduct] = useState(initProduct);
    const [submitted, setSubmitted] = useState(false);

    const handlleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setProduct({ ...product, [name]: value });
    };

    const saveProduct = (imagesURL) => {
        var data = {
            name_uni: formik.values.name_uni,
            url_uni: formik.values.url_uni,
            detail_uni: formik.values.detail_uni,
            image: imagesURL,
        };
    axios.post("http://localhost:8080/university" , data)
            .then((response) => {
                console.log(response.data);
                setSubmitted(true); //เมื่อคลิกให้เป็น true เพื่อเซ็ตค่าต่างๆ
            })
            .catch((error) => {  //แจ้งเตือน ดีบัค
                console.log(error);
            });
    };


    const newProduct = () => {
        formik.resetForm();
        setProgress(0);
        setSubmitted(false);
    };
    return (
      
        <Container>
           
               
{submitted ? (
   Swal.fire(

    'เพิ่มข้อมูลมหาลัยเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/universityall"))
                ) : (
                  
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup><br /><br /><br /><br />
                                <Label for="productName">ชื่อมหาลัย</Label>
                                <Input
                                    type="text"
                                    name="name_uni"
                                    id="productName"
                                    value={formik.values.name_uni}
                                    onChange={formik.handleChange}//เมื่อมีการพิมพ์ข้อความ
                                    placeholder="ระบุชื่อของสินค้า"
                                />
                                {formik.errors.name_uni && formik.touched.name(
                                    <p>{formik.errors.name_uni}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="productCategory">URL</Label>
                                <Input
                                    type="text"
                                    name="url_uni"
                                    id="productCatgory"
                                    value={formik.values.url_uni}
                                    onChange={formik.handleChange}
                                    placeholder="ระบุชนิดของสินค้า"
                                />

                                {formik.errors.name && formik.touched.url_uni(
                                    <p>{formik.errors.url_uni}</p> //เช็ค error
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="productTags">รายละเอียด</Label>
                                <Input
                                    type="text"
                                    name="detail_uni"
                                    id="productTags"
                                    value={formik.values.detail_uni}
                                    onChange={formik.handleChange}
                                    placeholder="ระบุ Tage ของสินค้า(หากมีมากกว่า 1 ให้คันด้วยเครื่องหมาย ,)"
                                />
                                {formik.errors.name && formik.touched.detail_uni(
                                    <p>{formik.errors.detail_uni}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="productImage"> โลโกมหาลัย (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
                                <Input type="file"
                                    name="file"
                                    onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files[0]) }} />
                                {progress !== 0 && <Progress value={progress}>{progress}%</Progress>}

                                {formik.errors.file && formik.touched.file && (
                                    <p>{formik.errors.file}</p>
                                )}
                            </FormGroup>
                            <Button type="submit" className="btn btn-success" >ตกลง</Button>
                        </Form>
                    )}

        </Container>
    )
};

export default ViewInsertUniversity;

