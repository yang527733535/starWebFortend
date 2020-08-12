import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios'
import Qs from 'qs'



import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const Index = () => {
  const [key, setkey] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [loading, setloading] = useState(false);
  const [imagetoken, setimagetoken] = useState("");
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = values => {

    delete values.avatar
    const myparam = { ...values, key }
    let val = localStorage.getItem('token')

    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + val
      },
      method: 'post',
      url: 'http://localhost:8080/api/auth/createVideo',
      data: Qs.stringify(myparam)
    }).then((res) => {
      console.log('res: ', res);

    })

  };

  function beforeUpload(file) {



    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;

  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {


    //在这里要先获取凭证

    if (info.file.status === 'uploading') {

      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, imageUrl => {
        setimageUrl(imageUrl)
        setloading(false)
      }
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  async function mycustomRequest({
    action,
    file,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) {

    //在这里暂停一秒


    const myfilename = {
      filename: file.name
    }
    console.log(myfilename)
    let val = localStorage.getItem('token')
    await axios({
      headers: {
        'Authorization': 'Bearer ' + val
      },
      method: 'post',
      url: 'http://localhost:8080/api/auth/uploadtoken',
      data: Qs.stringify(myfilename)
    }).then((res) => {
      console.log(res)
      //在这里要把东西存起来
      const imagetoken = res.data.data.signedPutURL
      const imageUrl = res.data.data.signedGetURL
      const key = res.data.data.key
      // setimageUrl()
      const reader = new FileReader();
      console.log(file)
      reader.readAsArrayBuffer(file);
      let fileData = null;
      reader.onload = (e) => {
        // 在文件读取结束后执行的操作
        fileData = e.target.result;
        console.log(fileData)
        // 使用 axios 进行文件上传的请求
        console.log("123----imagetoken", imagetoken)
        axios.put(imagetoken, fileData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            // 进行上传进度输出，更加直观
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
          },
        }).then(response => {
          console.log(response)
          onSuccess(response, file);
          setimageUrl(imageUrl)
          setkey(key)
        })
          .catch(onError);
      };
    })



  }
  return <div>

    <Form {...layout}
      name="nest-messages"
      onFinish={onFinish}
    // validateMessages={validateMessages}
    >
      <Form.Item name='title' label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='info' label="info" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='url' label="url" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='avatar' label="avatar"
        rules={[{ required: false }]}>
        <Upload
          headers={{
            'Content-Type': 'image/png',
          }}
          action={imagetoken}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          customRequest={mycustomRequest}
        // onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      {/* <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item> */}
      {/* <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item> */}
      {/* <Form.Item name='user' label="Website">
        <Input />
      </Form.Item>
      <Form.Item name='introduction' label="Introduction">
        <Input.TextArea />
      </Form.Item> */}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

  </div>
};
export default Index;