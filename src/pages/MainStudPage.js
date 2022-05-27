import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";


class MainStudPage extends Component {
   constructor(props){
       super(props)
       this.state={
           showModal:false,
           showModalEdit:false,
           formState: {
            userId:"",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            address: "",
            city: "",
            gender: "",
            zip: "",
          },
          users:{},
          editUsers:{},
          isValid:false,
          errorMsgEmail:"",
          errorMsgPassword:"",
          selectedRow:[],
          selectedStudentForEdit:{},
          editMode:false
       }
   }


   handleCloseModal=()=>{
    this.setState({
        showModal:false
    })
   }
   handleShowModal=()=>{
    this.setState({
        showModal:true
    })
   }

   handleCloseModalEdit=()=>{
    this.setState({
        showModalEdit:false
    })
   }
   handleShowModalEdit=(indexToEdit)=>{
     let selectedStudent=this.state.selectedRow[indexToEdit]
    this.setState({
        showModalEdit:true
    })
   }
   
    handleOnChange=(event)=>{
        console.log("input state",event.target.name,event.target.value);

                if(event.target.name=="email"){

                    const emailRegex = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
                        const pattern=emailRegex.test(event.target.value)
                        console.log("pattern=>",pattern)
                        if(pattern==true){
                        this.setState({
                            isValid:true,
                            errorMsgEmail:""
                        })
                        }
                        else{
                            this.setState({
                                isValid:false,
                                errorMsgEmail:"Please enter a valid email address!"
                            })
                        }
                    }    

                    if(event.target.name=="password"){

                      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
                          const pswdpattern=passwordRegex.test(event.target.value)
                          console.log("password pattern=>",pswdpattern)
                          if(pswdpattern==true){
                          this.setState({
                              isValid:true,
                              errorMsgPassword:""
                          })
                          }
                          else{
                              this.setState({
                                  isValid:false,
                                  errorMsgPassword:"Please enter a valid password!"
                              })
                          }
                      }                        

        this.setState({
            formState:{...this.state.formState,[event.target.name]:event.target.value}
        })
    }
    
    handleOnSelect = (eventKey,event) => {
        this.setState({
            formState:{...this.state.formState,"gender":event.target.name}
        })
        console.log("gender=>", eventKey,event.target.name);
      }


    onClickSubmit = () => {

        let usersClone = this.state.users;
        let newIndex = Object.keys(usersClone).length + 1;
        usersClone[newIndex] = {
          userId: newIndex,
          firstname: this.state.formState.firstname,
          lastname: this.state.formState.lastname,
          email: this.state.formState.email,
          password: this.state.formState.password,
          address: this.state.formState.address,
          city: this.state.formState.city,
          gender: this.state.formState.gender,
          zip: this.state.formState.zip,
        };
    
        this.setState({
          users: usersClone,
          formState:''
        });

        console.log("users",this.state.users)
      };

      handleDelete=(indexToDelete)=>{
      let usersClone=this.state.users
      delete usersClone[indexToDelete]
      this.setState({
        users:usersClone
      })
      }

    

      handleOnChangeEdit=(event)=>{
        console.log("input state edit",event.target.name,event.target.value);

                if(event.target.name=="email"){

                    const emailRegex = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
                        const pattern=emailRegex.test(event.target.value)
                        console.log("pattern=>",pattern)
                        if(pattern==true){
                        this.setState({
                            isValid:true,
                            errorMsgEmail:""
                        })
                        }
                        else{
                            this.setState({
                                isValid:false,
                                errorMsgEmail:"Please enter a valid email address!"
                            })
                        }
                    }    

                    if(event.target.name=="password"){

                      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
                          const pswdpattern=passwordRegex.test(event.target.value)
                          console.log("password pattern=>",pswdpattern)
                          if(pswdpattern==true){
                          this.setState({
                              isValid:true,
                              errorMsgPassword:""
                          })
                          }
                          else{
                              this.setState({
                                  isValid:false,
                                  errorMsgPassword:"Please enter a valid password!"
                              })
                          }
                      }                        

        this.setState({
            editUsers:{...this.state.editUsers,[event.target.name]:event.target.value}
        })
      }

      handleOnCheckRow=(userId)=>{
        console.log("user id=>", userId);
        let selectedRowClone = this.state.selectedRow;
     
      console.log("selected student=>", this.state.selectedRow);
      }

      handleOnChangeAllSelect=()=>{

      }

