import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, CheckBox, TextBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

// 最外层容器样式
const Container = styled.div` 
    height:100%;
    padding: 4px;
    display:flex;
    flex-direction:column;
    > div:nth-child(2){
        flex-grow:1;
        overflow-y:auto;
       
    }
    
`

//添加查询栏
const ActionsBar = styled.div`
    display:flex;
    margin-bottom:16px;
    align-items:center;
    span{
        margin-right:10px;
    }
`

class User extends Component {
    constructor() {
        super();
        this.state = {
            data: this.getData(),
            searchInputValue: '',
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
            allChecked: false,
            rowClicked: false,
            selectorList: [],
            ModalText: '确定要删除选中内容吗?',
            visible: false,
            confirmLoading: false,
        }
    }

    getData = () => {
        return [
            { "U_ID": "T01", "ip_addr": "120.237.154.53", "D_ADDTIME": "2018-09-10", "status": "0" },
            { "U_ID": "T01", "ip_addr": "122.237.154.53", "D_ADDTIME": "2018-09-10", "status": "1" },
        ]
    }


    handleRowCheck(row, checked) {
        let data = this.state.data.slice();
        let index = this.state.data.indexOf(row);
        data.splice(index, 1, Object.assign({}, row, { selected: checked }));
        let checkedRows = data.filter(row => row.selected);
        this.setState({
            allChecked: data.length === checkedRows.length,
            rowClicked: true,
            data: data
        }, () => {
            this.setState({ rowClicked: false })
        });
    }
    handleAllCheck(checked) {
        if (this.state.rowClicked) {
            return;
        }
        let data = this.state.data.map(row => {
            return Object.assign({}, row, { selected: checked })
        });
        this.setState({
            allChecked: checked,
            data: data
        })
    }

    handelEdit = (row) => {
        console.log('你点了编辑按钮')
    }

    handelDelete = (row) => {
        console.log('你点了删除按钮')
    };

    handelSearch = () => {
        console.log('你点了查询按钮')
        const { searchInputValue } = this.state
        console.log(searchInputValue)
    }

    handelResetSearch = () => {
        console.log('你点了重置按钮')
    }

    skipRouteToAdd = () => {
        this.props.history.push('/system/limit/add')
    }

    handelActionsBarDelete = () => {
        if (this.state.selectorList.length === 0) {
            message.error('当前没有选中任何数据，无法删除！');
            return
        }
        console.log('你点了我')
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: '删除中...',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            message.success('删除成功！');
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };



    render() {
        const { visible, confirmLoading, ModalText } = this.state;

        return (
            <Container>

                <Modal
                    cancelText='取消'
                    okText='确定'
                    title="删除确认"
                    content='Some descriptions'
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p><ExclamationCircleOutlined style={{ color: 'red', marginRight: 4 }} />{ModalText}</p>
                </Modal>
                <ActionsBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => { this.skipRouteToAdd() }}>添加限制IP地址</LinkButton>
                    <LinkButton iconCls='icon-no' plain onClick={this.handelActionsBarDelete}>解除IP限制</LinkButton>
                </ActionsBar>

                <DataGrid data={this.state.data}>
                    <GridColumn
                        width={50} align="center"
                        render={({ row }) => (
                            <CheckBox checked={row.selected} onChange={(checked) => this.handleRowCheck(row, checked)}></CheckBox>
                        )}
                        header={() => (
                            <CheckBox checked={this.state.allChecked} onChange={(checked) => this.handleAllCheck(checked)}></CheckBox>
                        )} />
                    <GridColumn sortable field="U_ID" title="序号" align="center" />
                    <GridColumn sortable field="ip_addr" title="ip地址" align="center" />
                    <GridColumn sortable field="D_ADDTIME" title="操作时间" align="center" />
                    <GridColumn title="操作" align="center"
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                <LinkButton iconCls='icon-edit' onClick={() => this.handelEdit(row)} style={{ marginRight: 4 }}>编辑</LinkButton>
                                <LinkButton iconCls='icon-no' onClick={() => this.showModal(row)} >解除</LinkButton>
                            </div>
                        )}
                    />

                </DataGrid>
                <Pagination
                    pageList={[50]}
                    total={this.state.total}
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    layout={this.state.layout}
                    onPageChange={event => this.handlePageChange(event)}
                />
            </Container >
        );
    }
}

export default User
