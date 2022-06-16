import request from '@/utils/request'


export default {
    //根据选中三级分类后获取平台属性列表
    /*
    获取指定分类下的属性列表
    GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
    */
    getList(category1Id,category2Id,category3Id){
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },
    //删除属性
    /* 
    删除指定id的属性
    DELETE /admin/product/deleteAttr/{attrId}
    */
    delete(attrId){
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    },
    //修改或添加属性
    /* 
    添加和更新属性
    POST /admin/product/saveAttrInfo
    */
    addOrUpdate(attr){
        return request.post('/admin/product/saveAttrInfo',attr)
    },
    //根据id获取属性值列表
    /*
    获取指定属性ID的所有属性值列表
    GET /admin/product/getAttrValueList/{attrId}
    */
    getValueList(attrId){
        return request.get(`/admin/product/getAttrValueList/${attrId}`)
    }
   
}