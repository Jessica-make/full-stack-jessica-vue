<template>
  <div class="app-container">
    <el-form :inline="true" ref="queryForm" :model="queryParams">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          size="small"
          style="width: 240px"
        >
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button type="primary" size="mini" plain icon="el-icon-plus"
            >新增</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="success" size="mini" plain icon="el-icon-edit"
            >修改</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="danger" size="mini" plain icon="el-icon-delete"
            >删除</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="warning" size="mini" plain icon="el-icon-download"
            >导出</el-button
          >
        </el-col>

        <right-tool-bar></right-tool-bar>
      </el-row>

      <el-table :data="roleList">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="角色编号" prop="roleId" width="120"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="150"></el-table-column>
        <el-table-column label="权限字符" prop="roleKey" width="150"></el-table-column>
        <el-table-column label="显示顺序" prop="roleSort" width="100"></el-table-column>
        <el-table-column label="状态" prop="status" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">
                  修改
              </el-button>

              <el-button size="mini" type="text" icon="el-icon-delete">
                  删除
              </el-button>

              <el-dropdown size="mini" type="text" icon="el-icon-edit">
                 <span class="el-dropdown-link">
                    <i class="el-icon-d-arrow-right"></i>更多
                 </span>
                 <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-circle-check">数据权限</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-user">分配用户</el-dropdown-item>
                 </el-dropdown-menu>
              </el-dropdown>
            </template>
        </el-table-column>
      </el-table>

      <!-- main.js 全局挂载了这个组件 -->
      <pagination 
      :total="total" 
      :pageSizes="[2,3,5,10]"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      @pagination="getList"
      >
      </pagination>
    </el-form>
  </div>
</template>

<script>
import {listRole} from '@/api/system/role'

export default {
  name: "Role",
  data() {
    return {
      dateRange: [],
      queryParams: {
        pageNum: 1, //默认查询第几页
        pageSize: 10, //默认查询1页多少条
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
      },
      roleList: [],
      total:0
    };
  },
  created(){
    this.getList()
  },
  methods: {
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.dateRange=[]
      this.resetForm('queryForm')
      this.handleQuery()
    },
    getList(){
      listRole(this.addDateRange(this.queryParams,this.dateRange)).then(res=>{
        this.roleList=res.rows;
        this.total=res.total
      })
    }
  },
};
</script>