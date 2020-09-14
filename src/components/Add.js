import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, CheckBox, TextBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';
import { message } from 'antd'
import logo from '../images/fuyou-logo.png'
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
            selectorList: []
        }
    }

    getData = () => {
        return [
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T01", "C_BANNER_NAME": "/images/xxx.jpg", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
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

    }

    handelActionsBarDelete = () => {
        if (this.state.selectorList.length === 0) {
            message.error('当前没有选中任何数据，无法删除！');
            return
        }
        console.log('你点了我')
    }

    render() {
        return (
            <Container>
                <ActionsBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => { this.skipRouteToAdd() }}>添加轮播图</LinkButton>
                    <LinkButton iconCls='icon-no' plain onClick={this.handelActionsBarDelete}>删除轮播图</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入用户名称:</span>
                    <TextBox onChange={searchInputValue => this.setState({ searchInputValue })} placeholder="请输入" style={{ width: 220 }} value={this.state.searchInputValue}></TextBox>
                    <LinkButton iconCls="icon-search" plain onClick={() => { this.handelSearch() }}>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain onClick={() => { this.handelResetSearch() }}>重置</LinkButton>
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
                    <GridColumn title="图片" align="center"
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                <img src={logo}></img>
                            </div>
                        )}
                    />
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center" />
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" />
                    <GridColumn field="C_STAT" title="用户状态" align="center"
                        render={({ row }) => (
                            row.C_IS_PUBLISH === `1` ? '已发布' : '未发布'
                        )}></GridColumn>
                    <GridColumn title="操作" align="center"
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                {row.C_IS_PUBLISH === '0' && <LinkButton iconCls='icon-edit' onClick={() => this.handelEdit(row)} style={{ marginRight: 4 }}>发布</LinkButton>}
                                <LinkButton iconCls='icon-edit' onClick={() => this.handelEdit(row)} style={{ marginRight: 4 }}>编辑</LinkButton>
                                <LinkButton iconCls='icon-no' onClick={() => this.handelDelete(row)} > 删除</LinkButton>
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
