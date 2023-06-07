import request from '@/utils/request'

// 查询菜单下拉树结构
export function treeselect() {
    return request({
      url: '/system/menu/treeselect',
      method: 'get'
    })
  }

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeSelect(roleId) {
  return request({
    url: '/system/menu/roleMenuTreeSelect/' + roleId,
    method: 'get'
  })
}