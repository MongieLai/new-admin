import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Input, Form, InputNumber, Tabs, Modal, Button, Space, Descriptions } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const columns = [
    {
        title: 'IP地址',
        dataIndex: 'ipAddr',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <Button type='danger'>移除白名单</Button>
        ),
    }
];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        ipAddr: `192.168.2.${i}`
    });
}


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 20,
    },
};
export class Warn extends Component {
    state = {
        visible: false,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    showModal = () => {

        this.setState({
            visible: true,
        });
    };
    onFinish = values => {
        console.log(values);
    };
    fuck = async () => {
        const values = await this.formRef.current.validateFields()
        if (values.errorFields) {
            return
        }
        this.setState({
            visible: false,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    formRef = React.createRef();

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <>
                <Modal
                    title="修改访问预警配置"
                    visible={this.state.visible}
                    onOk={this.fuck}
                    onCancel={this.hideModal}
                    okText="确认修改"
                    cancelText="取消"
                >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} >
                        <Form.Item name='ip' label="时间(单位小时)" rules={[{ required: true, message: '请输入时间' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name='count' label="次数" rules={[{ required: true, message: '请输入次数' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="基础参数配置" key="1">
                        <Descriptions title="当前已配置参数详情">
                            <Descriptions.Item label="指定时段访问预警次数配置">
                                <span>{24}</span>小时内<span>{100}</span>次
                                <p><Button style={{ marginRight: 8 }} type='primary' onClick={this.showModal}>修改</Button></p>
                            </Descriptions.Item>
                        </Descriptions>
                        <p style={{ color: '#A9A9A9' }}>(同一IP地址在配置时间内访问超过配置次数时，发送报警)</p>
                        <p style={{ color: '#A9A9A9' }}>若要解除访问限制请配置IP白名单</p>
                    </TabPane>
                    <TabPane tab="IP白名单" key="2">
                        <Space size="large" style={{ marginBottom: 8 }}>
                            <Button type="primary" onClick={this.start} loading={loading}>
                                添加
                            </Button>
                            <Button type="danger" disabled={!hasSelected}>移除</Button>
                        </Space>
                        <Table scroll={{ y: 500 }} rowSelection={rowSelection} columns={columns} dataSource={data} />
                    </TabPane>
                </Tabs>
            </>
        )
    }
}

export default Warn
