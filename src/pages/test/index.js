import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Table, Tag, Input, Button, Modal, Pagination, Form, Menu, Dropdown,Alert } from 'antd';
import { connect } from 'dva';

import RenderAuthorized from '@/components/Authorized';




import styles from './index.less';

const { Column, ColumnGroup } = Table;

const FormItem = Form.Item;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
@connect(({ test }) => {
  return {
    test
  };
})
export default class testCompent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedRowKeys: [],
      list:[],
      loading: false,
      search:{
        name:null,
        address:null
      },
      pagination: {
        total: 500,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange:this.pageChange,
        onShowSizeChange:this.sizeChange

      },
    };
  }

  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/query_list',
      payload: {},
    });
   
    // this.setState({ list: this.props.test.list});
  }


  // 进行搜索
  handleSearch = () => {
    console.log("搜索值",this.state.search)
  };

  // 输入框发生改变
  changeSearchName=(e)=>{
    let newTestData=Object.assign(this.state.search,{['name']:e.target.value}); 
    this.setState({
      search:newTestData
    })
  }
  changeSearchAdd=(e)=>{
    let newTestData=Object.assign(this.state.search,{['address']:e.target.value}); 
    this.setState({
      search:newTestData
    })
  }
  
  // 多选
  selectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  // 多选操作项目
  handleMenuClick = () => {

  };
  sizeChange=(page,pageSize)=>{
    console.log("情况",pageSize)

  }
  pageChange=(page,pageSize)=>{
    let newTestData=Object.assign(this.state.pagination,{['current']:page},{['pageSize']:pageSize}); 
    this.setState({
      pagination:newTestData
    })
    
  }
  // 打开对话框
  handleOk = () => {
    this.setState({ isModalVisible: true });
  };
  // 关闭对话框
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  render() {

    const Authorized = RenderAuthorized(['admin']);

    
    const {list} =this.props.test;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.selectChange,
    };
    return (
      <PageHeaderWrapper title="测试界面">
        <div className={styles.search}>
          <Form layout="inline">
            <FormItem label="姓名">
              <Input placeholder="姓名" value={this.state.search.name} onChange={this.changeSearchName}/>
            </FormItem>
            <FormItem label="地址">
              <Input placeholder="地址" value={this.state.search.address} onChange={this.changeSearchAdd}/>
            </FormItem>
          </Form>
          <Authorized authority={['vip']}> <Button type="primary" onClick={this.handleSearch}>搜索</Button></Authorized>
         
          <Button style={{ marginLeft: '8px' }}>重置</Button>
        </div>

        <div className={styles.moreHandle}>

          <Button type="primary" style={{ marginRight: '8px' }}>新建</Button>
          <Dropdown overlay={menu}>
            <Button>
              更多操作
            </Button>
          </Dropdown>


        </div>
        <div className={styles.tableMain}>
          <Table dataSource={list} pagination={this.state.pagination} rowSelection={rowSelection}>
            <ColumnGroup title="Name">
              <Column title="First Name" dataIndex="firstName" key="firstName" />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={tags => (
                <>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <a onClick={this.handleOk}  className={styles.btn}>编辑</a>
                  <a  className={styles.btn}>删除</a>
                </span>
              )}
            />
          </Table>
        </div>

        <Modal
          title="弹窗界面"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
