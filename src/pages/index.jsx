import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;



export default ({ children, location }) => {


  useEffect(() => {

    const { pathname } = location
    console.log('pathname: ', pathname);
    // pathname: "/index"
    if (pathname === "/index") {

      setposition(['1'])
    }
  }, [])


  const [position, setposition] = useState([])

  const changepage = (pagetype) => {

    if (pagetype === 1) {
      setposition(['1'])
      history.push("/index")
    }
    if (pagetype === 2) {
      setposition(['2'])
      history.push("/upload")
    }
    if (pagetype === 3) {
      setposition(['3'])
      history.push("/userinfo")
    }

  }

  return (
    <div>
      <Layout
        style={{ backgroundImage: "url(" + require("../image/home_bg.png") + ")" }}
        className={styles.laylot}>
        <Header>
          <div></div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={position}
          // defaultSelectedKeys={position}
          >
            <Menu.Item
              onClick={() => { changepage(1) }}
              key="1">首页</Menu.Item>
            <Menu.Item
              onClick={() => { changepage(2) }}
              key="2">投稿</Menu.Item>
            <Menu.Item
              onClick={() => { changepage(3) }}
              key="3">个人中心</Menu.Item>
          </Menu>
        </Header>
        <Content

          style={{
            padding: '10px 50px',

            //  backgroundImage
          }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-content">
            {children}
          </div>
        </Content>
        <Footer
          style={{ textAlign: 'center' }}>Star Web</Footer>
      </Layout>
    </div >
  );
}
