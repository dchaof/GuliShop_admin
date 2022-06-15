import request from '@/utils/request'


export default {
    //根据选中三级分类后获取平台属性列表
    getList(category1Id,category2Id,category3Id){
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },
    //删除属性
    delete(attrId){
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    },
    //修改或添加属性
    addOrUpdate(attr){
        return request.post('/admin/product/saveAttrInfo',attr)
    },
    //根据id获取属性值列表
    getAttrValueList(attrId){
        return request.get(`/admin/product/getAttrValueList/${attrId}`)
    }
}