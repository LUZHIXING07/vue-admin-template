// sku模块
import request from '@/utils/request';

// 获取图片的数据
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get',
    });
}

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) => {
    return request({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'get',
    });
}

// 获取平台属性接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    });
}

// 添加SKU
// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) => {
    return request({
        url: '/admin/product/saveSkuInfo',
        method: 'post',
        data: skuInfo
    });
}

// 获取SKU列表数据的接口
// /admin/product/findBySpuId/{spuId} get
export const reqSkuList = (spuId) => {
    return request({
        url: `/admin/product/findBySpuId/${spuId}`,
        method: 'get'
    });
}

// SKU列表的接口
// /admin/product/list/{page}/{limit} get
export const reqSkuList1 = (page, limit) => {
    return request({
        url: `/admin/product/list/${page}/${limit}`,
        method: 'get'
    });
}

// 上架
// /admin/product/onSale/{skuId} get
export const reqSale = (skuId) => {
    return request({
        url: `/admin/product/onSale/${skuId}`,
        method: 'get'
    });
}

// 下架
// /admin/product/cancelSale/{skuId} get
export const reqCancel = (skuId) => {
    return request({
        url: `/admin/product/cancelSale/${skuId}`,
        method: 'get'
    });
}

// 获取SKU详情的接口
// /admin/product/getSkuById/{skuId} get
export const reqSkuById = (skuId) => {
    return request({
        url: `/admin/product/getSkuById/${skuId}`,
        method: 'get'
    });
}

// 删除sku
export const reqDeleteSku = (skuId) => {
    return request({ url: `/admin/product/deleteSku/${skuId}`, method: 'DELETE' })
}