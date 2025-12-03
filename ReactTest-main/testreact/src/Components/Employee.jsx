import React, { useState } from "react";
import {
  Avatar,
  Modal,
  Form,
  Input,
  InputNumber,
  Card,
  message,
  Select,
  Checkbox,
  Switch,
} from "antd";
import "../index.css";

const ColumnList = [
  "name",
  "mail",
  "phoneNumber",
  "interviewScore",
  "address",
  "Actions",
];

const Employee = () => {
  const [form] = Form.useForm();

  const [isModelOpen, setIsModelOpen] = useState(false);

  const [employeeDetails, setEmployeeDetails] = useState([]);

  const [moveCenter, setMoveCenter] = useState([]);

  const [isDelete, setIsDelete] = useState(false);
  const [deleteVal, setDeleteVal] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isAllocate, setIsAllocate] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const [projectAlloZith, setProjectAlloZith] = useState([]);
  const [projectAlloSpace, setProjectAlloSpace] = useState([]);
  const [projectAlloZuk, setProjectAlloZuk] = useState([]);

  const [bulk, setBulk] = useState(false);
  const [bulkId, setBulkId] = useState([]);

  //add
  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      const newEmployee = {
        id: isEdit ? editId : Date.now(),
        name: values.name,
        mail: values.mail,
        phoneNumber: values.phoneNumber,
        interviewScore: values.interviewScore,
        otherDetails: {
          address: {
            city: values.city,
            state: values.state,
            country: values.country,
          },
        },
      };

      if (isEdit) {
        setMoveCenter((prev) =>
          prev.map((edi) => (edi.id == editId ? newEmployee : edi))
        );

        message.success(`${newEmployee.name} updated Sucessfully... `);
      } else {
        setEmployeeDetails((prev) => {
          const oldData = [...prev];
          oldData.push(newEmployee);
          return oldData;
        });

        message.success(`${newEmployee.name} Add Sucessfully... `);
      }
    } catch (error) {
      console.log("Error At handleOk", error);
    }
    setIsModelOpen(false);
    form.resetFields();
  };
  const handleAdd = () => {
    setIsModelOpen(true);
    setIsEdit(false);
  };

  //move

  const handleMove = (moveDetails) => {
    setMoveCenter((prev) => {
      const move = [...prev];
      move.push(moveDetails);
      return move;
    });

    setEmployeeDetails((prev) => {
      const oldData = [...prev];
      const index = oldData.findIndex((idx) => idx.id === moveDetails.id);
      if (index != -1) {
        oldData.splice(index, 1);
      }
      return oldData;
    });
  };

  //delete

  const handleDelete = (deleteDet) => {
    setIsDelete(true);
    setDeleteVal(deleteDet);
  };

  const handleDeleteOk = () => {
    setMoveCenter((prev) => {
      const oldData = [...prev];
      const index = oldData.findIndex((del) => del.id === deleteVal.id);
      if (index != -1) {
        oldData.splice(index, 1);
      }
      return oldData;
    });
    setIsDelete(false);

    setEmployeeDetails((prev) => {
      const old = [...prev];
      old.push(deleteVal);
      return old;
    });
  };

  // edit

  const handleEdit = (editDet) => {
    setIsEdit(true);
    setEditId(editDet.id);
    setIsModelOpen(true);
    form.setFieldsValue({
      name: editDet?.name,
      mail: editDet?.mail,
      phoneNumber: editDet?.phoneNumber,
      interviewScore: editDet?.interviewScore,
      city: editDet?.otherDetails?.address?.city,
      state: editDet?.otherDetails?.address?.state,
      country: editDet?.otherDetails?.address?.country,
    });
  };

  //select space

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const handleAllocation = (alloDet) => {
    if (selectedValue === "zithmi") {
      setProjectAlloZith((prev) => {
        const old = [...prev];
        old.push(alloDet);
        return old;
      });
    }

    if (selectedValue === "zithspace") {
      setProjectAlloSpace((prev) => {
        const old = [...prev];
        old.push(alloDet);
        return old;
      });
    }
    if (selectedValue === "zukvo") {
      setProjectAlloZuk((prev) => {
        const old = [...prev];
        old.push(alloDet);
        return old;
      });
    }

    setMoveCenter((prev) => {
      const del = [...prev];
      const index = del.findIndex((itm) => itm.id === alloDet.id);
      if (index != -1) {
        del.splice(index, 1);
      }
      return del;
    });

    message.success(`${alloDet?.name} Moved To Project Allocation`);
  };

  // card delete

  const handleZithDelete = (delDet) => {
    setProjectAlloZith((prev) => {
      const del = [...prev];
      const index = del.findIndex((itm) => itm.id === delDet.id);
      if (index != -1) {
        del.splice(index, 1);
      }
      return del;
    });

    setMoveCenter((prev) => {
      const add = [...prev];
      add.push(delDet);
      return add;
    });
  };

  const handleSpaceDelete = (delDet) => {
    setProjectAlloSpace((prev) => {
      const del = [...prev];
      const index = del.findIndex((itm) => itm.id === delDet.id);
      if (index != -1) {
        del.splice(index, 1);
      }
      return del;
    });
    setMoveCenter((prev) => {
      const add = [...prev];
      add.push(delDet);
      return add;
    });
  };

  const handleZukDelete = (delDet) => {
    setProjectAlloZuk((prev) => {
      const del = [...prev];
      const index = del.findIndex((itm) => itm.id === delDet.id);
      if (index != -1) {
        del.splice(index, 1);
      }
      return del;
    });
    setMoveCenter((prev) => {
      const add = [...prev];
      add.push(delDet);
      return add;
    });
  };

  // bulk

  const handleCheckBox = (id) => {
    setBulkId((prev) => {
      if (prev.includes(id)) return prev.filter((empId) => empId !== id);
      return [...prev, id];
    });
  };
  // console.log(bulkId)

  const handleMoveAll = () => {
    const move = employeeDetails.filter((emp) => bulkId.includes(emp.id));
    setMoveCenter((prev) => [...prev, ...move]);
    setEmployeeDetails((prev) =>
      prev.filter((emp) => !bulkId.includes(emp.id))
    );
    setBulkId([]);
    message.success("Selected employees moved successfully!");
    setBulk(false);
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          background: "black",
          padding: "10px",
        }}
      >
        <h1 style={{ color: "white" }}>Employee Onboarding System</h1>
        <p style={{ color: "white" }}>
          Manage employee onboarding and project allocation
        </p>
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            width: "20%",
          }}
        >
          <div
            style={{
              width: "15%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1> Employee Details</h1>
            <button
              style={{ margin: "30px", padding: "2px" }}
              onClick={() => handleAdd()}
            >
              Add Employee
            </button>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Switch checked={bulk} onChange={(checked) => setBulk(checked)} />
            <p>Bulk Onboarding Mode</p>
          </div>
          <div>
            {employeeDetails?.length > 0 &&
              employeeDetails.map((emp, i) => (
                <Card
                  key={i}
                  style={{ border: "1px solid black", margin: "5px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      {bulk && (
                        <Checkbox onChange={() => handleCheckBox(emp.id)} />
                      )}

                      <Avatar style={{ backgroundColor: "black" }}>
                        {emp?.name?.charAt(0)?.toUpperCase()}
                      </Avatar>

                      <div>
                        <h3 style={{ margin: 0 }}>{emp?.name}</h3>
                        <p style={{ margin: 0 }}>{emp?.mail}</p>
                        <p style={{ margin: 0 }}>
                          Score : {emp?.interviewScore}
                        </p>
                      </div>
                    </div>

                    
                    {!bulk && (
                      <button
                        onClick={() => handleMove(emp)}
                        style={{
                          padding: "3px 6px",
                          background: "black",
                          color: "white",
                          borderRadius: "6px",
                          border: "none",
                          marginTop:"70px"
                          
                        }}
                      >
                        Move
                      </button>
                    )}
                  </div>
                </Card>
              ))}

            
            {bulk && (
              <button
                onClick={() => handleMoveAll()}
                style={{ marginTop: "10px" }}
              >
                Move Selected
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            width: "60%",
            border: "1px solid #ccc", // ← add this
            // optional – smooth corners
            padding: "15px", // optional – inner space
          }}
        >
          <h3>Onboarding</h3>
          <p>Review and allocate employees to projects</p>
          <br />
          <div>
            <table className="table">
              <thead>
                <tr>
                  {ColumnList.map((emp, i) => (
                    <td key={i}>{emp}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moveCenter?.length > 0 &&
                  moveCenter.map((emp, i) => (
                    <tr key={i}>
                      <td>{emp?.name}</td>
                      <td>{emp?.mail}</td>
                      <td>{emp?.phoneNumber}</td>
                      <td>{emp?.interviewScore}</td>
                      <td>
                        {emp?.otherDetails?.address?.city}{" "}
                        {emp?.otherDetails?.address?.state}{" "}
                        {emp?.otherDetails?.address?.country}
                      </td>
                      {!isAllocate ? (
                        <td style={{ display: "flex", gap: "2px" }}>
                          <button onClick={() => handleEdit(emp)}>Edit</button>
                          <button onClick={() => handleDelete(emp)}>
                            Delete
                          </button>
                          <button onClick={() => setIsAllocate(true)}>
                            Allocate
                          </button>
                        </td>
                      ) : (
                        <td>
                          <Select
                            style={{ width: "100px" }}
                            onChange={handleSelect}
                            value={selectedValue}
                          >
                            <Select.Option value="zithmi">zithmi</Select.Option>
                            <Select.Option value="zithspace">
                              zithspace
                            </Select.Option>
                            <Select.Option value="zukvo">zukvo</Select.Option>
                          </Select>
                          <button onClick={() => handleAllocation(emp)}>
                            Move
                          </button>
                          <button onClick={() => setIsAllocate(false)}>
                            Cancle
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ width: "20%" }}>
          <h4 style={{paddingLeft:"10px"}}>Project Allocation</h4>
          <p style={{paddingLeft:"10px"}}>Employees assigned to projects</p>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "3px",
              margin: "20px",
              padding: "20px",
              background: "#eff6ff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h4 style={{ color: "blue" }}>zithmi</h4>
              <p
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "3px",
                  background: "#f4f4f4",
                }}
              >
                {projectAlloZith.length} members
              </p>
            </div>

            {projectAlloZith?.length > 0 ? (
              projectAlloZith.map((zith, i) => (
                <Card
                  key={i}
                  width="30%"
                  padding="30px"
                  margin="20px"
                  border="1px solid black"
                >
                  <h3>{zith?.name}</h3>
                  <p>{zith?.mail}</p>
                  <button onClick={() => handleZithDelete(zith)}>Delete</button>
                </Card>
              ))
            ) : (
              <p>No employees allocated yet</p>
            )}
          </div>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "3px",
              margin: "20px",
              padding: "20px",
              background: "#faf5ff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h4 style={{ color: "violet" }}>zithspace</h4>
              <p
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "3px",
                  background: "#f4f4f4",
                }}
              >
                {projectAlloSpace.length} members
              </p>
            </div>

            {projectAlloSpace?.length > 0 ? (
              projectAlloSpace.map((space, i) => (
                <Card
                  key={i}
                  width="30%"
                  padding="30px"
                  margin="20px"
                  border="1px solid black"
                >
                  <h3>{space?.name}</h3>
                  <p>{space?.mail}</p>
                  <button onClick={() => handleSpaceDelete(space)}>
                    Delete
                  </button>
                </Card>
              ))
            ) : (
              <p>No employees allocated yet</p>
            )}
          </div>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "3px",
              margin: "20px",
              padding: "20px",
              background: "#ecfdf5",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h4 style={{ color: "green" }}>zukvo</h4>
              <p
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "3px",
                  background: "#f4f4f4",
                }}
              >
                {projectAlloZuk.length} members
              </p>
            </div>

            {projectAlloZuk?.length > 0 ? (
              projectAlloZuk.map((zuk, i) => (
                <Card
                  key={i}
                  width="30%"
                  padding="30px"
                  margin="20px"
                  border="1px solid black"
                >
                  <h3>{zuk?.name}</h3>
                  <p>{zuk?.mail}</p>
                  <button onClick={() => handleZukDelete(zuk)}>Delete</button>
                </Card>
              ))
            ) : (
              <p>No employees allocated yet</p>
            )}
          </div>
        </div>
      </div>
      <Modal
        title={isEdit ? "Update Employee" : " Add New Employee"}
        open={isModelOpen}
        onOk={handleOk}
        onCancel={() => setIsModelOpen(false)}
        okText={isEdit ? "Update Employee" : "Add Employee"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "please input Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="mail"
            rules={[
              { type: "email", required: true, message: "please input Email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "please input phone Number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Interview Score"
            name="interviewScore"
            rules={[{ required: true, message: "please input phone Number" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "please input phone City" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "please input phone State" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "please input phone country" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Confirmation"
        open={isDelete}
        onOk={handleDeleteOk}
        onCancel={() => setIsDelete(false)}
      >
        <h3 style={{ color: "red" }}>Are You Sure You Want To Delete</h3>
      </Modal>
    </div>
  );
};

export default Employee;
