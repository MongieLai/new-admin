import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

const ActionsBar = styled.div`
    display:flex;
    padding:8px 8px 8px 20px;
    align-items:center;
    span{
        margin-right:10px;
    }
`

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
            data: this.getData(),
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
        }
    }

    getData() {
        return [
            { "U_ID": "T01", "C_BANNER_NAME": "三八妇女宣传图", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T02", "C_BANNER_NAME": "宣传图", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
        ]
    }

    handelEdit = (row) => {
        console.log('你点了编辑按钮')
    }

    handelDelete = (row) => {
        console.log('你点了删除按钮')
    }

    handelPublish = () => {
        console.log('你点了发布按钮')
    }

    skipRouteToAdd = () => {
        this.props.history.push('/system/lbgl/add')
    }

    render() {
        return (
            <Container style={{ padding: 4 }}>
                <ActionsBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => this.skipRouteToAdd()}>新增轮播图片</LinkButton>
                </ActionsBar>
                <DataGrid data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center" />
                    <GridColumn sortable field="C_BANNER_NAME" title="图片名称" align="center" />
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center" />
                    <GridColumn sortable field="D_ADDTIME" title="操作时间" align="center" width={110} />
                    <GridColumn sortable field="C_IS_PUBLISH" title="发布状态" align="center" width={110}
                        render={({ row }) => (
                            row.C_IS_PUBLISH === `0` ? '未发布' : '已发布'
                        )} />
                    <GridColumn title="操作" align="center" width={220}
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                {row.C_IS_PUBLISH === '0' ? <LinkButton iconCls='icon-ok' onClick={() => this.handelPublish()} style={{ marginRight: 4 }}>发布</LinkButton> : null}
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

export default Carousel
