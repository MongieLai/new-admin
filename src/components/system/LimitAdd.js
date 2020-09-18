import React, { Component } from 'react'
import styled from 'styled-components';
import { Form, Radio, Input, Button, Select, PageHeader } from 'antd';
const ListItem = styled.div`

`

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 20,
    },
};
const Container = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    > div:nth-child(2){
        flex-grow:1;
        overflow-y:auto;
        > .panel-body{
            border-color: #cccccc !important;
        }
    }
`

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            pageNumber: 1,
            pageSize: 50,
            total: 50,
            layout: [
                "list",
                "first",
                "prev",
                "links",
                "next",
                "last",
            ],
            caozuoren: '张三',
            caozuobumen: '信息部',
            value: 1,
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [
                // {
                //     uid: '-1',
                //     name: 'image.png',
                //     status: 'done',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // }
            ],
        }
    }

    formRef = React.createRef();

    onGenderChange = value => {
        this.formRef.current.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };

    onFinish = values => {
        console.log(values);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <Container>
                <PageHeader
                    style={{ padding: 0 }}
                    className="site-page-header"
                    onBack={() => this.props.history.push('/system/limit')}
                    title="添加限制访问IP"
                />
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} initialValues={{ ipType: 1 }}>
                    <Form.Item name="ipType" label="添加单个IP地址/IP段">
                        <Radio.Group onChange={this.onChange} initialValues={1}>
                            <Radio value={1}>IP地址</Radio>
                            <Radio value={0}>IP段</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {this.state.value === 1 ?
                        (<Form.Item name='ip' label="IP地址" rules={[{ required: true, message: '请输入IP' }]}>
                            <Input autoComplete="off" />
                        </Form.Item>) :
                        (<>
                            <Form.Item name='startIp' label="起始IP" rules={[{ required: true, message: '请输入起始IP' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name='endIp' label="结尾IP" rules={[{ required: true, message: '请输入结尾IP' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </>
                        )
                    }
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) => {
                            return getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null;
                        }}
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            确认提交
                        </Button>
                    </Form.Item>
                </Form>
            </Container >
        );
    }
}

export default Carousel
