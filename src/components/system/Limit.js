import React, { Component } from 'react'
import { Table, Input, Form, message, InputNumber, Tabs, Modal, Button, Space, Descriptions } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const ipModalLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
export class Warn extends Component {
    state = {
        data: [],
        visible: false,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        configSubmitButton: false,
        configTime: 24,
        configCount: 100,
        addIpListLoading: false,
        ipModalVisible: false,
        deleteVisible: false,
        tempObj: null,
        deleteActive: false,
        editIpVisible: false
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'id'
        },
        {
            title: 'IP地址',
            dataIndex: 'ipAddr',
        },
        {
            title: '操作时间',
            dataIndex: 'handelAt'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button type='primary' onClick={() => {
                        this.setState({
                            editIpVisible: true,
                            tempObj: text
                        })
                        console.log(text)
                    }}>编辑</Button>
                    <Button type='danger' onClick={() => {
                        this.setState({
                            deleteVisible: true,
                            tempObj: text
                        })
                        console.log(text)
                    }}>移除限制名单</Button>
                </Space>
            ),
        }
    ];

    //组件挂载后初始化ip白名单数据
    componentDidMount = () => {
        const data = [];
        for (let i = 0; i < 11; i++) {
            data.push({
                id: i < 9 ? `0${i + 1}` : i + 1,
                key: i,
                ipAddr: `192.168.2.${i}`,
                handelAt: new Date().toISOString()
            });
        }
        this.setState({
            data
        })
    }

    //Dom引用
    configFormRef = React.createRef();
    ipFormRef = React.createRef()

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    onFinish = values => {
        console.log(values);
    };

    handelWarnSubmit = async () => { //修改预警配置提交时触发
        const values = await this.configFormRef.current.validateFields()
        //校验通过时value为表单全部值的合集
        if (values.errorFields) { //有校验失败信息时则返回
            return
        }
        this.setState({
            configSubmitButton: true
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                ipVisible: false,
                configSubmitButton: false,
                configTime: values.time,
                configCount: values.count,
            });
            this.configFormRef.current.setFieldsValue({
                time: values.time,
                count: values.count,
            })

            message.success('修改成功')
        }, 1000)
        //发送修改警告时间和次数成功后执行回调
    }

    addIpList = async () => {
        const values = await this.ipFormRef.current.validateFields()
        if (values.errorFields) {
            return
        }
        this.setState({
            ipModalVisible: true,
            ipVisible: true,
            addIpListLoading: true
        });
        setTimeout(() => {
            this.setState({
                ipModalVisible: false,
                addIpListLoading: false,
                data: [...this.state.data, { key: this.state.data.length, ipAddr: values.ipAddr }]
            });
            message.success('添加成功')
        }, 1000)
    }

    editIp = async () => {
        const values = await this.editIpFormRef.validateFields()
        if (values.errorFields) {
            return
        }
        console.log(values)
        const { data, tempObj } = this.state
        data.map((item, index) => {
            if (item.ipAddr === tempObj.ipAddr) {
                data[index].ipAddr = values.ipAddr
            }
        })
        console.log(data)
        this.setState({
            addIpListLoading: true
        });
        setTimeout(() => {
            this.setState({
                data,
                editIpVisible: false,
                addIpListLoading: false
            });
            message.success('编辑成功')
        }, 1000)
    }

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

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log(selectedRows)
        this.setState({ selectedRowKeys, selectedRows });
    };

    deleteInLine = () => {
        const { tempObj, data, deleteActive, selectedRows } = this.state
        let newData
        if (deleteActive) {
            console.log('你是点击操作栏的删除')
            newData = data.filter(item => {
                let temp = false
                selectedRows.map(i => {
                    if (item.ipAddr === i.ipAddr) {
                        temp = true
                    }
                })
                if (!temp) {
                    return item
                }
            })
        }
        else {
            console.log('你是行内删除')
            newData = data.filter(item => {
                if (item.ipAddr !== tempObj.ipAddr) {
                    return item
                }
            })
        }
        this.setState({
            confirmLoading: true
        })
        setTimeout(() => {
            this.setState({
                data: newData,
                deleteVisible: false,
                confirmLoading: false,
                deleteActive: false
            })
            message.success('删除成功')
        }, 2000)
    }

    actionBarDelete = () => {
        this.setState({
            deleteVisible: true,
            deleteActive: true
        })
    }

    render() {
        const { data, addIpListLoading, confirmLoading, deleteVisible, selectedRowKeys, configSubmitButton, configTime, configCount } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="已限制访问IP名单" key="1">
                        <Space size="large" style={{ marginBottom: 8 }}>
                            <Button type="primary" onClick={() => { this.setState({ ipModalVisible: true }) }} >
                                添加
                            </Button>
                            <Button type="danger" disabled={!hasSelected} onClick={this.actionBarDelete}>移除</Button>
                        </Space>
                        <Table bordered scroll={{ y: 500 }} rowSelection={rowSelection} columns={this.columns} dataSource={data} />
                    </TabPane>
                </Tabs>


                {/* 弹窗交互组件 */}
                <Modal
                    maskClosable={true}
                    title="修改访问预警配置"
                    visible={this.state.visible}
                    onCancel={this.hideModal}
                    cancelText='取消'
                    okText='修改'
                    onOk={this.handelWarnSubmit}
                    confirmLoading={configSubmitButton}
                >
                    <Form initialValues={{ time: this.state.configTime, count: this.state.configCount }} {...layout} ref={this.configFormRef} name="control-ref" onFinish={this.onFinish} >
                        <Form.Item name='time' label="时间(单位小时)" rules={[{ required: true, message: '请输入时间' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name='count' label="次数" rules={[{ required: true, message: '请输入次数' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    visible={this.state.ipModalVisible}
                    onCancel={() => this.setState({ ipModalVisible: false })}
                    maskClosable={true}
                    title="添加IP白名单"
                    cancelText='取消'
                    okText='添加'
                    onOk={this.addIpList}
                    confirmLoading={addIpListLoading}
                >
                    <Form {...ipModalLayout} ref={this.ipFormRef} name="ip-ref" >
                        <Form.Item name='ipAddr' label="IP地址" rules={[{ required: true, message: '请输入IP地址' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                {this.state.tempObj && <Modal
                    visible={this.state.editIpVisible}
                    onCancel={() => this.setState({ editIpVisible: false, tempObj: null })}
                    maskClosable={true}
                    title="编辑IP白名单"
                    cancelText='取消'
                    okText='修改'
                    onOk={this.editIp}
                    confirmLoading={addIpListLoading}
                >
                    <Form {...ipModalLayout} ref={ref => this.editIpFormRef = ref} name="edit-ip-ref" autoComplete="off">
                        <Form.Item name='ipAddr' label="IP地址" rules={[{ required: true, message: '请输入IP地址' }]} initialValue={this.state.tempObj.ipAddr}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>}



                <Modal
                    cancelText='取消'
                    okText='确定'
                    title="删除确认"
                    content='Some descriptions'
                    visible={deleteVisible}
                    onOk={this.deleteInLine}
                    confirmLoading={confirmLoading}
                    onCancel={() => { this.setState({ deleteVisible: false, deleteActive: false }) }}
                >
                    <p><ExclamationCircleOutlined style={{ color: 'red', marginRight: 4 }} />确定要删除选中内容吗?</p>
                </Modal>
            </>
        )
    }
}

export default Warn
