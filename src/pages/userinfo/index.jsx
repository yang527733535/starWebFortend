import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Card } from 'antd';
import styles from './index.less'
import axios from 'axios'
import Qs from 'qs'
const Index = () => {
  const [] = useState(false);

  useEffect(() => {
    console.log(useEffect)
  }, [])
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async values => {

    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: 'http://localhost:8080/api/auth/login',
      data: Qs.stringify(values)
    }).then((res) => {
      console.log('res: ', res);
      if (res.data.code === 200) {
        message.success("登录成功")

        //在这里要把token存起来咯
        const token = res.data.data.token
        console.log('token: ', token);
        localStorage.setItem("token", token)

      }
    })

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);

  };

  const reqUserInfo = () => {
    let val = localStorage.getItem('token')
    axios({
      headers: {
        'Authorization': 'Bearer ' + val
      },
      method: 'get',
      url: 'http://localhost:8080/api/auth/me',

    }).then((res) => {
      console.log(res)
    })
  }


  return <div
    className={styles.mybox}
  >

    <Card style={{ width: 500, }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="手机号"
          name="telephone"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密碼"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>



        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </Card>

    <Card>
      <Button onClick={() => { reqUserInfo() }}>获取该用户信息</Button>
    </Card>

  </div>
};
export default Index;