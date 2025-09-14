import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import moment from 'moment';

const { Option } = Select;

const EditProfileModal = ({ visible, onCancel, userDetails, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && userDetails) {
      form.setFieldsValue({
        username: userDetails.username,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        dob: userDetails.dob ? moment(userDetails.dob) : null,
        gender: userDetails.gender,
        location: userDetails.location,
        profession: userDetails.profession,
        linkedin_url: userDetails.linkedin_url,
        github_url: userDetails.github_url,
      });
    }
  }, [visible, userDetails, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
      };

      const success = await onUpdate(formattedValues);
      
      if (success) {
        message.success('Profile updated successfully!');
        onCancel();
      } else {
        message.error('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateURL = (_, value) => {
    if (!value) return Promise.resolve();
    
    try {
      new URL(value);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error('Please enter a valid URL'));
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FontAwesomeIcon icon={faUser} style={{ color: '#4f46e5' }} />
          <span>Edit Profile</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '16px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please enter your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' },
            ]}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faUser} style={{ color: '#9ca3af' }} />}
              placeholder="Enter your username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
          >
            <Input
              prefix={<FontAwesomeIcon icon={faEnvelope} style={{ color: '#9ca3af' }} />}
              placeholder="Email cannot be changed"
              size="large"
              disabled
            />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="mobileNumber"
            label="Phone Number"
            rules={[
              { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number!' },
            ]}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faPhone} style={{ color: '#9ca3af' }} />}
              placeholder="Enter your phone number"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
          >
            <DatePicker
              placeholder="Select date of birth"
              size="large"
              style={{ width: '100%' }}
              disabledDate={(current) => current && current > moment().endOf('day')}
            />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="gender"
            label="Gender"
          >
            <Select
              placeholder="Select your gender"
              size="large"
              allowClear
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
          >
            <Input
              prefix={<FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#9ca3af' }} />}
              placeholder="Enter your location"
              size="large"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="profession"
          label="Profession"
          style={{ marginBottom: '16px' }}
        >
          <Input
            prefix={<FontAwesomeIcon icon={faBriefcase} style={{ color: '#9ca3af' }} />}
            placeholder="Enter your profession"
            size="large"
          />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="linkedin_url"
            label="LinkedIn URL"
            rules={[
              { validator: validateURL },
            ]}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faLinkedin} style={{ color: '#9ca3af' }} />}
              placeholder="https://linkedin.com/in/username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="github_url"
            label="GitHub URL"
            rules={[
              { validator: validateURL },
            ]}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faGithub} style={{ color: '#9ca3af' }} />}
              placeholder="https://github.com/username"
              size="large"
            />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <Button
            onClick={onCancel}
            size="large"
            style={{ minWidth: '100px' }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              minWidth: '140px'
            }}
          >
            Update Profile
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;