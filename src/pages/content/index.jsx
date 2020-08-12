import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Card } from 'antd';
import styles from './index.less'
const { Meta } = Card;
const Index = () => {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    //在这里获取所有的数据
    axios.get('http://localhost:8080/api/auth/videolist')
      .then(function (response) {
        const { videolist } = response.data.data
        console.log('videolist: ', videolist);
        setvideos(videolist)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  return <>
    <div className={styles.mybox}>

      {videos.map((item) => {
        return (
          <Card
            className={styles.mycard}
            hoverable
            style={{ width: 200 }}
            cover={
              <img alt="example"
                src={item.avatar === "" ? "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" : item.avatar} />}
          >
            <Meta
              title={item.title}
              description={item.info} />
          </Card>
        )
      })}

    </div>


  </>
};
export default Index;