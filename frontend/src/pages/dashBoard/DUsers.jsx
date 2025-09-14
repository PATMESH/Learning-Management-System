import React, { useEffect, useState } from "react";
import { 
  Table, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Button, 
  Space, 
  Avatar, 
  Tag, 
  message,
  Descriptions,
  Row,
  Col,
  Card
} from "antd";
import { EyeOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { adminService } from "../../api/admin.service";

const { Option } = Select;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllUsers();
      if (res.success) {
        setUsers(res.data);
      } else {
        message.error("Failed to fetch users");
      }
    } catch (error) {
      message.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    editForm.setFieldsValue({
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      isActive: user.isActive,
      dob: user.dob,
      gender: user.gender,
      location: user.location,
      profession: user.profession,
      linkedin_url: user.linkedin_url,
      github_url: user.github_url,
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      const res = await adminService.updateUser(selectedUser.id, values);
      if (res.success) {
        message.success("User updated successfully");
        setEditModalVisible(false);
        fetchUsers(); // Refresh the users list
      } else {
        message.error("Failed to update user");
      }
    } catch (error) {
      message.error("Error updating user");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "profileImage",
      key: "avatar",
      width: 80,
      render: (profileImage, record) => (
        <Avatar
          size={40}
          src={profileImage ? `data:image/jpeg;base64,${profileImage}` : null}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (phone) => phone || "N/A",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "ADMIN" ? "red" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
      render: (profession) => profession || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            size="small"
          >
            View
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
          Users Management
        </h3>
        <p className="text-slate-600 mt-2">
          Manage and view all registered users
        </p>
      </div>

      <Card className="shadow-xl">
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* View User Modal */}
      <Modal
        title="User Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedUser && (
          <div>
            <Row gutter={24} className="mb-4">
              <Col span={6}>
                <div className="text-center">
                  <Avatar
                    size={80}
                    src={
                      selectedUser.profileImage
                        ? `data:image/jpeg;base64,${selectedUser.profileImage}`
                        : null
                    }
                    icon={<UserOutlined />}
                  />
                  <div className="mt-2">
                    <Tag
                      color={selectedUser.isActive ? "green" : "red"}
                      className="mb-2"
                    >
                      {selectedUser.isActive ? "Active" : "Inactive"}
                    </Tag>
                    <br />
                    <Tag color={selectedUser.role === "ADMIN" ? "red" : "blue"}>
                      {selectedUser.role}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col span={18}>
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Username" span={1}>
                    {selectedUser.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={1}>
                    {selectedUser.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone" span={1}>
                    {selectedUser.mobileNumber || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date of Birth" span={1}>
                    {selectedUser.dob || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender" span={1}>
                    {selectedUser.gender || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location" span={1}>
                    {selectedUser.location || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Profession" span={2}>
                    {selectedUser.profession || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="LinkedIn" span={1}>
                    {selectedUser.linkedin_url ? (
                      <a
                        href={selectedUser.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="GitHub" span={1}>
                    {selectedUser.github_url ? (
                      <a
                        href={selectedUser.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created At" span={1}>
                    {formatDate(selectedUser.createdAt)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Updated At" span={1}>
                    {formatDate(selectedUser.updatedAt)}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
          className="mt-4"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input the email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone Number" name="mobileNumber">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date of Birth" name="dob">
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Role" name="role">
                <Select>
                  <Option value="USER">USER</Option>
                  <Option value="ADMIN">ADMIN</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Status" name="isActive">
                <Select>
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gender" name="gender">
                <Select placeholder="Select gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Location" name="location">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Profession" name="profession">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="LinkedIn URL"
                name="linkedin_url"
                rules={[{ type: "url", message: "Please enter a valid URL!" }]}
              >
                <Input placeholder="https://linkedin.com/in/username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="GitHub URL"
                name="github_url"
                rules={[{ type: "url", message: "Please enter a valid URL!" }]}
              >
                <Input placeholder="https://github.com/username" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-right">
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update User
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Users;