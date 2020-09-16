import React, { Component } from 'react'
import { Result, Button } from 'antd';
export class Visit extends Component {
    render() {
        return (
            <div>
                <Result
                    status="403"
                    title="403"
                    subTitle="抱歉，您没有访问权限。"
                    // extra={<Button type="primary">返回</Button>}
                />
            </div>
        )
    }
}

export default Visit
