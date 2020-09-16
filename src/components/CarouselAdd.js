import React, { Component } from 'react'
import styled from 'styled-components';
import { Form, Radio, Input, Button, Select, Upload, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const ActionsBar = styled.div`
    display:flex;
    padding:8px 8px 8px 20px;
    align-items:center;
    span{
        margin-right:10px;
    }
`
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
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

class CarouselAdd extends Component {
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
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    handleChange = ({ fileList }) => {
        console.log(fileList)
        this.setState({ fileList })
    };
    fuck = (file, fileList) => {
        console.log(file)
        return this.checkImageWH(file, 82, 101)
    }

    checkImageWH = (file, width, height) => {
        return new Promise(function (resolve, reject) {
            let filereader = new FileReader()
            filereader.onload = e => {
                let src = e.target.result
                const image = new Image()
                image.onload = function () {
                    if (width && this.width / this.height !== width / height) {
                        // debugger
                        Modal.error({
                            title: '上传图片的宽高不符合要求，请重传',
                        })
                        reject()
                        // } else if (height && this.height !== height) {
                        //   Modal.error({
                        //     title: '请上传高为' + height + '的图片',
                        //   })
                        //   reject()
                    } else {
                        resolve()
                    }
                }
                image.onerror = reject
                image.src = src
            }
            filereader.readAsDataURL(file)
        })
    }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Container style={{ padding: 4 }}>

                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item name="img" label="请上传图片" rules={[{ required: true }]}>
                        <Upload
                            beforeUpload={this.fuck}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item name="note" label="是否排序">
                        <Radio.Group onChange={this.onChange} initialValues={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="发布部门" >
                        <Input style={{ width: '50%' }} disabled value={this.state.caozuobumen} />
                    </Form.Item>
                    <Form.Item label="操作人" >
                        {/* <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.onGenderChange}
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select> */}
                        <Input style={{ width: '50%' }} disabled value={this.state.caozuoren} />
                    </Form.Item>
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

export default CarouselAdd