  render() {
      const {showModal,formState,users,isValid,errorMsgEmail,errorMsgPassword,showModalEdit,selectedRow}=this.state

    return(
        <>
        <h5 className="header-margin">
            <strong>Student Registration :</strong>
            <Button size="sm" className="register-btn-margin" onClick={this.handleShowModal}>
                Register here
            </Button>
        </h5>


       {/* ADD MODAL : popup student registration form */}

         {showModal && 
        <Modal show={showModal} onHide={this.handleCloseModal} className="modal-width">
            <Modal.Header closeButton>
              <h6>
                <strong>Student Registration</strong>
              </h6>
            </Modal.Header>
            <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter firstname"
                  value={formState.firstname}
                  name="firstname"
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="lastname"
                  placeholder="Enter lastname"
                  value={formState.lastname}
                  name="lastname"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formState.email}
                  name="email"
                  onChange={this.handleOnChange}
                />
                {!isValid && <span className="error">{errorMsgEmail}</span>}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.password}
                  name="password"
                  onChange={this.handleOnChange}
                />
                {!isValid && <span className="error">{errorMsgPassword}</span>}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                value={formState.address}
                name="address"
                onChange={this.handleOnChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  value={formState.city}
                  name="city"
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Row>
                  <Col xs={2}> Gender</Col>
                  <Col>
                    <Dropdown onSelect={this.handleOnSelect}>
                      <Dropdown.Toggle
                        variant="secondary"
                        id="dropdown-basic"
                        align="center"
                      >
                        Dropdown Button
                      </Dropdown.Toggle>
                      <Dropdown.Menu  name="gender" value={formState.gender}>
                        <Dropdown.Item href="#/action-1" name="female">Female</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" name="male">Male</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" name="other">Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  value={formState.zip}
                  name="zip"
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={this.onClickSubmit}>
              Submit
            </Button>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
          </Modal> 
        }




     {/*DISPLAY TABLE  */}
     <div className="table-setmargin">
      <Table striped bordered hover size="sm" className="table-width">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox"
                        checked={selectedRow.length == Object.keys(users).length}
                        onChange={this.handleOnChangeAllSelect}
                        />
                    </th>
                    <th>user-Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Zip</th>
                </tr>
            </thead>

            <tbody>
                  {Object.values(users).map((user)=>{
                      return(
                          <tr>
                              <td>
                                  <input type="checkbox"
                                  checked={selectedRow.includes(user.userId)}
                                  onChange={() => this.handleOnCheckRow(user.userId)}
                                  />
                              </td>
                              <td>{user.userId}</td>
                              <td>{user.firstname}</td>
                              <td>{user.lastname}</td>
                              <td>{user.email}</td>
                              <td>{user.password}</td>
                              <td>{user.address}</td>
                              <td>{user.city}</td>
                              <td>{user.gender}</td>
                              <td>{user.zip}</td>
                              <td>
                              <div className="flex">
                                  <span>
                                    <button type="button" className="btn btn-primary" onClick={()=>this.handleShowModalEdit(user.userId)}>
                                      <span className="bi bi-pencil"></span>
                                    </button>
                                  </span>
                                  <span className="btn-left">
                                      <button type="button" className="btn btn-primary" onClick={()=>this.handleDelete(user.userId)}>
                                        <span className='bi bi-x'></span>
                                      </button>
                                  </span>
                              </div>
                              </td>
                          </tr>
                      )
                  })}
            </tbody>
      </Table>



      {/* EDIT MODAL */}
      {showModalEdit && 
        <Modal show={showModalEdit} onHide={this.handleCloseModalEdit} className="modal-width">
            <Modal.Header closeButton>
              <h6>
                <strong>Edit Student Registration</strong>
              </h6>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>userId:</Form.Label>
              <Form.Control
                placeholder="user Id"
                disabled defaultValue={formState.userId}
                name="userId"
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter firstname"
                  value={formState.firstname}
                  name="firstname"
                  onChange={this.handleOnChangeEdit}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="lastname"
                  placeholder="Enter lastname"
                  value={formState.lastname}
                  name="lastname"
                  onChange={this.handleOnChangeEdit}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formState.email}
                  name="email"
                  onChange={this.handleOnChangeEdit}
                />
                {!isValid && <span className="error">{errorMsgEmail}</span>}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.password}
                  name="password"
                  onChange={this.handleOnChangeEdit}
                />
                {!isValid && <span className="error">{errorMsgPassword}</span>}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                value={formState.address}
                name="address"
                onChange={this.handleOnChangeEdit}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  value={formState.city}
                  name="city"
                  onChange={this.handleOnChangeEdit}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Row>
                  <Col xs={2}> Gender</Col>
                  <Col>
                    <Dropdown onSelect={this.handleOnSelect}>
                      <Dropdown.Toggle
                        variant="secondary"
                        id="dropdown-basic"
                        align="center"
                      >
                        Dropdown Button
                      </Dropdown.Toggle>
                      <Dropdown.Menu  name="gender" value={formState.gender}>
                        <Dropdown.Item href="#/action-1" name="female">Female</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" name="male">Male</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" name="other">Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  value={formState.zip}
                  name="zip"
                  onChange={this.handleOnChangeEdit}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={this.handleUpdate}>
              Update
            </Button>
            <Button variant="secondary" onClick={this.handleCloseModalEdit}>
              Close
            </Button>
          </Modal.Footer>
          </Modal> 
        }


      </div>

        </>
    )
  }
}

export default MainStudPage;
