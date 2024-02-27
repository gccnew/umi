import { Progress, Flex, Descriptions } from 'antd';
import services from '@/services/demo';
import React, { PropsWithChildren, useEffect, useState } from 'react';

const { getDetail} =
  services.UserController;

const DescribeInfo: React.FC = () => {
    const [info,setInfo] = useState({})

    useEffect(()=>{
        (async function anyNameFunction() {
            const { data, success } = await getDetail();
            console.log(data?.list)
            setInfo(data?.list)
          })();
    },[])
    return (
    <>
    <Flex justify="space-between" align="start" style={{ paddingBottom: 32 }}>
        <Flex justify="space-between" wrap="wrap"  style={{width:'60%'}} gap="small">
            <Descriptions column={3} style={{ marginBlockEnd: -16 }}>
            <Descriptions.Item label="车牌">{info.car_plate}</Descriptions.Item>
            <Descriptions.Item label="业务组">
                <a>{info.business_type}</a>
            </Descriptions.Item>
            <Descriptions.Item label="车型">{info.car_type}</Descriptions.Item>
            <Descriptions.Item label="agent 版本">
                {info.agent_version}
            </Descriptions.Item>
            <Descriptions.Item label="城市">
                {info.car_city}
            </Descriptions.Item>
            <Descriptions.Item label="环境">
                {info.ota_env}
            </Descriptions.Item>
            <Descriptions.Item label="工作名称">
                {info.workflow_name}
            </Descriptions.Item>
            </Descriptions>
        </Flex>
        <Flex justify="space-between" align="start"  gap="small">
            <div style={{textAlign:'center',marginRight:20}}>
                下载成功率<br/>
                <Progress type="circle" size={80} percent={info.avg_download_sr} style={{marginTop:10}}/>
            </div>
            <div style={{textAlign:'center'}}>
                部署成功率<br/>
                <Progress type="circle" size={80} percent={info.avg_deploy_sr} style={{marginTop:10}}/>
            </div>

        </Flex>
    </Flex>
    </>
      
    );
  };
 
  export default DescribeInfo;

